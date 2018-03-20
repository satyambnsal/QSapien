import React, { Component } from 'react';
import { Menu, Layout } from 'antd';
import { Link } from 'react-router-dom';
import User from '../User';
const { Header } = Layout;

class TopHeader extends Component {
    render() {
        return (
            <Layout>
                <Header style={{ padding: '0'}}>
                    <div className="logo">QSapien</div>
                    <Menu theme='dark' mode='horizontal'
                        style={{ lineHeight: '64px' }}>
                        <Menu.Item key='user' className="no-select-background" style={{ float: 'right' }}> <User {...this.props} /></Menu.Item>
                        <Menu.Item key='creditPoints' className='show-credit-points' style={{ float: 'right' }}>Credit Points: {this.props.user.creditPoints}</Menu.Item>
                    </Menu>
                </Header>
            </Layout>
        )
    }
};


export default TopHeader;