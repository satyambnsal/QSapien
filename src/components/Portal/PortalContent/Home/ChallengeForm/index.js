import React, { Component } from 'react';
import { Form, Input, Row, Col, Button,InputNumber,Select} from 'antd';
const FormItem = Form.Item;
const Option=Select.Option;
class ChallengeForm extends Component {

    handleSubmit = (e) => {
        e.preventDefault();
this.props.form.validateFields((err,values)=>{
    if(!err){
        console.log('form values::',values);
    }
})
    }
    render() {
        const {publicContacts}=this.props;
        console.log('public contacts::'+JSON.stringify(publicContacts));
        const {getFieldDecorator}=this.props.form;
        return (
            <div className='challenge-form'>
            <Form onSubmit={this.handleSubmit}>
                <FormItem label="Opponent name">
                {
                    getFieldDecorator('opponentName',{
                        rules:[{
                            required:true,
                            message:'Please select opponent'
                        }]
                    })(<Select>
                        {
                            publicContacts.map((publicContact,index)=>(<Option key={index} value={publicContact._id}>
                                {publicContact.name}
                                </Option>))
                        }
                        </Select>)
                }
                    
                </FormItem>
                <FormItem label='Question'>
                {
                    getFieldDecorator('question',{
                        rules:[{
                            required:true,
                            message:'question is required'
                        }]
                    })(<Input type='textbox' />)
                }
                </FormItem>
                <Row type='flex' justify='space-between'>
                    <Col span={5}>
                        <FormItem label="A">
                        {
                            getFieldDecorator('choiceA',{
                                rules:[{
                                    required:true,
                                    message:'you need to provide choices'
                                }]
                            })(<Input />)
                        }</FormItem>
                    </Col>
                    <Col span={5}>
                        <FormItem label="B">{
                            getFieldDecorator('choiceB',{
                                rules:[{
                                    required:true,
                                    message:'you need to provide choices'
                                }]
                            })(<Input />)
                        }</FormItem>
                    </Col>
                    <Col span={5}>
                        <FormItem label="C">{
                            getFieldDecorator('choiceC',{
                                rules:[{
                                    required:true,
                                    message:'you need to provide choices'
                                }]
                            })(<Input />)
                        }</FormItem>
                    </Col>
                    <Col span={5}>
                        <FormItem label="D">{
                            getFieldDecorator('choiceD',{
                                rules:[{
                                    required:true,
                                    message:'you need to provide choices'
                                }]
                            })(<Input />)
                        }</FormItem>
                    </Col>
                </Row>
                <FormItem label='Answer'>
                    <Input />
                </FormItem>
                <FormItem label='Credit points'>
                    <InputNumber min={1} max={5} defaultValue={3}/>
                </FormItem>
                <FormItem label='Hint(optional)'>
                    <Input />
                </FormItem>
                <FormItem label='Reference Links(if any)'>
                    <Input />
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
const WrappedChallengeForm=Form.create()(ChallengeForm);
export default WrappedChallengeForm;