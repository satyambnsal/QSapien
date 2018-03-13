import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getChallenges } from '../actions';
import { List, Button, Table, Divider, Icon, Modal, Select, Row, Col } from 'antd';
// import { fetchChallenges } from '../utils/challengeApi';
import { Link } from 'react-router-dom';
const Option = Select.Option;
class NewChallengesToSolve extends Component {

    componentWillReceiveProps(props) {
        if (props.user.userId&&!this.timer) {
            this.timer=setInterval(props.getChallenges(props.user.userId),60000);
        }
    }
    componentWillUnmount() {
        clearInterval(this.timer);
    }
    handleDelete = (challenge) => {
        console.log('inside handle delete');
        console.log(challenge);
    }
    render() {
        const { match } = this.props;
        console.log('get challenges:',this.props.getChallenges);
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
        console.log('user id:: new challenges to solve' + this.props.user.userId);
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
const mapDispatchToProps=(dispatch)=>({
    getChallenges:(userId)=>{
        dispatch(getChallenges(userId))
    }
})
NewChallengesToSolve = connect(mapStateToProps,mapDispatchToProps)(NewChallengesToSolve);
export default NewChallengesToSolve;