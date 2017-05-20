import * as React from 'react';

export function AddressHeader(props: AddressHeaderProps) {
    return (
        <div className="cw-address-header">
            <div>Address</div>
            <div className="cw-right-side-section">
                <div onClick={props.delete}>Delete</div>&nbsp;
                <div onClick={props.edit}>Edit</div>
            </div>
        </div>
    );
}

export interface AddressHeaderProps {
    delete: () => void;
    edit: () => void;
}
