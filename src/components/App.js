import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from './Login/index.js';
import { connect } from 'react-redux';
import Signup from './Signup/index.js';
import Portal from './Portal/index.js';
import { checkPortalAuthorization } from '../lib/check-auth';

class App extends Component {
    render() {
        const store = this.props.store;
        return (
            <Switch>
                <Route exact path="/" render={() => <Redirect to='/portal' />} />
                <Route path="/portal"
                    render={() => {
                        return (checkPortalAuthorization(store) ? (<Portal />) : (<Redirect to='/login' />))
                    }} />
                <Route exact path="/login"
                    render={() => (checkPortalAuthorization(store) ? (<Redirect to='/portal' />) : (<Login />))} />
                <Route exact path="/signup" component={Signup} />
            </Switch>
        )
    }
}
const mapStateToProps = (state) => (
    {
        state: state
    })
export default connect(mapStateToProps, null, null, { pure: false })(App);