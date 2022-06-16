import * as React from "react";
import {Button} from "react-bootstrap";
import logo from "../logo.svg";
import { login } from "../services/authService";
import * as config from "../config";

class LoginPage extends React.Component<{}> {

    history: any;
    state: any;


    constructor({props}) {
        super(props);
        this.state = {
            email: 0,
            password: null
        }
    }

    async handleSubmit(e) {
        e.preventDefault();
        // prevent page reload
        const data = await login({
            email: this.state.email,
            password: this.state.password
        });
        if(data.token) {
            localStorage.setItem(config.localStorage_token_str, data.token);
            // @ts-ignore
            this.props.history.push('/dashboard');
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

export default LoginPage;