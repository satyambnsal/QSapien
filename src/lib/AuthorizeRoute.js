import React, { Component } from 'react';
import { setClient } from "../components/Client/actions";
import {Route,Redirect} from 'react-router-dom';
import Login from '../components/Login';
export default class AuthorizedRoute extends Component {

    checkPortalAuthorization = ({ dispatch, getState }) => {
        console.log('inside check portal authorization');
        const client = getState().client;
        console.log('--------------client----------' + JSON.stringify(client));
        if (client && client.token) {
            console.log('client token');
            return true;
        }
        else {
            const storedToken = localStorage.getItem('token');
            if (storedToken) {
                console.log('inside stored token if condition');
                const token = JSON.parse(storedToken);
                const createdDate = new Date(token.created);
                const created = Math.round(createdDate.getTime() / 1000);
                const ttl = 60 * 60 * 24;
                const expiry = created + ttl;
                if (created > expiry)
                    return false;
                dispatch(setClient(token))
                return true;
            }
            return false;
        }
    }

    render() {
        const { store } = this.props;
        const { component: Component, ...rest } = this.props
        const bool=this.checkPortalAuthorization(store);
        console.log('bool value::'+bool);
        return (
            // <Route exact={true} {...rest} render={props => {
            //     return bool
            //         ? <Component {...this.props} />
            //         : <Login />
            // }} />
            <Route exact={true} {...rest} render={props => {
                return bool
                    ? <Component {...this.props} />
                    : <Redirect to='/login'/>
            }} />

        )
    }
}

