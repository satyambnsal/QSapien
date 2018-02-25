import React,{Component} from 'react';
import Message from './Message';
import Radium from 'radium';
class Messages extends Component{
    render(){
        let messages=[
            {
                sender_name:"ram",
                message_text:"hi satyam"
            },
            {
                sender_name:"deepak",
                message_text:"hi satyam"
            }
        ];
        return(
            <li className="dropdown">
            <a className="dropdown-toggle" data-toggle="dropdown" href="#">
                <i className="fa fa-envelope fa-fw"></i>
                <i className="fa fa-caret-down"></i>
            </a>
            <ul className="dropdown-menu dropdown-messages" style={styles.dropdownMessage}>
            {
                messages.map((message,index)=>(
                    <div>
                    <Message key={index} message={message} index={index}/>
                <li  className="divider" />
                </div>
            ))
            }
            </ul>
        </li>
        )
    }
}

const styles={
    dropdownMessage:{
        marginLeft:'5px',
        width:'310px',
        minWidth:'0px'
    }
}
export default Radium(Messages  );