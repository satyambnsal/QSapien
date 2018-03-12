import React, { Component } from 'react';
import TopHeader from './TopHeader';
import PortalContent from './PortalContent';
import { connect } from 'react-redux';
import { unsetClient } from '../Client/actions';
import { getUser, getFriendList ,getPublicContacts} from './actions';
import {addContactToFriendList } from './actions';
import { Layout,Menu,Icon} from 'antd';
const { Header, Content, Footer,Sider} = Layout;
class Portal extends Component {
    constructor(props) {
        super(props);
        if (this.props.token) {
            this.props.getUser(this.props.token.userId);
        } 
        this.state={
            collapsed:true
        };
    }
    onCollapse=(collapsed)=>{
        this.setState({collapsed});
    }
    render() {
        let { unsetClient,user} = this.props;
        return (
            <Layout>
                <Header style={{ padding: '0' }}>
                    <TopHeader unsetClient={unsetClient} user={user} /></Header>
                <Layout>
                    <Sider style={{ minHeight: '100vh', width: '256px' }} collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
                        <Menu theme='dark' defaultSelectedKeys={['1']} mode='inline'>
                            <Menu.Item key="1"><Icon type='home'/><span>Home</span></Menu.Item>
                        </Menu>
                    </Sider>
                    <Content>
                        <PortalContent {...this.props}/>
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
        publicContacts: state.portal.publicContacts,
        user: state.portal.user,
        token: state.client.token,
        friendList: state.portal.friendList
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
        getPublicContacts:(userId)=>{
            dispatch(getPublicContacts(userId))
        }
    }
}
Portal = connect(mapStateToProps, mapDispathToProps)(Portal);
export default Portal;