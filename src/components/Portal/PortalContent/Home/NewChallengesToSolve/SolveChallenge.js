import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card,Select,Button} from 'antd';
import {solveChallenge} from '../actions';

const Option=Select.Option;


class SolveChallenge extends Component {
    state = { currentChallenge: null,selectedChoice:null};
    componentDidMount(){
        if (this.props.challenges.length !== 0) {
            this.currentChallenge = this.props.challenges.find(challenge => (
                challenge.challengeId === this.props.match.params.challengeId
            ));
            this.setState({ currentChallenge: this.currentChallenge ,selectedChoice:this.currentChallenge.choiceA});
        }
    }

    handleChange=(selectedChoice)=>{
    this.setState({selectedChoice});    
    }

    submitChallenge=()=>{
    this.props.solveChallenge(this.state.currentChallenge.challengeId,this.state.selectedChoice);
    }

    render() {
        return this.state.currentChallenge?(
        <Card>
            <h3>
            {this.state.currentChallenge.question}
            </h3>
            <Select defaultValue={this.state.currentChallenge.choiceA} style={{width:'200px'}} onChange={this.handleChange}>
                <Option value={this.state.currentChallenge.choiceA}>{this.state.currentChallenge.choiceA}</Option>
                <Option value={this.state.currentChallenge.choiceB}>{this.state.currentChallenge.choiceB}</Option>
                <Option value={this.state.currentChallenge.choiceC}>{this.state.currentChallenge.choiceC}</Option>
                <Option value={this.state.currentChallenge.choiceD}>{this.state.currentChallenge.choiceD}</Option>
            </Select>
            <Button onClick={this.submitChallenge}>Submit My Choice</Button>
        </Card>):(<h4>Error occured while loading challenge.contact administrator.</h4>)
    }
}

const mapStateToProps = (state) => ({ challenges: state.portal.challengeState.challenges })

export default connect(mapStateToProps,{solveChallenge})(SolveChallenge);