import React, { Component } from 'react';
import {Table} from 'antd';

export default class SolvedChallenges extends Component {
    render() {
        const columns = [
            { title: 'Question', dataIndex: 'question'},
            { title: 'From', dataIndex: 'opponentName'},
            { title: 'Credit Points', dataIndex: 'creditPoints' },
            {title:'Status',dataIndex:'status'}
        ];
        let solvedChallenges = this.props.solvedChallenges;
        const data = solvedChallenges.map((challenge,index) => {
            let { question, creditPoints, opponentName,isAnsweredCorrect} = challenge;
            let key=index;
            const status=isAnsweredCorrect?'Passed':'Failed';
            return { question, creditPoints,opponentName,status,key};
        });
        return (
            <div>
                <Table columns={columns} dataSource={data} rowKey="key"/>
            </div>
        )
    }
}
