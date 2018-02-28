import React, { Component } from 'react';
import '../../stylesheets/style.css'
import TopHeader from './TopHeader';
import PortalContent from './PortalContent';
import {connect} from 'react-redux';
import {unsetClient} from '../Client/actions';
import {getPublicContacts,addContactToFriendList} from './actions';
  class Portal extends Component {
    constructor(props) {
        super(props);
        }
    render() {
        console.log('----inside render----userId--'+this.props.userId);
        let {unsetClient,getPublicContacts,addContactToFriendList,userId}=this.props;
        return (
            <div>
            <TopHeader unsetClient={unsetClient} userId={userId}/>
            <PortalContent getPublicContacts={getPublicContacts} publicContacts={this.props.publicContacts} 
            userId={userId} addContactToFriendList={addContactToFriendList}/>
            </div>
        )
    }
}
let mapStateToProps=(state)=>{
    return {
        publicContacts:state.portal.publicContacts,
        userId:state.portal.userId
    }
}
let mapDispathToProps=(dispatch)=>{
    return{
        unsetClient:()=>{
            dispatch(unsetClient())
        },
        getPublicContacts:(userId)=>{
            dispatch(getPublicContacts(userId))
        },
        addContactToFriendList:(userId,friendId)=>{
            dispatch(addContactToFriendList(userId,friendId))
        }
    }
}
Portal=connect(mapStateToProps,mapDispathToProps)(Portal);
export default Portal;