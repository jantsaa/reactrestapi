import React, { Component } from 'react';
import {Navbar,Nav} from 'react-bootstrap';

export class Navigation extends Component {
    render() {
        return(<Navbar bg="dark" variant="dark">
            <Nav className="mr-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/registrations">Registrations</Nav.Link>
            </Nav>

        </Navbar>)

    }


}

export default Navigation;