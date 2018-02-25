import React,{Component} from 'react';
import Alert from './Alert';
class Alerts extends Component{
    render(){
        let alerts=[
            {
                alert_text:"new message",
                alert_time:new Date().getDay
            },
            {
                alert_text:"new message",
                alert_time:new Date().getDay
            }
        ]
        return(
            <li className="dropdown">
            <a className="dropdown-toggle" data-toggle="dropdown" href="#">
                <i className="fa fa-bell fa-fw"></i>
                <i className="fa fa-caret-down"></i>
            </a>
            <ul className="dropdown-menu dropdown-alerts">
            {
                alerts.map((alert,index)=>(
                        <Alert key={index} alert={alert}/>
                ))
            }
            </ul>
        </li>
        )
    }
}
export default Alerts;