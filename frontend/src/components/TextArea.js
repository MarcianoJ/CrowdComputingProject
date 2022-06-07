import React from 'react';

export default function TextArea(props){

    return(
        <div className="container d-flex justify-content-center mb-2">
            <textarea id={props.id} readOnly className="d-flex justify-content-center" onMouseUp={props.handler} value={props.sentence}></textarea>
        </div>
    )
    
}