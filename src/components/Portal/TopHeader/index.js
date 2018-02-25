import React,{Component} from 'react';
import Messages from '../Messages';
import Tasks from '../Tasks';
import Alerts from '../Alerts';
import User from '../User';
import Radium from 'radium';
class TopHeader extends Component{
    render(){
        return(
            <nav className="navbar navbar-default navbar-static-top" role="navigation" style={{ marginBottom: 0 }}>
            <div className="navbar-header">
                <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                </button>
                <a className="navbar-brand" href="/">Student Portal</a>
            </div>
            <ul className="nav navbar-top-links navbar-right">
            <Messages />
            <Tasks />
            <Alerts />
            <User />
            </ul>
        </nav>
        )
    }
};


export default TopHeader;