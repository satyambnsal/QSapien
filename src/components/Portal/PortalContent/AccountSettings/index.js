import React, { Component } from 'react';
import { post } from 'axios';
import { Form, Icon, Input, Button, Row, Col,message} from 'antd';

const FormItem = Form.Item;
const FILE_UPLOAD_URL = `${process.env.REACT_APP_API_URL}/user/fileupload`;
const PROFILE_BASE_URL=`${process.env.REACT_APP_API_URL}/files/`
export default class AccountSettings extends Component {
    state = {
        file: '',
        imagePreviewUrl: `${PROFILE_BASE_URL}default_profile.jpg`,
        profileLoaded:false
    }
    componentDidUpdate(){
        if(this.props.user.userId&&!this.state.profileLoaded){
            this.setState({imagePreviewUrl:`${PROFILE_BASE_URL}${this.props.user.userId}.jpg`,profileLoaded:true});
        }
    }
    onFormSubmit = (e) => {
        e.preventDefault()
        this.fileUpload(this.state.file);
    }
    onChange = (e) => {
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
        console.log('file::',file);
        
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
        if (!isJPG) {
          message.error('You can only upload JPG file!');
        }
        else{
          let newName=`${this.props.user.userId}.jpg`;
            console.log('file::',file);
            let formData = new FormData();
            formData.append('file', file,newName);
            post(FILE_UPLOAD_URL, formData).then(response => {
                console.log('response::' + response);
            }).catch(error => {
                console.log('error::' + error);
            })    
        }
    }

    render() {
        const { imagePreviewUrl } = this.state;
        let imagePreview = null;
        if (imagePreviewUrl) {
            imagePreview = (<img alt='Profile'src={imagePreviewUrl} className='profile-update'/>)
        }
        return (
            <div className="accountSetting">

                <Row>
                    <Col span={8}>
                        {imagePreview}
                    </Col>
                    <Col span={16}>
                        <form onSubmit={this.onFormSubmit}>
                        
                        <Input type='file' name={this.props.user.userId} onChange={this.onChange} name='Change Profile' required/>
                        <Button htmlType='submit'>Save</Button>
                        </form></Col>
                </Row>

                <Form onSubmit={this.handleSubmit}>
                    <FormItem label="Name">
                        <Input />
                    </FormItem>
                    <FormItem label="Username">
                        <Input />
                    </FormItem>
                    <FormItem label="Email">
                        <Input type="email" />
                    </FormItem>
                    <FormItem label="Location">
                        <Input />
                    </FormItem>
                    <FormItem label="Website">
                        <Input />
                    </FormItem>
                </Form>
            </div>
        )
    }
}