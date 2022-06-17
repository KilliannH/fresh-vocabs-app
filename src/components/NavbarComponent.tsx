import * as React from "react";
import { Navbar, Container, Nav, NavDropdown} from "react-bootstrap";
import {Link} from "react-router-dom";
import constants from "../constants";

export default class NavbarComponent extends React.Component<{currentUser, logout}, {}> {

    constructor(props) {
        super(props);
    }

    render() {
        const { currentUser, logout } = this.props;
        const getDropdown = () => {
            if(!currentUser) {
                return(<Nav.Link as={Link} to="/login">Login</Nav.Link>);
            }
            return (<NavDropdown title={currentUser.email} id="navDropdown">
                <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
            </NavDropdown>);
        }

        const getNavLinks = () => {
            if(currentUser) {
                return(
                    <Nav className="navbar-nav me-auto mb-2 mb-lg-0">
                        <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
                        <Nav.Link as={Link} to="/scores">Scores</Nav.Link>);
                    </Nav>
                );
            }
            return (
                <Nav className="navbar-nav me-auto mb-2 mb-lg-0" />
            )
        }

        return (
            <Navbar bg="dark" variant="dark" expand="lg">
                <Container fluid>
                    <Navbar.Brand as={Link} to="/">{constants.appName}</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    {/* @ts-ignore */}
                    <Navbar.Collapse id="navbarNav">
                        {getNavLinks()}
                        <Nav className="navbar-nav ms-auto">
                            {getDropdown()}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        );
    }
}