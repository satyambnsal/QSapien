import React,{Component} from 'react';
import {Menu}from 'antd';
import {Link} from 'react-router-dom';
import User from '../User';


class TopHeader extends Component{
    render(){
        return(
            <div>
                <div className="logo" />
                <Menu theme='dark' mode='horizontal' defaultSelectedKeys={['home']}
                style={{lineHeight:'64px'}}>
                <Menu.Item key='home'><Link to='/'>Home</Link></Menu.Item>
                <Menu.Item key='leaderboard'>Leaderboard</Menu.Item>
                <Menu.Item key='juryRoom'>Jury Room</Menu.Item>
                <Menu.Item key='knowledgeCenter'>Knowledge Center</Menu.Item>
                <Menu.Item key='user' style={{float:'right'}}> <User {...this.props}/></Menu.Item>
                </Menu>
            </div>
           
        )
    }
};


export default TopHeader;