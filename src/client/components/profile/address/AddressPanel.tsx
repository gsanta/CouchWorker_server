import * as React from 'react';
import { AddressHeader } from '../view_profile/AddressHeader';
import { Panel } from 'react-bootstrap';
import { AddressModel } from '../../../../shared/model/AddressModel';

export function AddressPanel(props: AddressPanelProps) {
    let image = null;

    if (props.address.images.length > 0) {
        let img = props.address.images[0];
        image = (
            <img
                className="cw-thumbnail"
                key={img.fileName}
                src={`img/${props.userId}/addresses/${props.userId}/${img.fileName}.${img.extension}`}
            />
        );
    }
    const images = props.address.images.map(img => {
        return (
            <img
                className="cw-thumbnail"
                key={img.fileName}
                src={`img/${props.userId}/addresses/${props.userId}/${img.fileName}.${img.extension}`}
            />
        );
    });

    let streetHouse = props.address.street;

    if (props.address.house) {
        streetHouse += `,${props.address.house}`;
    }

    return (
        <Panel className="cw-panel" header={props.header} key={props.address.uuid}>
            <div>
                <div className="cw-text-primary">{props.address.country}, {props.address.city}</div>
                <div>{streetHouse}</div>
                <div className="cw-thumbnail-grid">
                    <div>
                        {images.length ? images[0] : null}
                    </div>
                </div>
            </div>
        </Panel>
    );
}

export interface AddressPanelProps {
    header: JSX.Element;
    address: AddressModel;
    userId: string;
}
