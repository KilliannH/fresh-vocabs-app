import * as React from "react";
import { Navbar, Container, Nav, NavDropdown} from "react-bootstrap";
import {Link} from "react-router-dom";
import constants from "../constants";
import * as config from "../config";
import UserInfos from "../../types/UserInfos";

export default class NavbarComponent extends React.Component<{}, {currentUser}> {

    constructor(props) {
        super(props);
        this.state = {
            currentUser: null
        }
    }

    componentDidMount() {
        let userInfos: UserInfos | null;
        try {
          userInfos = JSON.parse(localStorage.getItem(config.localStorage_userInfos));
        }catch (e) {
            console.error("Parse - error while parsing userInfos", e);
        }
        if(userInfos) {
            this.setState({currentUser: {username: userInfos.username, email: userInfos.email}})
        }
    }

    render() {
        const { currentUser } = this.state;
        const getDropdown = () => {
            if(!currentUser) {
                return(<Nav.Link as={Link} to="/login">Login</Nav.Link>);
            }
            return (<NavDropdown title="Dropdown" id="navDropdown">
                <NavDropdown.Item >Logout</NavDropdown.Item>
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