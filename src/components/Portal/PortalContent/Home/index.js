import React, { Component } from 'react';
import { Card} from 'antd';
import NewChallengesToSolve from './NewChallengesToSolve';
import AskedChallenges from './AskedChallenges';
import SolvedChallenges from './SolvedChallenges';
export default class Home extends Component {
    state = {
        creditPoints: 0
    }
    componentWillMount() {
        if (this.props.user.creditPoints)
            this.setState({ creditPoints: this.props.user.creditPoints });
    }
    componentWillReceiveProps(props) {
        if (props.user.creditPoints)
            this.setState({ creditPoints: props.user.creditPoints });
    }
    render() {
        return (
            <div className='homepage'>
                <Card title='New challenges for you'>
                    <NewChallengesToSolve challenges={this.props.challengeState.challenges} />
                </Card>

                <Card title='Asked questions by you' style={{marginTop:'20px'}}>
                    <AskedChallenges askedChallenges={this.props.challengeState.askedChallenges}/>
                </Card>
                <Card title='Solved Challenges by you' style={{marginTop:'20px'}}>
                    <SolvedChallenges solvedChallenges={this.props.challengeState.solvedChallenges}/>
                </Card>
            </div>
        )
    }
}