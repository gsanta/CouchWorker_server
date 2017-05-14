import { UPDATE_ABOUT_INFO, UPDATE_ABOUT_INFO_RESPONSE } from '../../actions/profile/aboutInfoActions';
import { UserModel } from '../../../shared/model/user/UserModel';


export function addressReducer(state: UserModel = new UserModel(), action: any): UserModel {
    switch(action.type) {
        case UPDATE_ABOUT_INFO_RESPONSE:
            return action.user
         default:
            return state;   
    }
}