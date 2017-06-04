import { UrlModel } from '../../../shared/model/UrlModel';
import { setEditedComponentAction } from '../../actions/editModeActions';
import { RootModel } from '../../RootModel';
import { connect } from 'react-redux';
import { Profile } from './Profile';
import { UserModel } from '../../../shared/model/user/UserModel';
import { signup } from './profileActions';
import { updateAboutInfo } from '../../actions/profile/aboutInfoActions';
import { AddressModel } from '../../../shared/model/AddressModel';
import { updateAddress } from '../../actions/profile/addressActions';
import { deleteAddress } from '../../actions/profile/deleteAddressActions';
import { addAddress } from '../../actions/profile/addAddressActions';

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
        onUpdateddress: (model: AddressModel, newImages: File[], deletedImages: UrlModel[], userName: string) => {
            dispatch(updateAddress(model, newImages, deletedImages, userName));
        },
        onDeleteAddress: (model: AddressModel, userName: string) => {
            dispatch(deleteAddress(model, userName));
        },
        onAddAddress: (model: AddressModel, files: File[], userName: string) => {
            dispatch(addAddress(model, files, userName));
        }
    };
};

export const ProfileWrapper = connect(
    mapStateToProps,
    mapDispatchToProps
)(Profile);
