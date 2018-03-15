import React,{Component} from 'react';
import {Menu,Layout}from 'antd';
import {Link} from 'react-router-dom';
import User from '../User';
const {Header} =Layout;

class TopHeader extends Component{
    render(){
        return(
            <Layout>
                <Header style={{padding:'0'}}>
                <div className="logo">QSapien</div>
                <Menu theme='dark' mode='horizontal' defaultSelectedKeys={['home']}
                style={{lineHeight:'64px'}}>
                <Menu.Item key='home'><Link to='/'>Home</Link></Menu.Item>
                <Menu.Item key='leaderboard'>Leaderboard</Menu.Item>
                <Menu.Item key='juryRoom'>Jury Room</Menu.Item>
                <Menu.Item key='knowledgeCenter'>Knowledge Center</Menu.Item>
                <Menu.Item key='user' style={{float:'right'}}> <User {...this.props}/></Menu.Item>
                </Menu>
                </Header>
            </Layout>
        )
    }
};


export default TopHeader;