import { setEditedComponentAction } from '../../actions/editModeActions';
import { RootModel } from '../../RootModel';
import { connect } from 'react-redux';
import { Profile } from './Profile';
import { UserModel } from '../../../shared/model/user/UserModel';
import { signup } from './profileActions';
import { updateAboutInfo } from '../../actions/profile/aboutInfoActions';
import { AddressModel } from '../../../shared/model/AddressModel';
import { updateAddress } from '../../actions/profile/addressActions';

const mapStateToProps = (state: RootModel) => {
    return {
        user: state.user,
        editedComponent: state.editedComponent
    };
};

const mapDispatchToProps = (dispatch, props: any) => {
    return {
        onSubmit: (model: UserModel) => {
            dispatch(signup(model))
            .then((data) => {
                props.history.push('/');
            });
        },
        onEditModeChange: (editedComponent: string) => {
            dispatch(setEditedComponentAction(editedComponent));
        },
        onSubmitAboutInfo: (model: UserModel) => {
            dispatch(updateAboutInfo(model));
        },
        onSubmitAddress: (model: AddressModel) => {
            dispatch(updateAddress())
        }
    };
};


export const ProfileWrapper = connect(
    mapStateToProps,
    mapDispatchToProps
)(Profile);
