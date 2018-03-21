import React, { Component } from 'react';
import TopHeader from './TopHeader';
import PortalContent from './PortalContent';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { unsetClient } from '../Client/actions';
import { getUser, getFriendList, getPublicContacts } from './actions';
import { addContactToFriendList } from './actions';
import { Layout, Menu, Icon } from 'antd';
const { Header, Content, Footer, Sider } = Layout;

const REACT_APP_API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';
//const LOCAL_ICON_URL = `${REACT_APP_API_URL}/icons`;
class Portal extends Component {
    state = {
        collapsed: true
    };
    onCollapse = (collapsed) => {
        this.setState({ collapsed });
    }
    render() {
        let { unsetClient, user } = this.props;
        return (
            <Layout>
                <Header style={{ padding: '0'}}>
                    <TopHeader unsetClient={unsetClient} user={user} /></Header>
                <Layout>
                    <Sider style={{ minHeight: '100vh', width: '256px' }} collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
                        <Menu theme='dark' mode='inline'>
                            <Menu.Item key="askquestion"><span><Link to='/portal/challengeform'><Icon type='question-circle-o' style={{ color: 'white' }} /></Link></span>
                                <span className='side-nav-item'><Link to='/portal/challengeform'>Ask New Question</Link></span></Menu.Item>
                            <Menu.Item key="1"><span><Link to='/portal'><Icon type='home' style={{ color: 'white' }} /></Link></span>
                                <span className='side-nav-item'><Link to='/portal'>Home</Link></span></Menu.Item>
                            <Menu.Item key='leaderboard'><span><Link to='/portal/leaderboard'><Icon type='trophy' style={{ color: 'white' }} /></Link></span>
                                <span className='side-nav-item'><Link to='/portal/leaderboard'>Leaderboard</Link></span></Menu.Item>
                            <Menu.Item key='juryRoom' disabled><span><a href='#'><i className='fa fa-gavel' style={{ color: 'white' }} />&nbsp;&nbsp;&nbsp;</a></span>
                                <span className='side-nav-item'><a href='#'>Jury Room</a></span></Menu.Item>
                            <Menu.Item key='knowledgeCenter' disabled><span><a href='#'><Icon type='book' style={{ color: 'white' }} /></a></span>
                                <span className='side-nav-item'><a href='#'>Knowledge Center</a></span></Menu.Item>
                        </Menu>
                    </Sider>
                    <Content>
                        <PortalContent {...this.props} />
                    </Content>
                </Layout>
                <Footer>
                </Footer>
            </Layout>
        )
    }
}
let mapStateToProps = (state) => {
    return {
        publicContacts: state.portal.userState.publicContacts,
        user: state.portal.userState.user,
        token: state.client.token,
        friendList: state.portal.userState.friendList,
        leaderboard: state.portal.userState.leaderboard,
        challengeState: state.portal.challengeState
    }
}
let mapDispathToProps = (dispatch) => {
    return {
        unsetClient: () => {
            dispatch(unsetClient())
        },
        addContactToFriendList: (userId, friendId) => {
            dispatch(addContactToFriendList(userId, friendId))
        },
        getUser: (token) => {
            dispatch(getUser(token))
        },
        getFriendList: (userId) => {
            dispatch(getFriendList(userId))
        },
        getPublicContacts: (userId) => {
            dispatch(getPublicContacts(userId))
        }
    }
}
Portal = connect(mapStateToProps, mapDispathToProps)(Portal);
export default Portal;