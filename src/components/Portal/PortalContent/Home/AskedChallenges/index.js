import React, { Component } from 'react';
import {Table} from 'antd';

export default class AskedChallenges extends Component {
    render() {
        const columns = [
            { title: 'Question', dataIndex: 'question', key: 'question' },
            { title: 'To', dataIndex: 'opponentName', key: 'opponentName' },
            { title: 'Credit Points', dataIndex: 'creditPoints', key: 'creditPoints' }
        ];
        let askedChallenges = this.props.askedChallenges;
        const data = askedChallenges.map((challenge) => {
            let { question, creditPoints, opponentName, challengeId } = challenge;
            let key = challengeId;
            return { question, creditPoints,opponentName, key };
        });
        return (
            <div>
                <Table columns={columns} dataSource={data} />
            </div>
        )
    }
}
