import * as React from 'react';
import { HostModel } from '../HostModel';
import { List } from 'immutable';
import { Host } from './Host';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';

export interface HostsProps {
    hosts: List<HostModel>;
}

export function Hosts(props: HostsProps) {
    let hosts = props.hosts.map((host, index) => <Host host={host} key={index}/>);

    return (
        <Row>
            <Col xs={6} xsOffset={3}>
                {hosts}
            </Col>
        </Row>
    );
}