import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Input, Button, Icon, Card, Checkbox, message, Spin, notification, Affix, Alert } from 'antd';
import loginRequest from './actions';
import Messages from '../Notifications/Messages';
import { Redirect } from 'react-router-dom';

const FormItem = Form.Item;

class Login extends Component {
    submit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.loginRequest(values);
            }
            else {
                message.error('Error occured.contact administrator');
            }
        })
    }
    handleErrorMessage = () => {
        if (this.props.login.errors && this.props.login.errors.length) {
            notification['error']({
                message: 'Error',
                description: this.props.login.errors[0].message
            });
        }
    }
    render() {
        const {
            login: {
            successful,
            requesting,
            errors,
            messages
            }
        } = this.props;
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                 <Affix>
                    <Alert message='Experimental Account 1:  username: test, password:test123' type='info' />
                </Affix> 
                <Affix>
                    <Alert message='Experimental Account 2:  username: sapien, password:sapien123' type='info' />
                </Affix>

            <Card title='QSapien Login' className='login-card'>
                <Form onSubmit={this.submit} className="login-form">
                    <FormItem>
                        {getFieldDecorator('email_id', {
                            rules: [{ required: true, message: 'Username or email address is required for login' }],
                        })(
                            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username or Email" />
                            )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: 'Please input your Password!' }],
                        })(
                            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                            )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('remember', {
                            valuePropName: 'checked',
                            initialValue: true,
                        })(
                            <Checkbox>Remember me</Checkbox>
                            )}
                        <a className="login-card-forgot" href="" disabled>Forgot password</a>
                        <Button type="primary" htmlType="submit" className="login-card-button" onClick={this.handleErrorMessage}>
                            Log in
                        </Button>
                    </FormItem>
                </Form>
                <div className="auth-messages">
                    {
                        (!requesting && errors.length && !!errors[0].isUserExist && !!errors[0].isPasswordMatch && !errors[0].isAccountVerified) ? (<Redirect to='/activateaccount' />) : ''
                    }
                    {
                        !!requesting && (<Spin />)
                    }
                    {
                        !requesting && !successful && (<a href="/signup">Need to Register? click here ></a>)
                    }
                    {
                        !!successful && (<Redirect to='/portal' />)
                    }
                </div>
            </Card>

            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    login: state.login
});

const WrappedLogin = Form.create()(Login)
export default connect(mapStateToProps, { loginRequest })(WrappedLogin);
