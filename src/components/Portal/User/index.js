import React, { Component } from 'react';
import { Avatar, Menu, Icon, Dropdown } from 'antd';
import { Link,Redirect} from 'react-router-dom';
class User extends Component {
state={loggedIn:true}
    handleLogout=(e)=>{
        e.preventDefault();
        localStorage.removeItem('token');
        this.props.unsetClient();
        this.setState({loggedIn:false})
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
            
            this.state.loggedIn?(<Dropdown overlay={menu} placement='bottomCenter'>
            <Avatar src="http://localhost:3001/files/satyam_bansal.jpg" size="large" />
        </Dropdown>):(<Redirect to='/login'/>))          
    }
        
    }

export default User;