import { Nav } from 'react-bootstrap';
import { NavItem } from 'react-bootstrap';
import { Navbar } from 'react-bootstrap';
import { Link } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import * as React from 'react';
import './Header.scss';
import { UserModel } from '../../../shared/model/user/UserModel';

function HostsLink(props: HeaderProps) {
    return (
        <Nav pullRight>
            <LinkContainer to="/">
                <NavItem 
                    className='cw-menu-button  cw-hosts-button'
                    eventKey={2}
                    href="#"
                >
                    Hosts
                </NavItem>
            </LinkContainer>
        </Nav>  
    );
}

function LoginLink(props: HeaderProps) {
    if (props.user) {
        return null;
    }

    return (
        <Nav pullRight>
            <LinkContainer to="/login">
                <NavItem 
                    className='cw-menu-button cw-login-button'
                    eventKey={1}
                    href="#"
                >
                    Log in
                </NavItem>
            </LinkContainer>
        </Nav>
    );
}

function SignupLink(props: HeaderProps) {
    if (props.user) {
        return null;
    }

    return (
        <Nav pullRight>
            <LinkContainer to="/register">
                <NavItem 
                    className='cw-menu-button cw-signup-button'
                    eventKey={1}
                    href="#"
                >
                    Sign up
                </NavItem>
            </LinkContainer>
        </Nav>
    );
}

function LogoutLink(props: HeaderProps) {
    if (!props.user) {
        return null;
    }

    return (
        <Nav pullRight>
            <LinkContainer to="/">            
                <NavItem 
                    className='cw-menu-button  cw-logout-button'
                    eventKey={1}
                    onClick={() => props.logout()}
                    href="#"
                >
                    Log out
                </NavItem>
            </LinkContainer>
        </Nav>
    );
}

function ProfileLink(props: HeaderProps) {
    if (!props.user) {
        return null;
    }

    return (
        <Nav pullRight>
            <LinkContainer to="/register">
                <NavItem 
                    className='cw-menu-button cw-profile-button'
                    eventKey={1}
                    href="#"
                >
                    Profile
                </NavItem>
            </LinkContainer>
        </Nav>
    )
}

export function Header(props: HeaderProps) {
    return(
        <header className="cw-header">
            <Navbar inverse collapseOnSelect>
                <Navbar.Collapse>
                    <LoginLink {...props}/>
                    <SignupLink {...props}/>
                    <LogoutLink {...props}/>
                    <ProfileLink {...props}/>
                    <HostsLink {...props}/>
                </Navbar.Collapse>
            </Navbar>
        </header>
    );
}

export interface HeaderProps {
    user: UserModel;
    logout: () => void;
}