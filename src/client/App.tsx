import * as React from 'react';
import { UserModel } from '../domain/user/UserModel';
import { Header } from './components/header/Header';

export function App(props: AppProps) {
    return (
        <div className='cw-root'>
            <Header 
                user={props.user}
                logout={() => props.logout()}
            />
            <div className='cw-content'>
                  {props.children}
            </div>
        </div>
    );
}

export interface AppProps {
    children?: any;
    user: UserModel;
    logout: () => void
}