import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Errors from '../Notifications/Errors';
import Messages from '../Notifications/Messages';
import loginRequest from './actions';

//import '../../stylesheets/style.css'
class Login extends Component {

    static propTypes = {
        handleSubmit: PropTypes.func,
        loginRequest: PropTypes.func,
        login: PropTypes.shape({
            successful: PropTypes.bool,
            requesting: PropTypes.bool,
            errors: PropTypes.array,
            messages: PropTypes.array
        })
    };


    submit = (values) => {
        this.props.loginRequest(values);
    }
    render() {
        const {
            handleSubmit,
            login: {
                successful,
                requesting,
                errors,
                messages,
            }
        } = this.props;
        return (
            <div className="container-fluid login-body">
                <div className="login row">
                <div class="col-md-4 col-md-offset-4">
                <div className="panel-heading">
                            <h3 className="panel-title">Please Sign In</h3>
                        </div>
                        <div className="panel-body">
                        <form className="login-form" onSubmit={handleSubmit(this.submit)}>
                        <div className="form-group">
                            <label htmlFor="username">User Name</label>
                            <Field name="username" type="text" id="username" component="input" className="form-control" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <Field type="text" name="password" id="password" component="input" className="form-control" />
                        </div>
                        <button action="submit" >Submit</button>
                    </form>     
                        </div>
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
                        !requesting && !successful && (<Link to="/register">Need to Register? click here >></Link>)
                    }
                </div>
                </div>
                
                </div>
                
            </div>

        )
    }
}
const mapStateToProps = (state) => ({
    login: state.login
});

const connected = connect(mapStateToProps, { loginRequest })(Login);

const formed = reduxForm({
    form: 'login'
})(connected);
export default formed;