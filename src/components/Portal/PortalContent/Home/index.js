import React, { Component } from 'react';
import { Card, Row, Col } from 'antd';
import { Link } from 'react-router-dom';
export default class Home extends Component {



    render() {
        return (
            <div>
                <Row type='flex' justify='space-around' style={{ marginTop: '20px' }}>
                    <Col span={8}>
                        <Card title='New questions for you'>
                            <Link to='/'>new questtion1</Link>
                            <Link to='/'>new questtion2</Link>
                            <Link to='/'>new questtion3</Link>
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card title='Current credit points'>
                            <p>23</p>
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