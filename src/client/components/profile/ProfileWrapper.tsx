import { isEditingAction } from '../../actions/editModeActions';
import { RootModel } from '../../RootModel';
import { connect } from 'react-redux';
// import { Profile } from './Profile';
import { Profile } from './Profile2';
import { UserModel } from '../../../shared/model/user/UserModel';
import { signup } from './profileActions';

const mapStateToProps = (state: RootModel) => {
    return {
        user: state.user,
        isEditing: state.isEditing
    }
}

const mapDispatchToProps = (dispatch, props: any) => {
    return {
        onSubmit: (model: UserModel) => {
            dispatch(signup(model))
            .then((data) => {
                props.history.push('/');
            });
        },
        onEditModeChange: (isEditing: boolean) => {
            dispatch(isEditingAction(isEditing));
        }
    }
}


export const ProfileWrapper = connect(
    mapStateToProps,
    mapDispatchToProps
)(Profile)
