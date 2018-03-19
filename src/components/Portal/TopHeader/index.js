import React, { Component } from 'react';
import { Menu, Layout } from 'antd';
import { Link } from 'react-router-dom';
import User from '../User';
const { Header } = Layout;

class TopHeader extends Component {
    render() {
        return (
            <Layout>
                <Header style={{ padding: '0' }}>
                    <div className="logo">QSapien</div>
                    <Menu theme='dark' mode='horizontal' defaultSelectedKeys={['home']}
                        style={{ lineHeight: '64px' }}>
                         <Menu.Item key="1"><a href='/portal'>Home</a></Menu.Item>
                        <Menu.Item key='leaderboard'><a href='/portal/leaderboard'>Leaderboard</a></Menu.Item>
                        <Menu.Item key='juryRoom'><a href="#">Jury Room</a></Menu.Item>
                        <Menu.Item key='knowledgeCenter'><a href='#'>Knowledge Center</a></Menu.Item>
                        <Menu.Item key='user' style={{ float: 'right' }}> <User {...this.props} /></Menu.Item>
                        <Menu.Item key='creditPoints' className='show-credit-points' style={{ float: 'right' }}>Credit Points: {this.props.user.creditPoints}</Menu.Item>
                    </Menu>
                </Header>
            </Layout>
        )
    }
};


export default TopHeader;