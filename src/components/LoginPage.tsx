import * as React from "react";
import {Button} from "react-bootstrap";
import logo from "../logo.svg";
import { login } from "../services/authService";
import * as config from "../config";
import NavbarComponent from "./NavbarComponent";

// use the generic of the React.Component class as React.Component<PropsObject, StateObject>
export default class LoginPage extends React.Component<{appLogin}, {email, password}> {


    constructor({props}) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }

    async handleSubmit(e) {
        e.preventDefault();
        const { appLogin } = this.props;
        // prevent page reload
        const res = await login({
            email: this.state.email,
            password: this.state.password
        });
        if(res && res.success) {
            appLogin(res.data);
        } else {
            console.error("Auth - an error occured");
        }
    }

    render() {
        return (
            <div className="form-signin">
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <img className="mb-4" src={logo} alt="" width="200" height="200"/>
                    <h1 className="h3 mb-3 fw-normal">Please login</h1>
                    <div className="form-floating">
                        <input type="email" className="form-control" onChange={(e) => this.setState({email: e.target.value})}
                               id="floatingInput" autoComplete="current-email"
                               placeholder="Email"/>
                        <label htmlFor="floatingInput">Email address</label>
                    </div>
                    <div className="form-floating">
                        <input type="password" className="form-control" onChange={(e) => this.setState({password: e.target.value})}
                               id="floatingPassword"
                               autoComplete="current-password" placeholder="Password"/>
                        <label htmlFor="floatingPassword">Password</label>
                    </div>

                    <div className="checkbox mb-3">
                        <label>
                            <input type="checkbox" value="remember-me"/> Remember me
                        </label>
                    </div>
                    <Button className="w-100 btn btn-lg btn-primary" type="submit">Login</Button>
                    <p className="mt-5 mb-3 text-muted">© 2017–2021</p>
                </form>
            </div>
        );
    }
}