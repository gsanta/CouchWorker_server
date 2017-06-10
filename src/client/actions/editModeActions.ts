import { EditedComponent } from '../utils/EditedComponent';

export const EDITMODE = 'EDITMODE';

export function setEditedComponentAction(editedComponent: EditedComponent) {
    return {
        type: EDITMODE,
        editedComponent: editedComponent
    };
}
