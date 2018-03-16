import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card,Select,Button,message,Row,Col,Modal} from 'antd';
import {solveChallenge,resetSolveChallenge} from '../actions';
import {Link} from 'react-router-dom';
const Option=Select.Option;


class SolveChallenge extends Component {
    state = { currentChallenge: null,selectedChoice:null,attemptDone:false};
    componentDidMount(){
        if (this.props.challenges.length !== 0) {
            this.currentChallenge = this.props.challenges.find(challenge => (
                challenge.challengeId === this.props.match.params.challengeId
            ));
            this.setState({ currentChallenge: this.currentChallenge ,selectedChoice:this.currentChallenge.choiceA});
        }
    }
    componentDidUpdate(){
if(this.props.solveChallengeSuccess){
    this.success(this.props.solveChallengeResult.message);
    this.props.resetSolveChallenge();
}
    }
    handleChange=(selectedChoice)=>{
    this.setState({selectedChoice});
    }

    submitChallenge=()=>{
    if(!this.state.attemptDone){
        this.props.solveChallenge(this.state.currentChallenge.challengeId,this.state.selectedChoice);
        this.setState({attemptDone:true});
    }
    else{
        message.error('you had already made your choice.you can not make more than one attempt');
    }
    }
    success=(message)=> {
        const modal = Modal.info({
          title: 'Result',
          content:message,
        });
        setTimeout(() => modal.destroy(),3000);
      }
    render() {
        console.log('solve challenge requesting::',this.props.solveChallengeRequesting);
        return this.state.currentChallenge?(
            <div>
            <Row type='flex' justify='center' style={{marginTop:'50px'}}>
                <Col span={16}>
                <Card style={{minHeight:'400px'}} className='solve-challenge-card'>
            <h3>
            {this.state.currentChallenge.question}
            </h3>
            <hr />
            <div style={{marginTop:'20px'}}>
            <Select defaultValue={this.state.currentChallenge.choiceA} style={{width:'100%'}} onChange={this.handleChange}>
                <Option value={this.state.currentChallenge.choiceA}>{this.state.currentChallenge.choiceA}</Option>
                <Option value={this.state.currentChallenge.choiceB}>{this.state.currentChallenge.choiceB}</Option>
                <Option value={this.state.currentChallenge.choiceC}>{this.state.currentChallenge.choiceC}</Option>
                <Option value={this.state.currentChallenge.choiceD}>{this.state.currentChallenge.choiceD}</Option>
            </Select>
            </div>

            <Button onClick={this.submitChallenge} disabled={this.state.attemptDone} loading={this.props.solveChallengeRequesting}>Submit My Choice</Button>
        </Card>                
                </Col>
            </Row>
            <Row type='flex' justify='space-between'>
                <Col span={8}>
                <Button style={{width:'120px',marginTop:'40px'}} ><a href='/portal'>Go Back</a></Button>
                </Col>
            </Row>
            </div>
):(<h4>Error occured while loading challenge.contact administrator.</h4>)
    }
}

const mapStateToProps = (state) => ({
     challenges: state.portal.challengeState.challenges,
     solveChallengeRequesting: state.portal.challengeState.solveChallengeRequesting,
     solveChallengeSuccess:state.portal.challengeState.solveChallengeSuccess,
     solveChallengeResult:state.portal.challengeState.solveChallengeResult
    })

export default connect(mapStateToProps,{solveChallenge,resetSolveChallenge})(SolveChallenge);