import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Errors from '../Notifications/Errors';
import Messages from '../Notifications/Messages';

import { signupRequesting } from './actions';

class Signup extends Component {
    static propTypes = {
        handleSubmit: PropTypes.func,
        signupRequesting: PropTypes.func,
        login: PropTypes.shape({
            successful: PropTypes.bool,
            requesting: PropTypes.bool,
            errors: PropTypes.array,
            messages: PropTypes.array
        })
    };
    submit = (values) =>{
        return this.props.signupRequesting(values)
    }

    render() {
        const { handleSubmit,
            signup: {
                requesting,
                successful,
                errors,
                messages
}
} = this.props;
        return (
            <div className="signup container">
                <div className="signup-form">
                    <form onSubmit={handleSubmit(this.submit)}>
                        <div className="row">
                            <div className="col-sm-6 form-group">
                                <label>First Name</label>
                                <Field type="text" name="first_name" placeholder="first name" className="form-control" required component="input" />
                            </div>
                            <div className="col-sm-6 form-group">
                                <label>Last Name</label>
                                <Field type="text" name="last_name" placeholder="last name" className="form-control" component="input" />
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Contact No <span id="phonewarning" style={{ color: "red" }}></span></label>
                            <Field type="text" name="contact_no" id="contact_no" placeholder="contact number" className="form-control"
                                component="input" />
                        </div>
                        <div className="form-group">
                            <label>Email Address <span id="emailwarning" style={{ color: "red" }}></span></label>
                            <Field type="email" name="email_id" id="email_id" placeholder="email address" className="form-control"
                                component="input" />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <Field type="text" name="password" placeholder="password" className="form-control" component="input" />
                        </div>
                        <div className="form-group">
                            <label>Confirm Password</label>
                            <Field type="text" name="confirm_password" placeholder="confirm password" className="form-control" component="input" />
                        </div>
                        <button type="submit" action="submit" className="btn btn-success btn-block">SignUp</button>
                    </form>
                </div>
                <div className="auth-messages">
                    {
                        !requesting && !!errors.length && (<Errors message="Failure to signup due to..." errors={errors} />)
                    }
                    {
                        !requesting && !!messages.length && (<Messages messages={messages} />)
                    }
                    {
                        requesting && <div>Signup in progress ...</div>
                    }
                    {
                        !requesting && !successful && (<Link to="/login">Already SignUp? click here to login >></Link>)
                    }
                </div></div>
        )
    }
}
const mapStateToProps = (state) => ({
    signup: state.signup
});
const connected = connect(mapStateToProps, { signupRequesting })(Signup);
const signupForm = reduxForm({
    form: 'signup'
})(connected);


export default signupForm;