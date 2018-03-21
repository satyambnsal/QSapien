import React,{Component} from 'react';
import {Alert} from 'antd';

export default class ActivateAccount extends Component{
render(){
    return(
        <div class='activate-account'>
        <Alert message='Your Account is not verified yet.please verify your account to use QSapien services' type='info'/>
        </div>
    )
}
}