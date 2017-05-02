import * as React from 'react';

export function AddressHeader(props: AddressHeaderProps) {
    return (
        <div className="cw-address-header">
            <div>Address</div>
            <div onClick={props.editAddress}>Edit</div>
        </div>
    );
}

export interface AddressHeaderProps {
    editAddress: () => void; 
}