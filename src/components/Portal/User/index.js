import React,{Component} from 'react';

class User extends Component{
    render(){
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
                    <a href="#">
                        <i className="fa fa-sign-out fa-fw">&nbsp;&nbsp;Logout</i>
                    </a>
                </li>
            </ul>
        </li>
        )
    }
}
export default User;