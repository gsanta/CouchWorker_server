import * as React from 'react';
import { HostModel } from '../HostModel';
import { List } from 'immutable';
import { Host } from './Host';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Pagination } from 'react-bootstrap';
require('./Hosts.scss');

export interface HostsProps {
    hosts: List<HostModel>;
    page: number;
    onPageSelect: (page: number) => void
}

export function Hosts(props: HostsProps) {
    function onPageSelect() {

    }

    const perPage = 7;
    const pages = Math.ceil(props.hosts.size / perPage);
    const currentPage = props.page;
    const startOffset = (currentPage - 1) * perPage;

    const hosts = props.hosts
        .filter((host, index) => index >= startOffset && index < (startOffset + perPage))
        .map((host, index) => <Host host={host} key={index}/>);

    return (
        <div className='cw-hosts-col'>
            {hosts}

            <Pagination
                prev
                next
                first
                last
                ellipsis
                items={pages}
                maxButtons={5}
                activePage={currentPage}
                onSelect={props.onPageSelect as any}
            />
        </div>
    );
}