import * as React from "react";
import { Navbar, Container, Nav, NavDropdown} from "react-bootstrap";
import {Link} from "react-router-dom";
import constants from "../constants";

export default class NavbarComponent extends React.Component<{}> {
    render() {
        return (
            <Navbar bg="dark" variant="dark" expand="lg">
                <Container fluid>
                    <Navbar.Brand as={Link} to="/">{constants.appName}</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    {/* @ts-ignore */}
                    <Navbar.Collapse id="navbarNav">
                        <Nav className="navbar-nav me-auto mb-2 mb-lg-0">
                            <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
                            <Nav.Link as={Link} to="/scores">Scores</Nav.Link>
                        </Nav>
                        <Nav className="navbar-nav ms-auto">
                            {/*}
                        <NavDropdown title="Dropdown" id="navDropdown">
                            <NavDropdown.Item >Logout</NavDropdown.Item>
                        </NavDropdown>
                        {*/}
                            <Nav.Link as={Link} to="/login">Login</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        );
    }
}