import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from './Login/index.js';
import { connect } from 'react-redux';
import Signup from './Signup/index.js';
import Portal from './Portal/index.js';
import ActivateAccount from './Login/ActivateAccount';
import AuthorizeRoute from '../lib/AuthorizeRoute';

class App extends Component {
    render() {
        const { store } = this.props;
        return (
            <div>
                <Switch>
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/signup" component={Signup} />
                    <Route exact path='/activateaccount' component={ActivateAccount}/>
                    <AuthorizeRoute path='/portal' component={Portal} store={store} />
                    <Redirect to='/portal' />                    
                </Switch>
            </div>
        )
    }
}
const mapStateToProps = (state) => (
    {
        state: state
    })
export default connect(mapStateToProps, null, null, { pure: false })(App);