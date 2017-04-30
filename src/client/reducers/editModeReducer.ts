import { EDITMODE } from '../actions/editModeActions';


export function editModeReducer(isEditing = false, action: any): boolean {
    switch (action.type) {    
        case EDITMODE:
            return action.isEditing;        
        default:
            return isEditing;
    }
}