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
import { Signup } from './Signup';

const mapDispatchToProps = (dispatch, props: any) => {
    return {
        onSignup: (model: UserModel, initialAddress: AddressModel, addressImages: File[]) => {
            dispatch(signup(model))
            .then((data) => {
                props.history.push('/');
            });
        }
    };
};

export const SignupWrapper = connect(
    null,
    mapDispatchToProps
)(Signup);
