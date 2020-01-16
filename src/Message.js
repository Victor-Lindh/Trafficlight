import React from 'react'

function Message(props) {

    return (
        <div>
            <p id="msgDiv" className={props.time < 10 || props.time > 19 ? "doNotCross" : "pleaseCross"}>{props.note}</p>
        </div>
    )};

    export default Message;