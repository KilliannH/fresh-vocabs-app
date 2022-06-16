import * as React from 'react';
import * as config from '../config';
import { Component } from 'react';
import { Redirect } from 'react-router-dom';

export default function withAuth(ComponentToProtect) {
    return class extends Component {
        constructor(props) {
            super(props);
            this.state = {
                redirect: false,
            };
        }

        handleToken() {
            const token = localStorage.getItem(config.localStorage_token_str);
            // todo - decode token to get expiration
            return token;
        }

        componentDidMount() {
            if(!this.handleToken()) {
                this.setState({redirect: true});
            }
        }


        render() {
            // @ts-ignore
            const { redirect } = this.state;
            if (redirect) {
                return <Redirect to="/" />;
            }
            return <ComponentToProtect {...this.props} />;
        }
    }
}