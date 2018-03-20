import React, { Component } from 'react';
import { Button, Table, Divider} from 'antd';
import { Link } from 'react-router-dom';

export default class NewChallengesToSolve extends Component {
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
