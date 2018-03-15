import React, { Component } from 'react';
import { Avatar, Menu, Icon, Dropdown } from 'antd';
import { Link,Redirect} from 'react-router-dom';
const PROFILE_FALLBACK_URL=`${process.env.REACT_APP_API_URL}/profileImages/default_profile.jpg`
class User extends Component {
state={loggedIn:true,
    profileLoaded:false,
    profileImageUrl:this.props.user.profile_image_url||PROFILE_FALLBACK_URL
}
componentDidUpdate(){
    if(this.props.user.profile_image_url&&!this.state.profileLoaded){
        this.setState({profileImageUrl:this.props.user.profile_image_url,profileLoaded:true});
    }
}
    handleLogout=(e)=>{
        e.preventDefault();
        localStorage.removeItem('token');
        this.props.unsetClient();
        console.log('inside handle logout function');
        this.setState({loggedIn:false})
    }
    render() {
        const menu = (
            <Menu>
                <Menu.Item key="userProfile">
                    <Link to='/portal/profile_page'>
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
            <Avatar src={this.state.profileImageUrl} size="large" />
        </Dropdown>):(<Redirect to='/login'/>))          
    }
        
    }

export default User;