import React from 'react';

const Alert=(props)=>(
    <li>
    <a href={props.alert.alert_link}>
        <div>
            <i className="fa fa-comment fa-fw"></i>{props.alert.alert_text}
        <span className="pull-right text-muted small">{props.alert.alert_time}}</span>
        </div>
    </a>
</li>
);

export default Alert;