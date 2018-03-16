import React, { Component } from 'react';
import { Card, Row, Col,Badge} from 'antd';
import { Link } from 'react-router-dom';
import NewChallengesToSolve from './NewChallengesToSolve';
export default class Home extends Component {

    render() {
        return (
            <div className='homepage'>
                <Card title='New challenges for you'>
                    <NewChallengesToSolve {...this.props} />
                </Card>
                <Row type='flex' justify='space-around' style={{ marginTop: '20px' }}>
                    <Col span={6}>
                        <Card title='Current credit points'>
                        <Badge count={this.props.user.creditPoints} style={{ backgroundColor: '#52c41a' }} overflowCount={1000}/>
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card title='Answered questions'>
                            <Link to='/'>new questtion1</Link>
                            <Link to='/'>new questtion2</Link>
                            <Link to='/'>new questtion3</Link>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Link to='/portal/challengeform'>Ask New Question </Link>
                </Row>

            </div>
        )
    }
}