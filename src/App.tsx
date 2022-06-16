import {BrowserRouter, Route, Switch} from "react-router-dom";
import HomePage from "./components/HomePage";
import LoginPage from "./components/LoginPage";
import DashboardPage from "./components/DashboardPage";
import NavbarComponent from "./components/NavbarComponent";
import './App.css';
import * as React from "react";
import withAuth from "./components/with-auth";

export default class App extends React.Component<{}> {

    constructor(props) {
        super(props);
        this.state = {
            token: null,
        };
    }

    render() {
        return (
            <>
                <NavbarComponent/>
                    <Switch>
                        <Route path={"/login"} component={LoginPage}/>
                        <Route path={"/dashboard"} component={withAuth(DashboardPage)}/>
                        <Route path={"*"} component={HomePage}/>
                    </Switch>
            </>
        );
    }
}
