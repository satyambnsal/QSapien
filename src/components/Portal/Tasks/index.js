import React,{Component} from 'react';
import Task from './Task';
import Radium from 'radium';



class Tasks extends Component{
    render(){
        const tasks=[
            {
                task_name:"Submit computer network assignment",
                per_complete:40
            },
            {
                task_name:"Submit computer network assignment",
                per_complete:100
            }
        ];
        return(
            <li className="dropdown">
            <a className="dropdown-toggle" data-toggle="dropdown" href="#">
                <i className="fa fa-tasks fa-fw"></i>
                <i className="fa fa-caret-down"></i>
            </a>
            <ul className="dropdown-menu dropdown-tasks" style={styles.dropdownTasks}>
            {
                tasks.map((task,index)=>(
                    <div>
                    <Task style={styles.textColor} key={index} index={index} task={task} />
                    <li className="divider" />
                    </div>
                ))
            }
            </ul>
        </li>
        )
    }
}
const styles={
"dropdownTasks":{
    "margin-left":'auto'
},
"textColor":{
    color:"red"
}
}
export default Radium(Tasks);