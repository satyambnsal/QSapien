import React, { Component } from 'react';
import { post } from 'axios';
import { Form, Icon, Input, Button, Row, Col, message } from 'antd';

const FormItem = Form.Item;
const FILE_UPLOAD_URL = `${process.env.REACT_APP_API_URL}/user/fileupload`;
const PROFILE_FALLBACK_URL = `${process.env.REACT_APP_API_URL}/profileImages/default_profile.jpg`


class AccountSettings extends Component {
    state = {
        file: '',
        imagePreviewUrl: this.props.user.profile_image_url || PROFILE_FALLBACK_URL,
        profileLoaded: false
    }

    componentDidUpdate() {
        if (this.props.user.profile_image_url && !this.state.profileLoaded) {
            this.setState({ imagePreviewUrl: this.props.user.profile_image_url, profileLoaded: true });
        }
    }
    handleProfileSubmit = (e) => {
        e.preventDefault()
        this.fileUpload(this.state.file);
    }

    onChange = (e) => {
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = () => {
            this.setState({
                file: file,
                imagePreviewUrl: reader.result
            });
        }
        reader.readAsDataURL(file)
    }
    fileUpload = (file) => {
        const isJPG = file.type === 'image/jpeg';
        if (isJPG && this.props.user.userId) {
            let newName = `${this.props.user.userId}.jpg`;
            console.log('file::', file);
            let formData = new FormData();
            formData.append('file', file, newName);
            formData.append('userId', this.props.user.userId);
            post(FILE_UPLOAD_URL, formData).then(response => {
                message.success('profile image updated successfully');
            }).catch(error => {
                message.error('failed to update profile image');
            })
        }
        else {
            message.error('error occurd while updating profile image.please contact administrator');
        }
    }

    render() {
        const { imagePreviewUrl } = this.state;
        let imagePreview = null;
        if (imagePreviewUrl) {
            imagePreview = (<img alt='Profile' src={imagePreviewUrl} className='profile-update' />)
        }
        return (
            <div className="accountSetting">
                <Row>
                    <Col span={8}>
                        {imagePreview}
                    </Col>
                    <Col span={16}>
                        <form onSubmit={this.handleProfileSubmit}>

                            <Input type='file' name={this.props.user.userId} onChange={this.onChange} name='Change Profile' required />
                            <Button htmlType='submit'>Save</Button>
                        </form></Col>
                </Row>

                <Form onSubmit={this.handleSubmit} style={{ marginTop: '20px' }}>
                    <Row type='flex' justify='space-between'>
                        <Col span={10}>
                            <FormItem label="First Name">
                                <Input />
                            </FormItem>
                        </Col>
                        <Col span={10}>
                            <FormItem label="Last Name">
                                <Input />
                            </FormItem>
                        </Col>
                    </Row>
                    <FormItem label='Username'>
                    <Input />
                    </FormItem>
                    <FormItem label="Location">
                        <Input />
                    </FormItem>
                    <FormItem label="Bio">
                        <Input.TextArea rows={3} />
                    </FormItem>
                    <Button htmlType='submit'>Save</Button>
                </Form>
            </div>
        )
    }
}

AccountSettings = Form.create()(AccountSettings);
export default AccountSettings;