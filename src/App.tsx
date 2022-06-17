import {BrowserRouter, Route, Switch} from "react-router-dom";
import HomePage from "./components/HomePage";
import LoginPage from "./components/LoginPage";
import DashboardPage from "./components/DashboardPage";
import NavbarComponent from "./components/NavbarComponent";
import './App.css';
import * as React from "react";
import withAuth from "./components/with-auth";
import * as config from "./config";
import history from './history'

export default class App extends React.Component<{}, {currentUser}> {

    constructor(props) {
        super(props);
        this.state = {
            currentUser: null,
        };
    }

    componentDidMount() {
        let authJSON: any;
        try {
            authJSON = JSON.parse(localStorage.getItem(config.localStorage_authJSON));
        }catch (e) {
            console.error("Parse - error while parsing userInfos", e);
        }
        if(authJSON && authJSON.decoded) {
            this.setState({currentUser: {username: authJSON.decoded.username, email: authJSON.decoded.email}})
        }
    }

    logout() {
        localStorage.removeItem(config.localStorage_authJSON);
        this.setState({currentUser: null});
        //@ts-ignore
        history.push('/');
    }

    appLogin(authJSON) {
        localStorage.setItem(config.localStorage_authJSON, JSON.stringify(authJSON));
        this.setState({currentUser: {username: authJSON.decoded.username, email: authJSON.decoded.email}});
        history.push('/dashboard');
    }

    render() {
        const { currentUser } = this.state;
        return (
            <>
                <NavbarComponent currentUser={currentUser} logout={this.logout.bind(this)}/>
                    <Switch>
                        <Route path={"/login"} component={(props) => <LoginPage {...props} appLogin={this.appLogin.bind(this)}/>}/>
                        <Route path={"/dashboard"} component={withAuth(DashboardPage)}/>
                        <Route path={"*"} component={HomePage}/>
                    </Switch>
            </>
        );
    }
}
