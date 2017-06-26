import * as Router from 'koa-router';
import { UserModel, UserJson, fromUserJson } from '../../shared/model/user/UserModel';
import * as asyncBusboy from 'async-busboy';
import { ImageModel, getImageFileName } from '../../shared/model/image/ImageModel';
import { ImageRepository } from '../domain/user/ImageRepository';
import { AddressModel, AddressDocument, fromAddressJson } from '../../shared/model/AddressModel';
import * as uuid from 'uuid/v4';
import { UrlModel } from '../../shared/model/UrlModel';
import { List } from 'immutable';
import { RatingModel } from '../../shared/model/RatingModel';
import { PaginationModel } from '../repository/PaginationModel';
import { ModelState } from '../../shared/model/ModelState';
import { UserRepository } from '../domain/user/repository/UserRepository';

export function profileApi(router: Router, baseDir: string, userRepository: UserRepository, imageBusiness: ImageRepository) {

    router.post('/api/register', async (ctx, next) => {
        if (!ctx.request.is('multipart/*')) {
            return await next();
        }

        const {files, fields} = await asyncBusboy(ctx.req);
        let user = fromUserJson(fields);
        user = {
            ...user,
            userName: `${user.firstName}.${user.lastName}.0`,
            uniqueIndex: 0,
            registrationDate: new Date(),
            uuid: uuid()
        };
        user = await userRepository.create(user);

        if (files.length) {
            const image: ImageModel = {
                image: files[0],
                baseDir: baseDir,
                relativePath: `img/${user.uuid}/profile/`,
                fileName: 'profile',
                src: `img/${user.uuid}/profile.png`
            };

            await imageBusiness.create(image);
        }
    });

    router.post('/api/addAddress/:userName', async (ctx, next) => {
        if (!ctx.request.is('multipart/*')) {
            return await next();
        }

        let user = await userRepository.findByUserName(ctx.params.userName);

        const {files, fields} = await asyncBusboy(ctx.req);
        let address = fromAddressJson(fields);
        address = {...address, uuid: uuid()};

        let urlModels = [];
        for (let file of files) {
            const fileName = uuid();
            const extension = file.mime.split('/')[1];
            const urlModel: UrlModel = {
                fileName,
                extension,
                state: ModelState.ACTIVE,
                src: `img/${user.uuid}/addresses/${address.uuid}/${getImageFileName(file, fileName)}`
            };
            urlModels.push(urlModel);
            const image: ImageModel = {
                image: file,
                baseDir: baseDir,
                relativePath: `img/${user.uuid}/addresses/${address.uuid}/`,
                fileName: fileName,
                src: `img/${user.uuid}/addresses/${address.uuid}/${getImageFileName(file, fileName)}`
            };
            await imageBusiness.create(image);
        }

        address = {...address, images: urlModels, state: ModelState.ACTIVE};

        const addresses = [...user.addresses, address];
        user = {...user, addresses: addresses };
        await userRepository.update(user);
        ctx.body = await userRepository.findByUserName(ctx.params.userName);
    });

    router.get('/api/findAddress/:uuid', async (ctx, next) => {
        const userUuid = await userRepository.findUuidForUser(ctx.params.userName);
        ctx.body = await userRepository.findAddressByUuid(userUuid, ctx.params.uuid);
    });

    router.post('/api/updateAddress/:userName', async (ctx, next) => {
        if (!ctx.request.is('multipart/*')) {
            return await next();
        }

        const {files, fields} = await asyncBusboy(ctx.req);

        const user = await userRepository.findByUserName(ctx.params.userName);
        let address = await userRepository.findAddressByUuid(user.uuid, fields.uuid);

        address = {
            ...address,
            country: fields.country,
            city: fields.city
        };

        const deletedImages = JSON.parse(fields.deletedImages);
        const remainingImages = address.images.filter(image => deletedImages.indexOf(image.fileName) === -1);
        address.images = remainingImages;

        let urlModels = [];
        for (let file of files) {
            const fileName = uuid();
            const extension = file.mime.split('/')[1];
            const urlModel: UrlModel = {
                fileName,
                extension,
                state: ModelState.ACTIVE,
                src: `img/${user.uuid}/addresses/${address.uuid}/${getImageFileName(file, fileName)}`
            };
            urlModels.push(urlModel);
            const image: ImageModel = {
                image: file,
                baseDir: baseDir,
                relativePath: `img/${user.uuid}/addresses/${address.uuid}/`,
                fileName: fileName,
                src: `img/${user.uuid}/addresses/${address.uuid}/${getImageFileName(file, fileName)}`
            };
            await imageBusiness.create(image);
        }

        address.images.push(...urlModels);

        await userRepository.updateAddress(user.uuid, address);

        ctx.body = await userRepository.findByUserName(ctx.params.userName);
    });

    router.post('/api/deleteAddress/:userName/:uuid', async (ctx, next) => {
        const userUuid = await userRepository.findUuidForUser(ctx.params.userName);
        const address = await userRepository.deleteAddress(userUuid, ctx.params.uuid);
        const body = await userRepository.findByUserName(ctx.params.userName);
        ctx.body = body;
    });

    router.post('/api/updateUser/:userName', async (ctx) => {
        let newUserModel =  fromUserJson(ctx.request.body);
        const oldUserModel = await userRepository.findByUserName(ctx.params.userName);
        newUserModel.uuid = oldUserModel.uuid;
        await userRepository.update(newUserModel);
        const body = await userRepository.findByUserName(ctx.params.userName);
        ctx.body = body;
    });

    router.post('/api/deleteUser/:userName', async (ctx) => {
        const user = await userRepository.findByUserName(ctx.params.userName);
        await userRepository.delete(user);
        ctx.body = await userRepository.findByUserName(ctx.params.userName);
    });

    router.get('/api/findUser/:userName', async (ctx) => {
        ctx.body = await userRepository.findByUserName(ctx.params.userName);
    });

    router.get('/api/findUsers/:page', async ctx => {
        const keywords = ctx.query.keywords ? ctx.query.keywords.split(' ') : [];
        const page = parseInt(ctx.params.page, 10) - 1;
        let users = [];
        if (!ctx.query.keywords) {
            users = await userRepository.findAll(new PaginationModel(page));
        } else {
            users = await userRepository.findByText(ctx.query.keywords, new PaginationModel(page));
        }
        ctx.body = users;
    });
}
