import React from "react";
import { Navbar, Container, Nav, NavDropdown} from "react-bootstrap";
import constants from "../constants";

function NavbarComponent() {
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container fluid>
                <Navbar.Brand href="#home">{constants.appName}</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="navbarNav">
                    <Nav className="navbar-nav me-auto mb-2 mb-lg-0">
                        <Nav.Link href="#dashboard">Dashboard</Nav.Link>
                        <Nav.Link href="#scores">Scores</Nav.Link>
                    </Nav>
                    <Nav className="navbar-nav ms-auto">
                        <NavDropdown title="Dropdown" id="navDropdown">
                            <NavDropdown.Item href="#action/3.1">Logout</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavbarComponent;