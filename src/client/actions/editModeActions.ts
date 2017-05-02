
export const EDITMODE = 'EDITMODE';

export function setEditedComponentAction(editedComponent: string) {
    return {
        type: EDITMODE,
        editedComponent: editedComponent
    };
}