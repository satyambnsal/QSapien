import React, { Component } from 'react';
import { Form, Input, Row, Col, Button, InputNumber, Select, Tooltip, Icon, message,Avatar} from 'antd';
import { connect } from 'react-redux';
import { sendChallenge } from '../../../actions';
const FormItem = Form.Item;
const Option = Select.Option;
const TextArea = Input.TextArea;
class ChallengeForm extends Component {
    state = {
        choiceA: '',
        choiceB: '',
        choiceC: '',
        ChoiceD: ''
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                values = { ...values, senderId: this.props.user.userId };
                this.props.sendChallenge(values);
                message.success('your challenge had sent successfully');
              
            }
        })
    }
    render() {
        const { publicContacts } = this.props;
        const { getFieldDecorator } = this.props.form;
        return (
            <div className='challenge-form'>
                <Form onSubmit={this.handleSubmit}>
                    <FormItem label="Opponent name">
                        {
                            getFieldDecorator('opponentId', {
                                rules: [{
                                    required: true,
                                    message: 'Please select opponent'
                                }]
                            })(<Select>
                                {
                                    publicContacts.map((publicContact, index) => (<Option key={index} value={publicContact._id}>
                                        <Avatar src={publicContact.profile_image_url}/>&nbsp;&nbsp;&nbsp;{publicContact.name}
                                    </Option>))
                                }
                            </Select>)
                        }

                    </FormItem>
                    <FormItem label='Question'>
                        {
                            getFieldDecorator('question', {
                                rules: [{
                                    required: true,
                                    message: 'question is required'
                                }]
                            })(<TextArea rows={3} />)
                        }
                    </FormItem>
                    <Row type='flex' justify='space-between'>
                        <Col span={5}>
                            <FormItem label="Choice A">
                                {
                                    getFieldDecorator('choiceA', {
                                        rules: [{
                                            required: true,
                                            message: 'you need to provide choices'
                                        }]
                                    })(<Input onChange={(e) => { this.setState({ choiceA: e.target.value }) }} />)
                                }</FormItem>
                        </Col>
                        <Col span={5}>
                            <FormItem label="Choice B">{
                                getFieldDecorator('choiceB', {
                                    rules: [{
                                        required: true,
                                        message: 'you need to provide choices'
                                    }]
                                })(<Input onChange={(e) => { this.setState({ choiceB: e.target.value }) }} />)
                            }</FormItem>
                        </Col>
                        <Col span={5}>
                            <FormItem label="Choice C">{
                                getFieldDecorator('choiceC', {
                                    rules: [{
                                        required: true,
                                        message: 'you need to provide choices'
                                    }]
                                })(<Input onChange={(e) => { this.setState({ choiceC: e.target.value }) }} />)
                            }</FormItem>
                        </Col>
                        <Col span={5}>
                            <FormItem label="Choice D">{
                                getFieldDecorator('choiceD', {
                                    rules: [{
                                        required: true,
                                        message: 'you need to provide choices'
                                    }]
                                })(<Input onChange={(e) => { this.setState({ choiceD: e.target.value }) }} />)
                            }</FormItem>
                        </Col>
                    </Row>
                    <FormItem label={<span>Answer &nbsp;<Tooltip title='this will not be shown to user'><Icon type='question-circle-o' /></Tooltip></span>}>
                        {
                            getFieldDecorator('answer', {
                                rules: [{
                                    required: true,
                                    message: 'you need to provide valid nswer '
                                }]
                            })(<Select >
                                {(this.state.choiceA !=='') && (<Option key="choiceA" value={this.state.choiceA}>{this.state.choiceA}</Option>)}
                                {(this.state.choiceB !=='') && (<Option key="choiceB" value={this.state.choiceB}>{this.state.choiceB}</Option>)}
                                {(this.state.choiceC !=='') && (<Option key="choiceC" value={this.state.choiceC}>{this.state.choiceC}</Option>)}
                                {(this.state.choiceD !=='') && (<Option key="choiceD" value={this.state.choiceD}>{this.state.choiceD}</Option>)}
                            </Select>)
                        }
                    </FormItem>
                    <FormItem label='Credit points'>
                        {
                            getFieldDecorator('creditPoints', {
                                initialValue: 3
                            })(<InputNumber min={1} max={5} />)
                        }
                    </FormItem>
                    <FormItem label='Hint(optional)'>
                        <Input />
                    </FormItem>
                    <FormItem label='Reference Links(if any)'>
                        <TextArea rows={2} />
                    </FormItem>
                    <Row type='flex' justify='center'>
                        <Col span={4}><Button htmlType="submit">Send</Button></Col>
                        <Col span={4}><Button>Cancel</Button></Col>
                    </Row>
                </Form>
            </div>
        )
    }
}
let WrappedChallengeForm = Form.create()(ChallengeForm);
WrappedChallengeForm = connect(() => ({}), { sendChallenge })(WrappedChallengeForm);
export default WrappedChallengeForm;