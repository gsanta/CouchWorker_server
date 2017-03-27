import * as React from 'react';
import { Header } from './Header';

export function App(props: AppProps) {
    return (
      <div className='cw-root'>
          <Header/>
          <div className='cw-content'>
              {props.children}
          </div>
      </div>
    );
}

export interface AppProps {
    children?: any;
}