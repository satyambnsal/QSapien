import React, { Component } from 'react';

export default class PortalContent extends Component {
    constructor(props) {
        super(props);
        this.state = { contacts: [] };
        this.handlePublicContacts = this.handlePublicContacts.bind(this);
        this.addContactToFriendList = this.addContactToFriendList.bind(this);
    }
    handlePublicContacts = (e, userId) => {
        e.preventDefault();
        console.log('----------inside handle public contacts-------');
        this.props.getPublicContacts(userId);
        this.setState({
            contacts: this.props.publicContacts
        })
        console.log('----------contact----states----' + JSON.stringify(this.state.contacts));
    }
    addContactToFriendList(e, userId, friendId) {
        e.preventDefault();
        this.props.addContactToFriendList(userId,friendId);
    }
    render() {
        let { publicContacts, userId } = this.props;
        return (
            <div className="portalContent">
                <div className="portal-sub-content">

                </div>
                <div className="contacts-panel">
                    <h3 className="text-center">Contacts panel</h3>
                    <div className="tabs">
                        <a href="" className="tab">Friends</a>
                        <a href="" className="tab" onClick={(e) => this.handlePublicContacts(e, userId)}>Public</a>
                    </div>

                    <ul>
                        {
                            publicContacts.map((publicContact, index) => (
                                <li key={index}>{publicContact.name}<a href="" onClick={(e) =>this.addContactToFriendList(e, userId, publicContact._id)}> +</a></li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        )
    }
};