import { HostModel } from '../HostModel';
import { Panel, Col, Row } from 'react-bootstrap';
import { Table } from 'react-bootstrap';
import { Image } from 'react-bootstrap';
import * as React from 'react';
import { StarRatingWrapper } from './StarRatingWrapper';
import { AgeFormatter } from './AgeFormatter';

const thumbnail = require('../assets/thumbnail.png');
require('./Host.scss')

export interface HostProps {
    host: HostModel
}

export function Host(props: HostProps) {
    return (
        <Panel className='cw-host-panel'>
            <div className='cw-host-panel-row'>
                <div className='cw-host-panel-col1'>
                    <Image src={thumbnail} className='cw-host-thumbnail'/>
                </div>
                <div className='cw-host-panel-col2'>
                    <div>
                        {props.host.getPersonalInfo().getFirstName()}&nbsp;
                        {props.host.getPersonalInfo().getLastName()}, &nbsp;
                        <AgeFormatter date={props.host.getPersonalInfo().getBirthDate()} />
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
    )
}