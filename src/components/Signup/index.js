import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Errors from '../Notifications/Errors';
import Messages from '../Notifications/Messages';
import { Redirect } from 'react-router-dom';
import { signupRequesting } from './actions';
import { checkUsernameExistApi } from '../../lib/utilities';
import { Form, Icon, Button, Input, Row, Col, Tooltip, Card, message, Spin,notification} from 'antd'
const FormItem = Form.Item;

class Signup extends Component {
    state = { confirmDirty: false };

    handleSubmit = (e, values) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('form values', values);
                this.props.signupRequesting(values)
            }
        })

    }
    handleErrorMessage=()=>{
        if(this.props.signup.errors&&this.props.signup.errors.length){
            notification['error']({
                message: 'Error',
                description:this.props.login.errors[0].message
            })
        }
    }
    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    }
    checkUsernameExist = (rule, value, callback) => {
        checkUsernameExistApi(value, (err, values) => {
            if (!err) {
                if (values.isExist)
                    callback('Username already exist');
                else
                    callback();
            }
            else {
                //          message.error('it looks like backend services are down.contact your administrator');
                callback('error occured while checking username validation');
            }
        })
    }
    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        }
        else {
            callback();
        }
    }
    validateToNextPassword = (rules, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        else {
            callback();
        }
    }
    render() {
        const { signup: {
            requesting,
            successful,
            errors,
            messages }
         } = this.props;
        const error = (msg) => {
            message.error(msg);
        }
        const { getFieldDecorator } = this.props.form;
        return (
            <Card title="QSapien Register" className="signup-card">
                <div className="signup-form">
                    <Form onSubmit={(e, values) => this.handleSubmit(e, values)}>
                        <Row type='flex' justify='space-between'>
                            <Col span={11}>
                                <FormItem label="First Name">
                                    {
                                        getFieldDecorator('first_name', {
                                            rules: [{
                                                required: true, message: 'First name is required'
                                            }]
                                        })(<Input />)
                                    }
                                </FormItem>
                            </Col>
                            <Col span={11}>
                                <FormItem label="Last Name">
                                    {
                                        getFieldDecorator('last_name')(<Input />)
                                    }
                                </FormItem>
                            </Col>
                        </Row>
                        <FormItem label="E-mail">
                            {
                                getFieldDecorator('email_id', {
                                    rules: [{
                                        type: 'email', message: 'The input is not valid E-mail'
                                    }, {
                                        required: true,
                                        message: 'Please input your E-mail'
                                    }]
                                })(<Input placeholder="email" />)
                            }</FormItem>
                        <FormItem label="Password">
                            {
                                getFieldDecorator('password', {
                                    rules: [{
                                        required: true, message: 'Please input your password!'
                                    }, {
                                        validator: this.validateToNextPassword
                                    }]
                                })(<Input type="password" />)
                            }</FormItem>
                        <FormItem label="Confirm Password">
                            {
                                getFieldDecorator('confirm_password', {
                                    rules: [
                                        {
                                            required: true, message: 'Please confirm your password!'
                                        }, {
                                            validator: this.compareToFirstPassword
                                        }
                                    ]
                                })(<Input type="password" onBlur={this.handleConfirmBlur} />)
                            }</FormItem>
                        <FormItem
                            label={(
                                <span>
                                    Username&nbsp;
                        <Tooltip title="What do you want others to call you?">
                                        <Icon type="question-circle-o" />
                                    </Tooltip>
                                </span>
                            )}>
                            {getFieldDecorator('username', {
                                rules: [{ required: true, message: 'Please input your username!' },
                                { validator: this.checkUsernameExist }]
                            })(<Input />)
                            }
                        </FormItem>
                        <Button type="primary" htmlType="submit" onClick={this.handleErrorMessage}>Register</Button>
                    </Form>
                </div>
                <div className="auth-messages">
                    {
                        (!requesting && !!messages.length) ? (<Messages messages={messages} />) : ''
                    }
                    {
                        !!requesting && <Spin />
                    }
                    {
                        !requesting && !successful && (<Link to="/login">Already SignUp? click here to login >></Link>)
                    }{
                        !!successful && (<Redirect to='/login' />)
                    }
                </div>
            </Card>

        )
    }
}
const mapStateToProps = (state) => ({
    signup: state.signup
});
Signup = Form.create()(Signup)
export default connect(mapStateToProps, { signupRequesting })(Signup);
