import {List} from 'immutable';
import { UserModel } from '../shared/model/user/UserModel';

export interface RootModel {
    hosts: List<UserModel>;
    user: UserModel;
}