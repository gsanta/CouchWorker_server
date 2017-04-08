import {List} from 'immutable';
import { HostModel } from '../shared/model/host/HostModel';
import { UserModel } from '../shared/model/user/UserModel';

export interface RootModel {
    hosts: List<HostModel>;
    user: UserModel;
}