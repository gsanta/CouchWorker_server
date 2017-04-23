import * as Router from 'koa-router';
import { UserBusiness } from '../domain/user/UserBusiness';
import { UserModel, UserModelParams } from '../../shared/model/user/UserModel';
import * as asyncBusboy from 'async-busboy';
import { ImageModel } from '../../shared/model/image/ImageModel';
import { ImageBusiness } from '../domain/user/ImageBusiness';
import { AddressModel, AddressDocument } from '../../shared/model/AddressModel';
import * as uuid from 'uuid/v4';
import { UrlModel } from '../../shared/model/UrlModel';
import { List } from 'immutable';
import { RatingModel } from '../../shared/model/RatingModel';
import { PaginationModel } from '../repository/PaginationModel';

export function jsonToUserModel(json: any): UserModel {
    const addresses = json.addresses ? json.addresses.map(address => this.toAddressModel(address)) : null;

    const userParams: UserModelParams = {
        firstName: json.firstName,
        lastName: json.lastName,
        email: json.email,       
        userName: json.userName,     
        birthDate: json.birthDate,            
        profession: json.profession,
        rating: new RatingModel(5),
        addresses: addresses,
        uuid: json.id
    }

    return new UserModel(userParams);
}

export function jsonToAddressModel(json: any): AddressModel {
    const addressDocument: AddressDocument = {
        country: json.country,
        city: json.city,
        street: json.street,
        house: json.house,
        uuid: json.uuid
    };

    return new AddressModel(addressDocument);
}


export function profileApi(router: Router, baseDir: string, userBusiness: UserBusiness, imageBusiness: ImageBusiness) {

    router.post('/api/register', async (ctx, next) => {
        if (!ctx.request.is('multipart/*')) return await next();

        const {files, fields} = await asyncBusboy(ctx.req);
        let user = jsonToUserModel(fields);
        user = await userBusiness.create(user);
        
        if (files.length) {
            const image = new ImageModel(files[0], baseDir, `img/${user.getUuid()}/profile/`, 'profile');
            await imageBusiness.create(image);
        }
    });

    router.post('/api/addAddress/:userName', async (ctx, next) => {
        if (!ctx.request.is('multipart/*')) return await next();
        
        let user = await userBusiness.findByUserName(ctx.params.userName);
        
        const {files, fields} = await asyncBusboy(ctx.req);            

        let address = jsonToAddressModel(fields);
        address = address.setUuid(uuid());

        let urlModels = [];
        for (let file of files) {
            const fileName = uuid();
            const extension = file.mime.split('/')[1];
            const urlModel = new UrlModel({
                fileName,
                extension
            });
            urlModels.push(urlModel);
            const image = new ImageModel(file, baseDir, `img/${user.getUuid()}/addresses/${address.getUuid()}/`, fileName);
            await imageBusiness.create(image);
        }

        address = address.setImages(List(urlModels));

        user = await userBusiness.addAddress(user, address)
        user = user.addAddress(address);
        user = await userBusiness.update(user);
        console.log(user);
    });

    router.post('/api/updateUser/:userName', async (ctx) => {
        let newUserModel =  jsonToUserModel(ctx.request.body);
        const oldUserModel = await userBusiness.findByUserName(ctx.params.userName);
        newUserModel = newUserModel.setUuid(oldUserModel.getUuid());
        const body = await userBusiness.update(newUserModel);
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
        const keywords = ctx.query.keywords.split(' ');
        const page = parseInt(ctx.params.page, 10) - 1;
        const users = await userBusiness.findByText(ctx.query.keywords, new PaginationModel(page));
        ctx.body = users;
    });
}