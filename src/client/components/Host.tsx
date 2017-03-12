import { HostModel } from '../HostModel';
import { Panel } from 'react-bootstrap';
import { Table } from 'react-bootstrap';
import * as React from 'react';

export function Host(hostModel: HostModel) {
    return (
        <Panel>
            <Table striped bordered condensed hover>
                <tbody>
                    <tr>
                        <td>Name:</td>
                        <td>{hostModel.getName()}</td>
                    </tr>
                    <tr>
                        <td>Age:</td>
                        <td>{hostModel.getAge()}</td>
                    </tr>
                </tbody>
            </Table>
        </Panel>
    )
}