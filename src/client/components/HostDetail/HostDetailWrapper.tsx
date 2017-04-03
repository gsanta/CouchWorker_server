import { RootModel } from '../../RootModel';
import { connect } from 'react-redux';
import { HostDetail } from './HostDetail';
import { hosts } from '../../hosts/hostsReducers';

const mapStateToProps = (state: RootModel, props: any) => {
    const hostIndex = props.params.id;
    const host = state.hosts.find((host) => host.getId() === hostIndex); 
    return {
        host: host
    };
}

const mapDispatchToProps = (dispatch, props: any) => {
  return {
  };
}

export const HostDetailWrapper = connect(
  mapStateToProps,
  mapDispatchToProps
)(HostDetail);
