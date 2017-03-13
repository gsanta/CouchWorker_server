import { HostModel } from '../HostModel';
import { Panel } from 'react-bootstrap';
import { Table } from 'react-bootstrap';
import { Image } from 'react-bootstrap';
import * as React from 'react';

const thumbnail = require('../assets/thumbnail.png');

export interface HostProps {
    host: HostModel
}

export function Host(props: HostProps) {
    return (
        <Panel>
            <Image src={thumbnail} rounded />
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
        </Panel>
    )
}