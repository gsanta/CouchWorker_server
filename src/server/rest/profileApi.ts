import * as Router from 'koa-router';
import { UserModel, UserJson, fromUserJson } from '../../shared/model/user/UserModel';
import * as asyncBusboy from 'async-busboy';
import { ImageModel } from '../../shared/model/image/ImageModel';
import { ImageBusiness } from '../domain/user/ImageBusiness';
import { AddressModel, AddressDocument, fromAddressJson } from '../../shared/model/AddressModel';
import * as uuid from 'uuid/v4';
import { UrlModel } from '../../shared/model/UrlModel';
import { List } from 'immutable';
import { RatingModel } from '../../shared/model/RatingModel';
import { PaginationModel } from '../repository/PaginationModel';
import { ModelState } from '../../shared/model/ModelState';
import { UserRepository } from '../domain/user/repository/UserRepository';

export function profileApi(router: Router, baseDir: string, userRepository: UserRepository, imageBusiness: ImageBusiness) {

    router.post('/api/register', async (ctx, next) => {
        if (!ctx.request.is('multipart/*')) {
            return await next();
        }

        const {files, fields} = await asyncBusboy(ctx.req);
        let user = fromUserJson(fields);
        user = {
            ...user,
            userName: `${user.firstName}.${user.lastName}.0`,
            registrationDate: new Date(),
            uuid: uuid()
        };
        user = await userRepository.create(user);

        if (files.length) {
            const image = new ImageModel(files[0], baseDir, `img/${user.uuid}/profile/`, 'profile');
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
            const urlModel = {
                fileName,
                extension
            };
            urlModels.push(urlModel);
            const image = new ImageModel(file, baseDir, `img/${user.uuid}/addresses/${address.uuid}/`, fileName);
            await imageBusiness.create(image);
        }

        address = {...address, images: List(urlModels), state: ModelState.ACTIVE};

        const addresses = user.addresses.push(address);
        user = {...user, addresses: addresses };
        await userRepository.update(user);
        ctx.body = await userRepository.findByUserName(ctx.params.userName);
    });

    router.get('/api/findAddress/:uuid', async (ctx, next) => {
        ctx.body = await userRepository.findAddressByUuid(null, ctx.params.uuid);
    });

    router.post('/api/updateAddress/:userName', async (ctx, next) => {
        const address = fromAddressJson(ctx.request.body);
        await userRepository.updateAddress(ctx.params.userName, address);
        ctx.body = await userRepository.findByUserName(ctx.params.userName);
    });

    router.post('/api/deleteAddress/:userName/:uuid', async (ctx, next) => {
        const address = await userRepository.deleteAddress(ctx.params.userName, ctx.params.uuid);
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
