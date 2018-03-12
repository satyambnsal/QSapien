import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from './Login/index.js';
import { connect } from 'react-redux';
import Signup from './Signup/index.js';
import Portal from './Portal/index.js';
import AuthorizeRoute from '../lib/AuthorizeRoute';
class App extends Component {
    render() {
        const store = this.props.store;
        return (
            <Switch>
                <Route exact path="/" render={() => <Redirect to='/portal' />} />
                <AuthorizeRoute path='/portal' component={Portal} store={store} />
                <Route exact path="/login" component={Login} />
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