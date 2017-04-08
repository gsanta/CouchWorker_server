import * as React from 'react';
import { Panel, Image } from 'react-bootstrap';
import './HostDetail.scss';
import { HostModel } from '../../../shared/model/host/HostModel';
import { AgeFormatter } from '../form/AgeFormatter';
import { StarRatingWrapper } from '../form/StarRatingWrapper';
const thumbnail = require('../../assets/thumbnail.png');

export function HostDetail(props: HostDetailProps) {
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
                        {props.host.getAddress().getCity()}, {props.host.getAddress().getCountry()}
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
    host: HostModel;
}