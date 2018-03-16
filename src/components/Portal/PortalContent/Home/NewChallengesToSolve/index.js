import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getChallenges } from '../actions';
import { Button, Table, Divider} from 'antd';
// import { fetchChallenges } from '../utils/challengeApi';

import { Link } from 'react-router-dom';

class NewChallengesToSolve extends Component {
    componentWillReceiveProps(props) {
        /*need to find a better method to update challenge list.maybe using observer pattern */
        // if (props.user.userId&&!this.timer) {
        //     this.timer=setInterval(props.getChallenges(props.user.userId),60000);
        // }
    }
    componentWillUnmount() {
        clearInterval(this.timer);
    }
    handleDelete = (challenge) => {
        console.log('inside handle delete method');
    }
    render() {
        const columns = [
            { title: 'Question', dataIndex: 'question', key: 'question' },
            { title: 'Opponent Name', dataIndex: 'senderName', key: 'senderName' },
            { title: 'Credit Points', dataIndex: 'creditPoints', key: 'creditPoints' },
            {
                title: 'Actions', key: 'actions', render: (text, record) => (<span><Link to={`/portal/solveChallenge/${record.key}`}>Solve</Link>
                    <Divider type='vertical' />
                    <Button onClick={() => { this.handleDelete(record) }}>Delete</Button>
                </span>)
            }
        ];
        let challenges = this.props.challenges;
        const data = challenges.map((challenge) => {
            let { question, creditPoints, senderName, challengeId } = challenge;
            let key = challengeId;
            return { question, creditPoints, senderName, key };
        });
        return (
            <div>
                <Table columns={columns} dataSource={data} />
            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    challenges: state.portal.challengeState.challenges
})

export default connect(mapStateToProps, { getChallenges })(NewChallengesToSolve);
