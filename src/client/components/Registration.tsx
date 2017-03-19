
import * as React from 'react';
import { UserModel } from '../../domain/user/UserModel';

export function Registration(props: RegistrationProps) {
    return (
        <div>
            <div>{props.user.getName()}</div>
            <div>{props.user.getAge()}</div>
        </div>
    );
}

export interface RegistrationProps {
    user: UserModel;
}