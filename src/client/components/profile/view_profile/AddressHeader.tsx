import * as React from 'react';

export function AddressHeader(props: AddressHeaderProps) {
    return (
        <div className="cw-address-header">
            <div>Address</div>
            <div className="cw-right-side-section">
                <div
                    onClick={props.delete}
                    className="cw-button cw-delete-button cw-right-button"
                >
                    Delete
                </div>&nbsp;
                <div
                    onClick={props.edit}
                    className="cw-button cw-save-button cw-right-button"
                >
                    Edit
                </div>
            </div>
        </div>
    );
}

export interface AddressHeaderProps {
    delete: () => void;
    edit: () => void;
}
