import React from 'react';
import Radium from 'radium';
const Task=(props)=>{
    const per_complete={width:props.task.per_complete+'%'};

    return(
        <li>
        <a href={props.task.task_link||"#"}>
            <div>
                <p>
                    <strong>{props.task.task_name}</strong>
                    <span className="pull-right text-muted">{props.task.per_complete}% Complete</span>
                </p>
    
                <div className="progress progress-striped active">
                    <div className="progress-bar progress-bar-success" role="progressbar" style={per_complete}>
                    </div>
                </div>
            </div>
        </a>
    </li>
    
    )
}
export default Task;