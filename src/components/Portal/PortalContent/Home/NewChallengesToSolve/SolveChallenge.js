import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card } from 'antd';
class SolveChallenge extends Component {
    state = { currentChallenge: null };
    componentDidMount(){
        if (this.props.challenges.length !== 0) {
            console.log("inside if 90");
            this.currentChallenge = this.props.challenges.find(challenge => (
                challenge.challengeId === this.props.match.params.challengeId
            ));
            this.setState({ currentChallenge: this.currentChallenge });
        }

    }
    render() {
        const { match } = this.props;
        console.log('match params::', match.params);
        console.log('chalenges:::', this.props.challenges);
        console.log('current challenge::', this.state.currentChallenge);
        return this.state.currentChallenge?(<Card>
            <h3>{this.state.currentChallenge.question}</h3>
        </Card>):(<h4>Error occured while loading challenge.contact administrator.</h4>)
    }
}

const mapStateToProps = (state) => ({ challenges: state.portal.challengeState.challenges })

export default connect(mapStateToProps)(SolveChallenge);