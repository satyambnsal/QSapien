import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import UserProfile from './UserProfile';
import AccountSettings from './AccountSettings';
import ChallengeForm from './Home/ChallengeForm';
import Home from './Home';
export default class PortalContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: 'public',
            opponentName: '',
            showChallenge: false,
            opponentId: ''
        };
        this.handlePublicContacts = this.handlePublicContacts.bind(this);
        this.addContactToFriendList = this.addContactToFriendList.bind(this);
        this.handleFriendList = this.handleFriendList.bind(this);
        this.openChallenge = this.openChallenge.bind(this);
        this.hideChallenge = this.hideChallenge.bind(this);
    }
// componentDidUpdate(){
//     if(this.props.user.userId&&this.props.publicContacts.length==0){
//         console.log('---------inside if condition 18 portal content::');
//         console.log('user object::',this.props.user);
//         this.props.getPublicContacts(this.props.user.userId);
//         console.log('public contacts:: portal content::'+JSON.stringify(this.props.publicContacts));
//     }

// }
    handlePublicContacts = (e, userId) => {
        e.preventDefault();
        this.setState({
            activeTab: 'public'
        })
    }
    handleFriendList = (e, userId) => {
        e.preventDefault();
        console.log('--------get friend list action--------');
        console.log(this.props.getFriendList);
        this.props.getFriendList(userId);
        this.setState({
            activeTab: 'friend'
        })

        console.log('---------friend list-----' + JSON.stringify(this.props.friendList));
    }
    addContactToFriendList(e, userId, friendId) {
        e.preventDefault();
        this.props.addContactToFriendList(userId, friendId);
    }
    openChallenge(e, opponentId, opponentName) {
        e.preventDefault();
        console.log('-------------inside openchllenge method');
        this.setState({
            opponentId,
            opponentName,
            showChallenge: true
        });
    }
    hideChallenge(e) {
        this.setState({ showChallenge: false })
    }
    render() {
        let { publicContacts,friendList,user} = this.props;
        console.log('user object::67',user);
        console.log('------------show challenge---------' + this.state.showChallenge);

        return (
            <Switch>
                <Route exact path='/portal' render={()=>(<Home user={this.props.user}/>)} />
                <Route  exact path='/portal/userprofile' render={()=>(<UserProfile user={this.props.user}/>)} />
                <Route  exact path='/portal/accountsettings' render={()=>(<AccountSettings user={this.props.user}/>)} />
                <Route exact path='/portal/challengeform' render={()=>(<ChallengeForm {...this.props}/>)} />
            </Switch>
            // <div className="portalContent">
            //     <div className="portal-sub-content">
            //         {(this.state.showChallenge)&&
            //             (<ChallengeForm showChallenge={this.state.showChallenge} hideChallenge={this.hideChallenge} 
            //             opponentId={this.state.opponentId} opponentName={this.state.opponentName} senderId={userId}/>)}
            //     </div>
            //     <div className="contacts-panel">
            //         <h3 className="text-center">Contacts panel</h3>
            //         <div className="tabs">
            //             <a href="" className="tab" onClick={(e) => this.handleFriendList(e, userId)}>Friends</a>
            //             <a href="" className="tab" onClick={(e) => this.handlePublicContacts(e, userId)}>Public</a>
            //         </div>
            //         {(this.state.activeTab === 'public') && (<ul>
            //             {
            //                 publicContacts.map((publicContact, index) => (
            //                     <li key={index}><a href="" 
            //                     onClick={(e) => this.openChallenge(e, publicContact._id, publicContact.name)}
            //                     >{publicContact.name}</a><a href="" onClick={(e) => this.addContactToFriendList(e, userId, publicContact._id)}> +</a></li>
            //                 ))
            //             }
            //         </ul>
            //         )}
            //         {
            //             (this.state.activeTab === 'friend') && (
            //                 <ul>
            //                     {
            //                         friendList.map((friend, index) => (
            //                             <li key={index}>{friend.name}</li>
            //                         ))
            //                     }
            //                 </ul>
            //             )
            //         }
            //     </div>
            // </div>
        )
    }
};