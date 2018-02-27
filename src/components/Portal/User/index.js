import React,{Component} from 'react';
import {unsetClient} from '../../Client/actions';
import {connect} from 'react-redux';
class User extends Component{
    constructor(props){
        super(props);
        this.handleLogout=this.handleLogout.bind(this);
    }
    handleLogout(e){
        e.preventDefault();
        console.log('logout success');
        this.props.unsetClient();
    }
    render(){
   //     console.log(unsetClient);
        return(
            <li className="dropdown">
            <a className="dropdown-toggle" data-toggle="dropdown" href="#">
                <i className="fa fa-user fa-fw"></i>
                <i className="fa fa-caret-down"></i>
            </a>
            <ul className="dropdown-menu dropdown-user">
                <li>
                    <a href="#">
                        <i className="fa fa-user fa-fw">&nbsp;&nbsp;User Profile</i>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <i className="fa fa-gear fa-fw">&nbsp;&nbsp;Settings</i>
                    </a>
                </li>
                <li className="divider"></li>
                <li>
                <button type="button" onClick={(e)=>{this.handleLogout(e)}}>
                        <i className="fa fa-sign-out fa-fw">&nbsp;&nbsp;Logout</i>
                    </button>
                  </li>
            </ul>
        </li>
        )
    }
}
let mapStateToProps=(state)=>{
    return {}
}
// let mapDispathToProps=(dispatch)=>{
//     return{
//         unsetClient:()=>{
//             dispatch({
//                 type:'CLIENT_UNSET'
//             })
//         }
//     }
// }
User=connect(mapStateToProps,{unsetClient})(User);

export default User;