import React, { Component } from 'react';
import { Card, Collapse } from 'antd';
import NewChallengesToSolve from './NewChallengesToSolve';
import AskedChallenges from './AskedChallenges';
import SolvedChallenges from './SolvedChallenges';
const Panel = Collapse.Panel;
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
                <Collapse defaultActiveKey={['1']}>
                    <Panel header='New challenges for you' style={{ fontWeight: '500' }} key='1'>
                        <Card>
                            <NewChallengesToSolve challenges={this.props.challengeState.challenges} />
                        </Card>
                    </Panel>
                </Collapse>
                <Collapse defaultActiveKey={['1']} style={{marginTop:'20px'}}>
                    <Panel header='Asked questions by you' style={{ fontWeight: '500' }} key='1'>
                        <Card>
                            <AskedChallenges askedChallenges={this.props.challengeState.askedChallenges} />
                        </Card>
                    </Panel>
                </Collapse>
                <Collapse defaultActiveKey={['1']} style={{marginTop:'20px'}}>
                    <Panel header='Solved Challenges by you' style={{ fontWeight: '500' }} key='1'>
                        <Card>
                            <SolvedChallenges solvedChallenges={this.props.challengeState.solvedChallenges} />
                        </Card>
                    </Panel>
                </Collapse>
            </div>
        )
    }
}