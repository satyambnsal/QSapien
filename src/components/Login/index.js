import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Input, Button, Icon, Card, Checkbox, message } from 'antd';
import loginRequest from './actions';
import Errors from '../Notifications/Errors';
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
                message.error('error occured.contact administrator');
            }
        })
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
                        <a className="login-card-forgot" href="">Forgot password</a>
                        <Button type="primary" htmlType="submit" className="login-card-button">
                            Log in
                        </Button>
                    </FormItem>
                </Form>
                <div className="auth-messages">
                    {
                        !requesting && !!errors.length && (<Errors message="Failure to login due to..." errors={errors} />)
                    }
                    {
                        !requesting && !!messages.length && (<Messages messages={messages} />)
                    }
                    {
                        requesting && <div>Logging in...</div>
                    }
                    {
                        !requesting && !successful && (<Link to="/signup">Need to Register? click here ></Link>)
                    }
                    {
                        !!successful && (<Redirect to='/portal' />)
                    }
                </div>
            </Card>
        )
    }
}

const mapStateToProps = (state) => ({
    login: state.login
});

const WrappedLogin = Form.create()(Login)
export default connect(mapStateToProps, { loginRequest })(WrappedLogin);
