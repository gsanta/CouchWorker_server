import * as React from 'react';
import { Panel, Image } from 'react-bootstrap';
import './HostDetail.scss';
import { AgeFormatter } from '../form/AgeFormatter';
import { StarRatingWrapper } from '../form/StarRatingWrapper';
import { UserModel } from '../../../shared/model/user/UserModel';
const thumbnail = require('../../assets/thumbnail.png');

export function HostDetail(props: HostDetailProps) {
    const address = props.host.getAddresses().get(0);

    return (
        <Panel className='cw-host-detail-panel'>
            <div className='cw-host-detail-panel-row'>
                <div className='cw-host-detail-panel-col1'>
                    <Image src={thumbnail} className='cw-host-detail-thumbnail'/>
                </div>
                <div className='cw-host-detail-panel-col2'>
                    <div>
                        {props.host.getFirstName()}&nbsp;
                        {props.host.getLastName()}, &nbsp;
                        <AgeFormatter date={props.host.getBirthDate()} />
                    </div>
                    <div>
                        {address.getCity()}, {address.getCountry()}
                    </div>
                    <div>
                        <StarRatingWrapper rate={props.host.getRating().getRating()}/>
                    </div>
                </div>
            </div>
        </Panel>
    );
}

export interface HostDetailProps {
    host: UserModel;
}