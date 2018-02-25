import React from 'react';

const Message=(props)=>(
    <li key={props.index}>
    <a href={props.message.message_ink||"#"}>
        <div>
            <strong>{props.message.sender_name}</strong>
            <span className="pull-right text-muted">
                <em>{props.message.message_time||" "}</em>
            </span>
        </div>
        <div>{props.message.message_text}</div>
    </a>
</li>
)
export default Message;