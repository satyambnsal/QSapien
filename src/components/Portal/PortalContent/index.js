import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import UserProfile from './UserProfile';
import AccountSettings from './AccountSettings';
import ChallengeForm from './Home/ChallengeForm';
import SolveChallenge from './Home/NewChallengesToSolve/SolveChallenge';
import Home from './Home';

export default class PortalContent extends Component {
    render() {
        return (
            <Switch>
                <Route exact path='/portal' component={Home}/>)} />
                <Route  exact path='/portal/userprofile' component={UserProfile} />
                <Route  exact path='/portal/accountsettings' component={AccountSettings}/>)} />
                <Route exact path='/portal/challengeform' render={()=>(<ChallengeForm {...this.props}/>)} />
                <Route exact path='/portal/solveChallenge/:challengeId' component={SolveChallenge}/>
            </Switch>
        )
    }
};