import React, { Component } from 'react';
import { Avatar, Menu, Icon, Dropdown } from 'antd';
import { Link } from 'react-router-dom';
import history from './../../../history';
class User extends Component {
    constructor(props) {
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
    }
    handleLogout(e) {
        e.preventDefault();
        localStorage.removeItem('token');
        this.props.unsetClient();
        return false;
    }
    render() {
        const menu = (
            <Menu>
                <Menu.Item key="userProfile">
                    <Link to='/portal/userprofile'>
                        <Icon type='user' />&nbsp;{this.props.user.name}
                    </Link>
                </Menu.Item>
                <Menu.Item key="accountSettings">
                    <Link to='/portal/accountsettings'>
                        <Icon type="setting" />
                        &nbsp;account settings
                    </Link>
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item key="logout">
                    <a href="" onClick={(e) => { this.handleLogout(e) }}>
                        <Icon type='logout' />  &nbsp;Logout
                                </a>
                </Menu.Item>
            </Menu>
        );
        return (
            <Dropdown overlay={menu} placement='bottomCenter'>
                <Avatar src="http://localhost:3001/files/satyam_bansal.jpg" size="large" />
            </Dropdown>
        )
    }
}

export default User;