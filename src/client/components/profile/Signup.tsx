import * as React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { UserModel } from '../../../shared/model/user/UserModel';
import { AboutInfoFields } from './edit_profile/AboutInfoFields';
import * as validate from 'validate.js';
import { userValidator } from '../../../shared/model/user/userValidator';
import { AddressModel } from '../../../shared/model/AddressModel';

export class Signup extends React.Component<any, any> {
    constructor(props: any) {
        super(props);

        const user = props.user || new UserModel();
        this.state = {
            user,
            errors: null
        };
    }

    public render() {
        const errors = this.state.errors || {};
        return (
            <AboutInfoFields onChange={this.onAboutInfoChange.bind(this)} user={this.state.user} errors={errors}/>
        );
    }

    private onAboutInfoChange(user: UserModel) {
        const errors = (validate as any).validate(user, userValidator);

        this.setState({
            user,
            errors
        });
    }
}

export interface AboutInfoEditorProps {
    onSignup: (model: UserModel, initialAddress: AddressModel, addressImages: File[]) => void;
}

interface AboutInfoEditorState {
    user: UserModel;
    errors: any;
}
