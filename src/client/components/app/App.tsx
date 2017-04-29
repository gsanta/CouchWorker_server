import * as React from 'react';
import { Header } from '../header/Header';
import { UserModel } from '../../../shared/model/user/UserModel';

export class App extends React.Component<AppProps, any> {

    public componentDidMount() {
        this.props.onMount();
    }

    public render() {
        return (
            <div className='cw-root'>
                <Header 
                    user={this.props.user}
                    logout={() => this.props.logout()}
                />
                <div className='cw-content'>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export interface AppProps {
    children?: any;
    user: UserModel;
    logout: () => void;
    onMount: () => void;
}