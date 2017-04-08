import { connect } from 'react-redux';
import { App } from './App';
import { Dispatch } from 'redux';
import { RootModel } from '../../RootModel';
import { logout } from '../profile/profileActions';


function mapStateToProps(state: RootModel) {
    return {
        user: state.user
    }
}

function mapDispatchToProps(dispatch: Dispatch<any>) {
    return {
        logout: () => dispatch(logout())
    }
}

export const AppWrapper = connect(
    mapStateToProps,
    mapDispatchToProps
)(App);