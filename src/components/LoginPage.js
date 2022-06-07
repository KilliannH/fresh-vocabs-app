import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import {Button} from "react-bootstrap";
import logo from "../logo.svg";
import { login } from "../services/authService";
import PropTypes from 'prop-types';

function LoginPage({ setToken }) {
    let navigate = useNavigate();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = async e => {
        // prevent page reload
        e.preventDefault();
        const data = await login({
            email,
            password
        });
        if(data.token) {
            setToken(data.token);
            navigate('../dashboard', {replace: true});
        } else {
            console.error("Auth - an error occured");
        }
    }

    return(
        <div className="form-signin">
            <form onSubmit={handleSubmit}>
            <img className="mb-4" src={logo} alt="" width="200" height="200" />
            <h1 className="h3 mb-3 fw-normal">Please login</h1>
                <div className="form-floating">
                    <input type="email" className="form-control" onChange={e => setEmail(e.target.value)} id="floatingInput" autoComplete="current-email"
                           placeholder="Email" />
                        <label htmlFor="floatingInput">Email address</label>
                </div>
                <div className="form-floating">
                    <input type="password" className="form-control" onChange={e => setPassword(e.target.value)} id="floatingPassword"
                           autoComplete="current-password" placeholder="Password" />
                        <label htmlFor="floatingPassword">Password</label>
                </div>

                <div className="checkbox mb-3">
                    <label>
                        <input type="checkbox" value="remember-me" /> Remember me
                    </label>
                </div>
            <Button className="w-100 btn btn-lg btn-primary" type="submit">Login</Button>
            <p className="mt-5 mb-3 text-muted">© 2017–2021</p>
            </form>
        </div>
        );
}

LoginPage.propTypes = {
    setToken: PropTypes.func.isRequired
}

export default LoginPage;