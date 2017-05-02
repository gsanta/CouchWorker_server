import { EDITMODE } from '../actions/editModeActions';
import { UDPATE_ABOUT_INFO_RESPONSE } from '../actions/profile/aboutInfoActions';


export function editModeReducer(editedComponent = null, action: any): boolean {
    switch (action.type) {    
        case EDITMODE:
            return action.editedComponent;
        case UDPATE_ABOUT_INFO_RESPONSE:
            return false        
        default:
            return editedComponent;
    }
}