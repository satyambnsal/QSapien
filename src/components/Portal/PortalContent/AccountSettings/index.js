import React, { Component } from 'react';
import { Form, Icon, Input, Button,Row, Col, Avatar, Upload} from 'antd';
const FormItem = Form.Item;

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