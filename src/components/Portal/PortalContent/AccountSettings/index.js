import React, { Component } from 'react';
import { post } from 'axios';
import { Form, Icon, Input, Button, Row, Col, message,Modal} from 'antd';
import {updateUserProfileApi} from '../../../../lib/utilities';
const FormItem = Form.Item;
const FILE_UPLOAD_URL = `${process.env.REACT_APP_API_URL}/user/fileupload`;
const PROFILE_FALLBACK_URL = `${process.env.REACT_APP_API_URL}/profileImages/default_profile.jpg`


class AccountSettings extends Component {
    state = {
        file: '',
        imagePreviewUrl: this.props.user.profile_image_url || PROFILE_FALLBACK_URL,
        profileLoaded: false,
        previewVisible:false
    }

    componentDidUpdate() {
        if (this.props.user.profile_image_url && !this.state.profileLoaded) {
            this.setState({ imagePreviewUrl: this.props.user.profile_image_url, profileLoaded: true });
        }
    }
    handleProfileImageSubmit = (e) => {
        e.preventDefault()
        this.fileUpload(this.state.file);
    }
    handleProfileSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err && this.props.user.userId) {

                values = { ...values, userId: this.props.user.userId };
                console.log('form values', values);
                updateUserProfileApi(values,(err,result)=>{
                if(!err){
                    message.success('profile updated successfully');
                    window.location.reload();
                }
                else{
                    message.error('profile failed to update.contact administrator');
                }
                })
            }
            else {
                message.error('profile failed to update.contact administrator');
            }
        })
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
                //                message.success('profile image updated successfully');
            }).catch(error => {
                message.error('failed to update profile image');
            })
        }
        else {
            message.error('error occurd while updating profile image.please contact administrator');
        }
    }
    handlePreview = () => { this.setState({ previewVisible: true }) }
    handleCancel = () => this.setState({ previewVisible: false })

    render() {
        const { user } = this.props;
        const { imagePreviewUrl } = this.state;
        let imagePreview = null;
        const { getFieldDecorator } = this.props.form;
        if (imagePreviewUrl) {
            imagePreview = (<img alt='Profile' src={imagePreviewUrl} className='profile-update' onClick={this.handlePreview}/>)
        }
        return (
            <div className="accountSetting">
                <Row>
                    <Col span={6}>
                        {imagePreview}
                    </Col>
                    <Col span={16} style={{marginTop:'21px'}}>
                        <form onSubmit={this.handleProfileImageSubmit}>

                            <label className="select-profile">Select Profile
                            <Input type='file' name={this.props.user.userId} onChange={this.onChange} required />
                            </label>
                            <Button htmlType='submit'>Save</Button>
                        </form>
                        </Col>
                </Row>
                <Modal visible={this.state.previewVisible} footer={null} onCancel={this.handleCancel} style={{maxWidth:'400px',maxHeight:'400px'}}>
                    <img alt="Profile Photo" style={{ width: '100%' }} src={imagePreviewUrl} />
                </Modal>
                <hr/>
                <Form onSubmit={this.handleProfileSubmit} style={{ marginTop: '20px' }}>
                    <Row type='flex' justify='space-between'>
                        <Col span={10}>
                            <FormItem label="First Name">
                                {
                                    getFieldDecorator('first_name', {
                                        initialValue: user.first_name
                                    })(<Input />)
                                }

                            </FormItem>
                        </Col>
                        <Col span={10}>
                            <FormItem label="Last Name">
                                {
                                    getFieldDecorator('last_name', {
                                        initialValue: user.last_name
                                    })(<Input />)
                                }
                            </FormItem>
                        </Col>
                    </Row>
                    <FormItem label="Location">
                        {
                            getFieldDecorator('location', {
                                initialValue: user.location
                            })(<Input />)
                        }

                    </FormItem>
                    <FormItem label="Bio">
                        {
                            getFieldDecorator('bio', {
                                initialValue: user.bio
                            })(<Input.TextArea rows={3} />)
                        }

                    </FormItem>
                    <Button htmlType='submit'>Save</Button>
                </Form>
            </div>
        )
    }
}

AccountSettings = Form.create()(AccountSettings);
export default AccountSettings;