import { EDITMODE } from '../actions/editModeActions';
import { UDPATE_ABOUT_INFO_RESPONSE } from '../actions/profile/aboutInfoActions';


export function editModeReducer(isEditing = false, action: any): boolean {
    switch (action.type) {    
        case EDITMODE:
            return action.isEditing;
        case UDPATE_ABOUT_INFO_RESPONSE:
            return false        
        default:
            return isEditing;
    }
}