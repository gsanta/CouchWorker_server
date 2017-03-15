import { HostModel } from '../HostModel';
import { Panel, Col, Row } from 'react-bootstrap';
import { Table } from 'react-bootstrap';
import { Image } from 'react-bootstrap';
import * as React from 'react';

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
                    <Table striped bordered condensed hover>
                        <tbody>
                            <tr>
                                <td>Name:</td>
                                <td>{props.host.getName()}</td>
                            </tr>
                            <tr>
                                <td>Age:</td>
                                <td>{props.host.getAge()}</td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
            </div>

        </Panel>
    )
}