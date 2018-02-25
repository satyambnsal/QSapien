import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import Errors from '../Notifications/Errors';
import Messages from '../Notifications/Messages';


import { registerRequesting } from './actions';
//import '../../stylesheets/register.css';


class Register extends Component {
    static propTypes = {
        handleSubmit: PropTypes.func,
        registerRequesting: PropTypes.func,
        login: PropTypes.shape({
            successful: PropTypes.bool,
            requesting: PropTypes.bool,
            errors: PropTypes.array,
            messages: PropTypes.array
        })
    };
    submit = (values) => (this.props.registerRequesting(values))

    render() {
        const { handleSubmit,
            register: {
    requesting,
                successful,
                errors,
                messages
}
} = this.props;
        return (
            <div className="register container">
                <div className="register-form">
                    <form onSubmit={handleSubmit(this.submit)}>
                        <div className="row">
                            <div className="col-sm-4 form-group">
                                <label>First Name</label>
                                <Field type="text" name="fname" placeholder="FIRST NAME" className="form-control" required component="input" />
                            </div>
                            <div className="col-sm-4 form-group">
                                <label>Middle Name</label>
                                <Field type="text" name="mname" placeholder="MIDDLE NAME" className="form-control" component="input" />
                            </div>
                            <div className="col-sm-4 form-group">
                                <label>Last Name</label>
                                <Field type="text" name="lname" placeholder="LAST NAME" className="form-control" component="input" />
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Father Name</label>
                            <Field type="text" name="fathername" placeholder="FATHER NAME" className="form-control" component="input" />
                        </div>
                        <div className="row">
                            <div className="col-sm-6 form-group">
                                <label>Date of Birth</label>
                                <Field type="date" name="dob" placeholder="dob" className="form-control" required component="input" />
                            </div>
                            <div className="col-sm-3 form-group">
                                <label>Age</label>
                                <Field type="number" name="age" placeholder="age" className="form-control" required component="input" />
                            </div>
                            <div className="col-sm-3 form-group">
                                <label >Gender</label>
                                <Field className="form-control" name="gender" component="select">
                                    <option>Male</option>
                                    <option>Female</option>
                                    <option>Transgender</option>
                                </Field>
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Address</label>
                            <Field name="address" rows="2" placeholder="ADDRESS" className="form-control" required component="input"></Field>
                        </div>
                        <div className="row">
                            <div className="col-sm-4 form-group">
                                <label>State/Province/Region</label>
                                <Field className="form-control" name="state" component="select">
                                    <option>Madhya Pradesh</option>
                                    <option>Maharastra</option>
                                    <option>Gujrat</option>
                                    <option>Punjab</option>
                                    <option>Rajhasthan</option>
                                    <option>Utter Pradesh</option>
                                    <option>Delhi</option>
                                </Field>
                            </div>
                            <div className="col-sm-4 form-group">
                                <label>City</label>
                                <Field className="form-control" name="city" component="select">
                                    <option>Nagpur</option>
                                    <option>Pune</option>
                                    <option>Nasik</option>
                                    <option>Mumbai</option>
                                </Field>
                            </div>
                            <div className="col-sm-4 form-group">
                                <label>Zip Code</label>
                                <Field type="number" name="zipcode" placeholder="ZIP CODE" className="form-control" required component="input" />
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Phone No <span id="phonewarning" style={{ color: "red" }}></span></label>
                            <Field type="text" name="phoneno" id="phoneno" placeholder="PHONE NO" className="form-control"
                                component="input" />

                        </div>
                        <div className="form-group">
                            <label>Email Address <span id="emailwarning" style={{ color: "red" }}></span></label>
                            <Field type="email" name="emailid" id="emailid" placeholder="EMAIL ADDRESS" className="form-control"
                                component="input" />

                        </div>
                        <button type="submit" action="submit" className="btn btn-success btn-block">Register</button>
                    </form>
                </div>
                <div className="auth-messages">
                {
                        !requesting && !!errors.length && (<Errors message="Failure to register due to..." errors={errors} />)
                    }
                    {
                        !requesting && !!messages.length && (<Messages messages={messages} />)
                    }
                    {
                        requesting && <div>Register in progress ...</div>
                    }
                    {
                        !requesting && !successful && (<Link to="/login">Already Register? click here to login >></Link>)
                    }
                </div></div>
        )
    }
}
const mapStateToProps = (state) => ({
    register: state.register
});
const connected = connect(mapStateToProps, { registerRequesting })(Register);
const registerForm = reduxForm({
    form: 'register'
})(connected);


export default registerForm;