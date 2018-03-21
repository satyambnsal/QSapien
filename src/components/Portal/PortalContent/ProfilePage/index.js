import React, { Component } from 'react';
import { Card, Modal } from 'antd';
export default class UserProfile extends Component {
    state = {
        previewVisible: false
    }
    handlePreview = () => { this.setState({ previewVisible: true }) }
    handleCancel = () => this.setState({ previewVisible: false })
    render() {
        return (
            <div>
                <Card className='profile-card'>
                    <img src={this.props.user.profile_image_url} className='profile-update' alt='Profile' onClick={this.handlePreview}/>
                    <h3 style={{ marginTop: '10px' }}>{this.props.user.name}</h3>
                    <h5 style={{ color: '#666' }}>{this.props.user.location}</h5>
                    <p className='user-bio'>{this.props.user.bio}</p>
                    <hr />
                </Card>
                <Modal visible={this.state.previewVisible} footer={null} onCancel={this.handleCancel} style={{maxWidth:'400px',maxHeight:'400px'}}>
                    <img alt="Profile Photo" style={{ width: '100%' }} src={this.props.user.profile_image_url} />
                </Modal>
            </div>
        )
    }
}