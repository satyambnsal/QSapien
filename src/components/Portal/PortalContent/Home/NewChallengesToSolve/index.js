import React, { Component } from 'react';
import { List,Button,Table,Divider,Icon,Modal,Select,Row,Col} from 'antd';
import { fetchChallenges } from '../utils/challengeApi';

const Option=Select.Option;
export default class NewChallengesToSolve extends Component {
    state = { challenges: [],challengeToShow:{},visibleModal:false}
    componentWillReceiveProps() {
        if (this.props.user.userId&&this.state.challenges.length!==0) {
            fetchChallenges(this.props.user.userId, (challenges) => this.setState({ challenges }));
        }
    }
    handleSolve=(challenge)=>{
        console.log('inside handle solve');
        this.setState({challengeToShow:this.state.challenges[challenge.key]});
        this.setState({visibleModal:true});
    }
    handleDelete=(challenge)=>{
        console.log('inside handle delete');
        console.log(challenge);
    }
    handleCancel=()=>{
        this.setState({visibleModal:false});
        this.setState({challengeToShow:{}});
    }
    handleChoiceChange=(value)=>{
console.log('current choice::'+value);
    }
    render() {
        const columns=[
            {title:'Question',dataIndex:'question',key:'question'},
            {title:'Opponent Name',dataIndex:'senderName',key:'senderName'},
            {title:'Credit Points',dataIndex:'creditPoints',key:'creditPoints'},
            {title:'Actions',key:'actions',render:(text,record)=>(<span><Button onClick={()=>{this.handleSolve(record)}}>Solve</Button>
            <Divider type='vertical' />
            <Button onClick={()=>{this.handleDelete(record)}}>Delete</Button>
            </span>)}
        ];            
        let challenges = this.state.challenges;
        const data=challenges.map((challenge,index)=>{
        let {question,creditPoints,senderName}=challenge;
        let key=index;
        return {question,creditPoints,senderName,key};
        });
        console.log('----------12---current challenge----',this.state.challengeToShow);
        console.log('user id:: new challenges to solve' + this.props.user.userId);
        return (
            <div>
            <Table columns={columns} dataSource={data} />
            {/* <Modal visible={this.state.visibleModal} onCancel={this.handleCancel} okText='Submit Challenge' closable="false">
            <h4>Question: {this.state.challengeToShow.question}</h4>
            <Row type='flex' justify='center'>
                <Col span={20}>
                <Select  onChange={this.handleChoiceChange} style={{width:'100%'}}>
            <Option value={this.state.challengeToShow.choiceA}>{this.state.challengeToShow.choiceA}</Option>
            <Option value={this.state.challengeToShow.choiceB}>{this.state.challengeToShow.choiceB}</Option>
            <Option value={this.state.challengeToShow.choiceC}>{this.state.challengeToShow.choiceC}</Option>
            <Option value={this.state.challengeToShow.choiceD}>{this.state.challengeToShow.choiceD}</Option>
            </Select>        
                </Col>
            </Row>
            </Modal>   */}
            </div>
        )
    }
}