import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import ProfilePage from './ProfilePage';
import AccountSettings from './AccountSettings';
import ChallengeForm from './Home/ChallengeForm';
import SolveChallenge from './Home/NewChallengesToSolve/SolveChallenge';
import Home from './Home';

export default class PortalContent extends Component {
    render() {
        return (
            <Switch>
                <Route exact path='/portal' render={()=>(<Home user={this.props.user}/>)}/>)} />
                <Route  exact path='/portal/profile_page' render={()=>(<ProfilePage user={this.props.user}/>)} />
                <Route  exact path='/portal/accountsettings' render={()=>(<AccountSettings user={this.props.user}/>)}/>)} />
                <Route exact path='/portal/challengeform' render={()=>(<ChallengeForm {...this.props}/>)} />
                <Route exact path='/portal/solveChallenge/:challengeId' component={SolveChallenge}/>
            </Switch>
        )
    }
};