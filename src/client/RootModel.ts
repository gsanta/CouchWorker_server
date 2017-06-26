import {List} from 'immutable';
import { UserModel } from '../shared/model/user/UserModel';
import { EditedComponent } from './utils/EditedComponent';

export interface RootModel {
    hosts: List<UserModel>;
    user: UserModel;
    editedComponent: EditedComponent;
}
