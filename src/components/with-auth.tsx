import * as React from 'react';
import * as config from '../config';

import { Redirect } from 'react-router-dom';

import { checkExpiry } from "../constants";
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
            let authJSONstr = localStorage.getItem(config.localStorage_authJSON);
            let authJSON;
            if(authJSONstr) {
                try {
                    authJSON = JSON.parse(authJSONstr);
                } catch (e) {
                    console.error("Parse - error while parsing authJSON", e);
                }
            }
            // @ts-ignore
            const token = authJSON.token;
            if(token) {
                const data = await decode(token);
                if(data.decoded) {
                    if(checkExpiry(data.decoded.exp)) {
                        return data.decoded;
                    } else {
                        console.error("AUTH - token expired")
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