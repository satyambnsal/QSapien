import React, { Component } from 'react';
import '../../stylesheets/style.css'
import TopHeader from './TopHeader';
import {connect} from 'react-redux';
import {unsetClient} from '../Client/actions';
  class Portal extends Component {
    constructor(props) {
        super(props);
        }
    render() {
        let unsetClient=this.props.unsetClient;
        return (
            <TopHeader unsetClient={unsetClient}/>
        )
    }
}
let mapStateToProps=(state)=>{
    return {}
}
let mapDispathToProps=(dispatch)=>{
    return{
        unsetClient:()=>{
            dispatch(unsetClient())
        }
    }
}
Portal=connect(mapStateToProps,mapDispathToProps)(Portal);
export default Portal;