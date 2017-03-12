import { RootModel } from '../RootModel';
import { connect } from 'react-redux';
import { Hosts } from './Hosts';

const mapStateToProps = (state: RootModel) => {
  return {
    hosts: state.hosts
  }
}

export const HostsWrapper = connect(
  mapStateToProps
)(Hosts)
