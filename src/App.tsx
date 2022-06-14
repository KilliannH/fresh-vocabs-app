import {BrowserRouter, Routes, Route,} from "react-router-dom";
import HomePage from "./components/HomePage";
import LoginPage from "./components/LoginPage";
import DashboardPage from "./components/DashboardPage";
import NavbarComponent from "./components/NavbarComponent";
import './App.css';
import * as React from "react";
import * as navigation from "react-router-dom"

export default class App extends React.Component<{}> {

    state: any;

    constructor({props}) {
        super(props);
        this.state = {
            token: null,
        };
    }

    render() {
        // random user
        if (!this.state.token) {
            return (
                <>
                    <BrowserRouter>
                        <NavbarComponent/>
                        <Routes>
                            <Route path={"/login"} element={<LoginPage setToken={(token) => this.state.token = token} navigation={navigation}/>}/>
                            <Route path={"/"} element={<HomePage/>}/>
                            <Route
                                path="*"
                                element={<HomePage/>}/>
                        </Routes>
                    </BrowserRouter>
                </>
            );
        }

        // connected user
        return (
            <>
                <BrowserRouter>
                    <NavbarComponent/>
                    <Routes>
                        <Route path={"/home"} element={<HomePage/>}/>
                        <Route path={"/dashboard"} element={<DashboardPage/>}/>
                        <Route path={"/"} element={<HomePage/>}/>
                        <Route
                            path="*"
                            element={<HomePage/>}/>
                    </Routes>
                </BrowserRouter>
            </>
        );
    }
}
