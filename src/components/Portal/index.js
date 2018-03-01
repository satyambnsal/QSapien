import React, { Component } from 'react';
import '../../stylesheets/style.css'
import TopHeader from './TopHeader';
import PortalContent from './PortalContent';
import {connect} from 'react-redux';
import {unsetClient} from '../Client/actions';
import {setUser, getFriendList} from './actions';

import {getPublicContacts,addContactToFriendList} from './actions';
  class Portal extends Component {
    constructor(props) {
        super(props);
        if(this.props.token){
            console.log('----------constructor token------'+JSON.stringify(this.props.token));
            this.props.setUser(this.props.token.userId);
        }

        }
    render() {
        console.log('----inside render----userId--'+this.props.userId);
        let {unsetClient,getPublicContacts,addContactToFriendList,getFriendList,userId,friendList}=this.props;
        return (
            <div>
            <TopHeader unsetClient={unsetClient} userId={userId}/>
            <PortalContent getPublicContacts={getPublicContacts} publicContacts={this.props.publicContacts} 
            userId={userId} addContactToFriendList={addContactToFriendList} getFriendList={getFriendList} 
            friendList={friendList}/>
            </div>
        )
    }
}
let mapStateToProps=(state)=>{
    return {
        publicContacts:state.portal.publicContacts,
        userId:state.portal.userId,
        token:state.client.token,
        friendList:state.portal.friendList
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
        },
        setUser:(token)=>{
            dispatch(setUser(token))
        },
        getFriendList:(userId)=>{
            dispatch(getFriendList(userId))
        }
    }
}
Portal=connect(mapStateToProps,mapDispathToProps)(Portal);
export default Portal;