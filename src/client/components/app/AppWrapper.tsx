import { connect } from 'react-redux';
import { App } from './App';
import { Dispatch } from 'redux';
import { RootModel } from '../../RootModel';
import { logout, fetchProfile } from '../profile/profileActions';


function mapStateToProps(state: RootModel) {
    return {
        user: state.user
    }
}

function mapDispatchToProps(dispatch: Dispatch<any>) {
    return {
        logout: () => dispatch(logout()),
        onMount: () => {
            dispatch(fetchProfile('Santa.Gergely.0'));
        }
    }
}

export const AppWrapper = connect(
    mapStateToProps,
    mapDispatchToProps
/**
 * TODO: why does not it accept App?
 */    
)(App as any);