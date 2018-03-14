import React, { Component } from 'react';
import { setClient, initializeState } from "../components/Client/actions";
import { Route, Redirect } from 'react-router-dom';
import Login from '../components/Login';
export default class AuthorizedRoute extends Component {

    checkPortalAuthorization = ({ dispatch, getState }) => {
        const client = getState().client;
        if (client && client.token) {
            //     dispatch(initializeState(client.token.userId))
            return true;
        }
        else {
            const storedToken = localStorage.getItem('token');
            if (storedToken) {
                const token = JSON.parse(storedToken);
                const createdDate = new Date(token.created);
                const created = Math.round(createdDate.getTime() / 1000);
                const ttl = 60 * 60 * 24;
                const expiry = created + ttl;
                if (created > expiry)
                    return false;
                dispatch(setClient(token))
                dispatch(initializeState(token.userId));
                return true;
            }
            return false;
        }
    }

    render() {
        const { store } = this.props;
        const { component: Component, ...rest } = this.props
        const bool = this.checkPortalAuthorization(store);
        return (
            <Route exact={true} {...rest} render={props => {
                return bool
                    ? <Component {...this.props} />
                    : <Login />
            }} />
            /* i will visit this issue later.i've just quick fixed it but its not the right way to to this*/

            // <Route exact={true} {...rest} render={props => {
            //     return bool
            //         ? <Component {...this.props} />
            //         : <Redirect to='/login'/>
            // }} />
        )
    }
}

