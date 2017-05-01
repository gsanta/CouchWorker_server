import { Panel, Col, Row } from 'react-bootstrap';
import { Table } from 'react-bootstrap';
import { Image } from 'react-bootstrap';
import * as React from 'react';
import { Link } from 'react-router';
import { AgeFormatter } from '../form/AgeFormatter';
import { StarRatingWrapper } from '../form/StarRatingWrapper';
import { UserModel } from '../../../shared/model/user/UserModel';
const thumbnail = require('../../assets/thumbnail.png');
require('./Host.scss')

export interface HostProps {
    host: UserModel
}

export function Host(props: HostProps) {
    // let address = props.host.getAddresses().get(0);
    return (
        <Panel className='cw-host-panel'>
            <div className='cw-host-panel-row'>
                <div className='cw-host-panel-col1'>
                    <Image src={thumbnail} className='cw-host-thumbnail'/>
                </div>
                <div className='cw-host-panel-col2'>
                    <div>
                        <Link to={`/host/${props.host.getUserName()}`}>
                            {props.host.getFirstName()}&nbsp;
                            {props.host.getLastName()}, &nbsp;
                        </Link>
                        <AgeFormatter date={props.host.getBirthDate()} />
                    </div>
                    <div>
                        {/*{address.getCity()}, {address.getCountry()}*/}
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