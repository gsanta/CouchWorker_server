import {List} from 'immutable';
import { HostModel } from './HostModel';
import { UserModel } from '../domain/user/UserModel';

export interface RootModel {
    hosts: List<HostModel>;
    user: UserModel;
}