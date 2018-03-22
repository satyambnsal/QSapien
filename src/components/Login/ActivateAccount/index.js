import React, { Component } from 'react';
import { Alert, Input, Button, Row, Col, Form, message,Spin} from 'antd';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import { resendActivationMail } from '../actions';
const FormItem = Form.Item;
class ActivateAccount extends Component {

    handlSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.resendActivationMail(values);
            }
            else {
                message.error('Error occured.contact administrator');
            }
        })
    }
    handleMessage=()=>{
    if(this.props.resendActivationMailResponse.message){
        message.info(this.props.resendActivationMailResponse.message);        
    }
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const {resendActivationMailRequesting,resendActivationMailResponse}=this.props;
        const info=(msg)=>{
            message.info(msg);
        }
        return (
            <div className='activate-account'>
                <Alert message='Your Account is not verified yet.please verify your account to use QSapien services' type='error' />
                <Alert message='please enter your email and submit to resend verification email' type='info' />

                <Form onSubmit={this.handlSubmit}>
                    <Row type='flex' justify='center' style={{ marginTop: '30px' }}>
                        <Col span={12}>
                            {
                                getFieldDecorator('email_id', {
                                    rules: [
                                        {
                                            required: 'true', message: 'Email id is required to resend activation mail'
                                        }
                                    ]
                                })(<Input type='email' placeholder='Enter your email' />)
                            }
                        </Col>
                        <Col span={6}>
                            <Button htmlType='submit' onClick={this.handleMessage}>SUBMIT</Button>
                        </Col>
                    </Row>
                </Form>
                <div className='nav-links'>
                <Link to='/login'>Login</Link>
                <Link to='/signup'>Signup</Link>
                </div>
                <div className="messages">
                {
                    resendActivationMailRequesting&&<Spin />
                }
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    resendActivationMailRequesting: state.login.resendActivationMailRequesting,
    resendActivationMailResponse: state.login.resendActivationMailResponse
});
ActivateAccount = Form.create()(ActivateAccount);
export default connect(mapStateToProps, { resendActivationMail })(ActivateAccount)