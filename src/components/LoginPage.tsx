import * as React from "react";
import {Button} from "react-bootstrap";
import logo from "../logo.svg";
import { login } from "../services/authService";

export default class LoginPage extends React.Component<{setToken, navigation}> {

    state: any;
    navigation: any;

    constructor(props) {
        super(props);
        this.state = {
            email: 0,
            password: null
        }
    }

    async handleSubmit(e) {
        e.preventDefault();
        console.log(this.state)
        console.log("bibi");
        // prevent page reload
        const data = await login({
            email: this.state.email,
            password: this.state.password
        });
        if(data.token) {
            this.props.setToken(data.token);
            this.navigation.navigate('../dashboard', {replace: true});
        } else {
            console.error("Auth - an error occured");
        }
    }

    render() {
        return (
            <div className="form-signin">
                <Button className="w-100 btn btn-lg btn-primary" type="button" onClick={() => this.setState({email: this.state.email + 1})}>LLLL</Button>
                <Button className="w-100 btn btn-lg btn-primary" type="button" onClick={() => console.log(this.state.email)}>RRR</Button>

                <form onSubmit={this.handleSubmit}>
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