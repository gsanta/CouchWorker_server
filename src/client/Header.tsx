import { Nav } from 'react-bootstrap';
import { NavItem } from 'react-bootstrap';
import { Navbar } from 'react-bootstrap';
import { Link } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import * as React from 'react';
import './Header.scss';

export function Header() {
    return(
        <header className="cw-header">
            <Navbar inverse collapseOnSelect>
                <Navbar.Collapse>
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
                </Navbar.Collapse>
            </Navbar>
        </header>
    )
}