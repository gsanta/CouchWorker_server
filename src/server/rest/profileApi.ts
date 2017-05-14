import * as Router from 'koa-router';
import { UserBusiness } from '../domain/user/UserBusiness';
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

export function profileApi(router: Router, baseDir: string, userBusiness: UserBusiness, imageBusiness: ImageBusiness) {

    router.post('/api/register', async (ctx, next) => {
        if (!ctx.request.is('multipart/*')) {
            return await next();
        }

        const {files, fields} = await asyncBusboy(ctx.req);
        let user = fromUserJson(fields);
        user = await userBusiness.create(user);

        if (files.length) {
            const image = new ImageModel(files[0], baseDir, `img/${user.uuid}/profile/`, 'profile');
            await imageBusiness.create(image);
        }
    });

    router.post('/api/addAddress/:userName', async (ctx, next) => {
        if (!ctx.request.is('multipart/*')) {
            return await next();
        }

        let user = await userBusiness.findByUserName(ctx.params.userName);

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

        address = {...address, images: List(urlModels)};

        await userBusiness.addAddress(user, address);
        user = await userBusiness.findByUserName(ctx.params.userName);
    });

    router.post('/api/updateAddress/:userName', async (ctx, next) => {
        const address = fromAddressJson(ctx.request.body);
        const userModel = await userBusiness.findByUserName(ctx.params.userName);
        await userBusiness.updateAddress(userModel, address);
        ctx.body = await userBusiness.findByUserName(ctx.params.userName);
    });

    router.post('/api/updateUser/:userName', async (ctx) => {
        let newUserModel =  fromUserJson(ctx.request.body);
        const oldUserModel = await userBusiness.findByUserName(ctx.params.userName);
        newUserModel.uuid = oldUserModel.uuid;
        await userBusiness.update(newUserModel);
        const body = await userBusiness.findByUserName(ctx.params.userName);
        ctx.body = body;
    });

    router.post('/api/deleteUser/:userName', async (ctx) => {
        const user = await userBusiness.findByUserName(ctx.params.userName);
        await userBusiness.delete(user);
    });

    router.get('/api/findUser/:userName', async (ctx) => {
        ctx.body = await userBusiness.findByUserName(ctx.params.userName);
    });

    router.get('/api/findUsers/:page', async ctx => {
        const keywords = ctx.query.keywords ? ctx.query.keywords.split(' ') : [];
        const page = parseInt(ctx.params.page, 10) - 1;
        let users = [];
        if (!ctx.query.keywords) {
            users = await userBusiness.findAll(new PaginationModel(page));
        } else {
            users = await userBusiness.findByText(ctx.query.keywords, new PaginationModel(page));
        }
        ctx.body = users;
    });
}
