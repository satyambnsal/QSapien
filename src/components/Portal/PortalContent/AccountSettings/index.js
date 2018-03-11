import React, { Component } from 'react';
import { Form, Icon, Input, Button, Checkbox, Row, Col, Avatar, Upload,message} from 'antd';
const FormItem = Form.Item;

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

function beforeUpload(file) {
    const isJPG = file.type === 'image/jpeg';
    if (!isJPG) {
        message.error('You can only upload JPG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJPG && isLt2M;
}
export default class AccountSettings extends Component {
    handleSubmit = (e) => {

    }
    render() {
        return (
            <div className="accountSetting">
                <Form onSubmit={this.handleSubmit}>
                    <Row>
                        <Col span={4}>
                            <Avatar src="http://localhost:3001/files/satyam_bansal.jpg" size="large" className="profile-image" />
                        </Col>
                        <Col span={10}><Upload><Button><Icon type="upload" />Upload new picture</Button></Upload></Col>
                        <Col span={6}><Button>Delete</Button></Col>
                    </Row>
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