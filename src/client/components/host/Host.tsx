import { Panel, Col, Row } from 'react-bootstrap';
import { Table } from 'react-bootstrap';
import { Image } from 'react-bootstrap';
import * as React from 'react';
import { Link } from 'react-router';
import { HostModel } from '../../../shared/model/host/HostModel';
import { AgeFormatter } from '../form/AgeFormatter';
import { StarRatingWrapper } from '../form/StarRatingWrapper';
const thumbnail = require('../../assets/thumbnail.png');
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
                        <Link to={`/host/${props.host.getId()}`}>
                            {props.host.getFirstName()}&nbsp;
                            {props.host.getLastName()}, &nbsp;
                        </Link>
                        <AgeFormatter date={props.host.getBirthDate()} />
                    </div>
                    <div>
                        {props.host.getAddress().getCity()}, {props.host.getAddress().getCountry()}
                    </div>
                </div>
                <div className='cw-host-panel-col3'>
                    <div>
                        <StarRatingWrapper rate={props.host.getRating().getRating()}/>
                    </div>
                </div>
            </div>
        </Panel>
    )
}