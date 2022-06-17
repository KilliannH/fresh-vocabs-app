import * as React from 'react';
import * as config from '../config';

import { Redirect } from 'react-router-dom';
import { decode } from "../services/authService";

export default function withAuth(ComponentToProtect) {
    
    // use the generic of the React.Component class as React.Component<PropsObject, StateObject>
    return class extends React.Component<{}, {redirect, currentUser}> {
        constructor(props) {
            super(props);
            this.state = {
                redirect: false,
                currentUser: ''
            };
        }

        async handleToken() {
            const token = localStorage.getItem(config.localStorage_token_str);
            // todo - decode token to get expiration
            if(token) {
                const data = await decode(token);
                if(data.decoded) {
                    const currentDateTime = new Date();
                    const now = currentDateTime.getTime() / 1000;
                    if(now < data.decoded.exp) {
                        return data.decoded;
                    }
                }
            }
            return false;
        }

        async componentDidMount() {
            const decoded = await this.handleToken();
            if(decoded) {
                this.setState({redirect: false, currentUser: {username: decoded.username, email: decoded.email}});
            } else {
                this.setState({redirect: true});
            }
        }


        render() {
            const { redirect, currentUser } = this.state;
            if (redirect) {
                return <Redirect to="/" />;
            }
            return <ComponentToProtect {...this.props} currentUser={currentUser} />;
        }
    }
}