
export const EDITMODE = 'EDITMODE';

export function isEditingAction(isEditing: boolean) {
    return {
        type: EDITMODE,
        isEditing: isEditing
    };
}