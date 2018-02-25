import React,{Component} from 'react';
import '../stylesheets/style.css';
import Portal from './Portal';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
export default class Login extends Component{
    constructor(props){
        super(props);
        this.state={
            username:'',
            password:'',
            isAuthenticated:false
        };
        this.handleSubmit=this.handleSubmit.bind(this);
        this.usernameChange=this.usernameChange.bind(this);
        this.passwordChange=this.passwordChange.bind(this);
    }
    handleSubmit(event){
        event.preventDefault();
        console.log("inside handle event");
        var apiBaseURl="http://localhost:3001/api/";
        var self=this; 
        var payload={
            "username":this.state.username,
            "password":this.state.password
        };
        console.log("======payload===");
        console.log(payload);
        axios.post(apiBaseURl+'login',payload).then(function(response){
            console.log("inside response");
            console.log(response);
          //  this.props.history.push('/portal');
          self.setState({isAuthenticated:true});
          console.log(this.state);
        }).catch(function(error){
        })
    }
    usernameChange(e){
        this.setState({username:e.target.value});
    }
    passwordChange(e){
        this.setState({password:e.target.value});
    }
    render(){
        const {from}=this.props.location.state||'/';
        const {isAuthenticated}=this.state;
        console.log("==============");
        console.log(isAuthenticated);
        if(this.state.isAuthenticated){
            return(
                <Redirect to={'/portal'} />
            )
        }        
        return(
            <div className="container-fluid login-body">
            <div className="row">
                <div className="col-md-4 col-md-offset-4">
                    <div className="login-panel panel panel-default">
                        <div className="panel-heading">
                            <h3 className="panel-title">Please Sign In</h3>
                        </div>
                        <div className="panel-body">
                            <form onSubmit={this.handleSubmit}>
                                <fieldset>
                                    <div className="form-group">
                                        <input className="form-control" placeholder="USER NAME" type="email" required autoFocus 
                                        value={this.state.username} onChange={this.usernameChange}/>
                                    </div>
                                    <div className="form-group">
                                    <input className="form-control" placeholder="Password"  type="password" required
                                    value={this.state.password} onChange={this.passwordChange} />
                                    </div>
                                    <div className="checkbox">
                                        <label>
                                            <input name="remember" type="checkbox" />Remember Me
                                        </label>
                                    </div>
                                    <div>
                                    <a href="register.html">Don't have an account.Register Here</a>
                                    
                                    </div>
                                    
                                    <button type="submit" className="btn btn-block btn-success">Login</button>
                                </fieldset>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        )
    }
}