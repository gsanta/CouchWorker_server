import { UPDATE_ABOUT_INFO, UDPATE_ABOUT_INFO_RESPONSE } from '../../actions/profile/aboutInfoActions';
import { UserModel } from '../../../shared/model/user/UserModel';


export function aboutInfoReducer(state: UserModel = new UserModel(), action: any): UserModel {
    switch(action.type) {
        case UDPATE_ABOUT_INFO_RESPONSE:
            return action.user
         default:
            return state;   
    }
}