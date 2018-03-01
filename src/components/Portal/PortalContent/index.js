import React, { Component } from 'react';

export default class PortalContent extends Component {
    constructor(props) {
        super(props);
        this.state = { activeTab: 'public' };
        this.handlePublicContacts = this.handlePublicContacts.bind(this);
        this.addContactToFriendList = this.addContactToFriendList.bind(this);
        this.handleFriendList = this.handleFriendList.bind(this);
    }

    handlePublicContacts = (e, userId) => {
        e.preventDefault();
        this.props.getPublicContacts(userId);
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
    render() {
        let { publicContacts, userId, friendList } = this.props;
        return (
            <div className="portalContent">
                <div className="portal-sub-content">

                </div>
                <div className="contacts-panel">
                    <h3 className="text-center">Contacts panel</h3>
                    <div className="tabs">
                        <a href="" className="tab" onClick={(e) => this.handleFriendList(e, userId)}>Friends</a>
                        <a href="" className="tab" onClick={(e) => this.handlePublicContacts(e, userId)}>Public</a>
                    </div>
                    {(this.state.activeTab == 'public') && (<ul>
                        {
                            publicContacts.map((publicContact, index) => (
                                <li key={index}>{publicContact.name}<a href="" onClick={(e) => this.addContactToFriendList(e, userId, publicContact._id)}> +</a></li>
                            ))
                        }
                    </ul>
                    )}
                    {
                        (this.state.activeTab == 'friend') && (
                            <ul>
                                {
                                    friendList.map((friend, index) => (
                                        <li key={index}>{friend.name}</li>
                                    ))
                                }
                            </ul>
                        )
                    }
                </div>
            </div>
        )
    }
};