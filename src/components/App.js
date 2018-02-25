import React,{Component} from 'react';
import {Switch,Route,Redirect} from 'react-router-dom';
import Login from './Login/index.js';
import {connect} from 'react-redux';
import Register from './Register/index.js';
import Home from './Home';
import Portal from './Portal/index.js';
import {checkPortalAuthorization} from '../lib/check-auth';
 class App extends Component{
    render(){
        const store=this.props.store;
        console.log("===========store==========");
        console.log(this.props.store);
        return(
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route exact path="/portal" 
                render={()=>(checkPortalAuthorization(store)?(<Portal />):(<Redirect to='/login' />))}/>
                <Route exact path="/login"  
                render={()=>(checkPortalAuthorization(store)?(<Redirect to='/portal' />):(<Login />))}/>
                <Route exact path="/register" component={Register} />
            </Switch>
        )
    }
}
const mapStateToProps=(state)=>(
    {
        state:state
    })
export default connect(mapStateToProps,null,null,{pure:false})(App);