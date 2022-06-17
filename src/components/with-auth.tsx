import * as React from 'react';
import * as config from '../config';
import * as _ from 'lodash';

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
            let authJSONStr = localStorage.getItem(config.localStorage_authJSON);
            let authJSON;
            if(authJSONStr) {
                try {
                    authJSON = JSON.parse(authJSONStr);
                } catch (e) {
                    console.error("Parse - error while parsing authJSON", e);
                }
            }

            if(authJSON && authJSON.token) {
                // we decode from BE
                const data = await decode(authJSON.token);
                if(data.decoded) {
                    if(checkExpiry(data.decoded.exp)) {
                        const isEqual = _.isEqual(authJSON.decoded, data.decoded);

                        // never happen in normal case, but if it does, just replace the decoded values
                        // todo - need to invalidate token & remove any from LS if user update his credentials
                        if(!isEqual) {
                            authJSON.decoded = data.decoded;
                            localStorage.setItem(config.localStorage_authJSON, JSON.stringify(authJSON));
                        }
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