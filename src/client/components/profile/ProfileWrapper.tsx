import { RootModel } from '../../RootModel';
import { connect } from 'react-redux';
import { Profile } from './Profile';
import { UserModel } from '../../../shared/model/user/UserModel';
import { signup } from './profileActions';

const mapStateToProps = (state: RootModel) => {
    return {
        user: state.user
    }
}

const mapDispatchToProps = (dispatch, props: any) => {
    return {
        onSubmit: (model: UserModel) => {
            dispatch(signup(model))
            .then((data) => {
                props.history.push('/');
            });
        }
    }
}


export const ProfileWrapper = connect(
    mapStateToProps,
    mapDispatchToProps
)(Profile)
