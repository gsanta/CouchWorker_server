import { RootModel } from '../RootModel';
import { connect } from 'react-redux';
import { Hosts } from './Hosts';
import * as React from 'react';
import { fetchHosts, receiveHosts } from '../hosts/hostsActions';
import { List } from 'immutable';
import { HostModel } from '../HostModel';

const mapStateToProps = (state: RootModel, props: any) => {
    return {
        hosts: state.hosts,
        page: Number(props.params.page) || 1
    }
}

const mapDispatchToProps = (dispatch, props: any) => {
  return {
    fetchHosts: () => {
        dispatch(fetchHosts())
    },
    onPageSelect: (page: number) => {
        props.history.push('/hosts/' + page);
    }
  }
}

class _HostsWrapper extends React.Component<any, any> {

    public componentDidMount() {
        this.props.fetchHosts();
    }

    public render() {
        return (
            <Hosts {...this.props}/>
        )
    }
} 

export const HostsWrapper = connect(
    mapStateToProps,
    mapDispatchToProps
)(_HostsWrapper)
