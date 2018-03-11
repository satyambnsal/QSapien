import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import { sendChallenge } from '../actions';
class ChallengeForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            choiceA: "",
            choiceB: "",
            choiceC: "",
            choiceD: "",
        };
    }
    submit = (values) => {

        console.log('----------inside submit function-   28--------');
        console.log(JSON.stringify(values));
        values = { ...values, opponentName: this.props.opponentName, opponentId: this.props.opponentId, senderId: this.props.senderId }
        this.props.sendChallenge(values);
        this.props.hideChallenge();
    }
    render() {
        const { hideChallenge, opponentId, opponentName, handleSubmit } = this.props;
        return (
            <form className="challenge-form" onSubmit={handleSubmit(this.submit)}>
            <div className="form-group">
                <label>Opponent Name*</label>
                <Field type="text" name="opponentName" component="input" value={opponentId} placeholder={opponentName}
                    className="form-control" disabled />
            </div>
            <div className="form-group">
                <label>Question*</label>
                <Field type="text" name="question" component="textarea" className="form-control" required />
            </div>
            <label>Choices*</label>
            <div className="form-group row">
                <div className="col-sm-3"><label>A*</label>
                    <Field type="text" name="choiceA" component="input" required onChange={(e) => this.setState({ choiceA: e.target.value })} />
                </div>
                <div className="col-sm-3"><label>B*</label>
                    <Field type="text" name="choiceB" component="input" required onChange={(e) => this.setState({ choiceB: e.target.value })} />
                </div>
                <div className="col-sm-3"><label>C*</label>
                    <Field type="text" name="choiceC" component="input" required onChange={(e) => this.setState({ choiceC: e.target.value })} />
                </div>
                <div className="col-sm-3"><label>D*</label>
                    <Field type="text" name="choiceD" component="input" required onChange={(e) => this.setState({ choiceD: e.target.value })} />
                </div>
            </div>
            <div className="form-group">
                <label>Answer*</label>
                <Field name="answer" component="select" className="form-control" required>
                    {(this.state.choiceA != "") && (<option value={this.state.choiceA}>{this.state.choiceA}</option>)}
                    {(this.state.choiceB != "") && (<option value={this.state.choiceB}>{this.state.choiceB}</option>)}
                    {(this.state.choiceC != "") && (<option value={this.state.choiceC}>{this.state.choiceC}</option>)}
                    {(this.state.choiceD != "") && (<option value={this.state.choiceD}>{this.state.choiceD}</option>)}
                </Field>
            </div>
            <div className="form-group col-sm-6">
                <label>Credit Points*(not more than 5)</label>
                <Field name="questionCreditPoint" component="input" required type="number" className="form-control" min="1" max="5" />
            </div>
            <div className="form-group col-sm-6">
                <label>Hint(optional)</label>
                <Field name="hint" component="input" className="form-control" />
            </div>
            <div className="form-group">
                <label>Reference Link(optional)</label>
                <Field name="referenceLink" component="textarea" rows="2" className="form-control" /></div>
            <div className="col-sm-6">
                <button type="submit" action="submit" className="btn btn-default btn-block">SEND</button>
            </div>
            <div className="col-sm-6">
                <button type="submit" action="cancel" className="btn btn-default btn-block" onClick={() => hideChallenge()}>CANCEL</button>
            </div>
        </form>
        )

    }
}
ChallengeForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    sendChallenge: PropTypes.func.isRequired
}
const mapStateToProps = () => {
    return {}
}
let challengeForm = connect(mapStateToProps, { sendChallenge })(ChallengeForm);
challengeForm = reduxForm({
    form: 'challengeForm'
})(challengeForm);
export default challengeForm;