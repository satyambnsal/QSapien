import React,{Component} from 'react';
import {Card} from 'antd';
export default class UserProfile extends Component{
    render(){

        return(
            <Card className='profile-card'>
           <img src={this.props.user.profile_image_url} className='profile-update' alt='Profile' /> 
           <h3 style={{marginTop:'10px'}}>{this.props.user.name}</h3>
           <h5 style={{color:'#666'}}>{this.props.user.location}</h5>
           <p className='user-bio'>{this.props.user.bio}</p>
           <hr/>    
            </Card>
        )
    }
}