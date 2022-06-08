import React from 'react';

export default function TextArea(props){
    var readonly = props.readOnly && props.readOnly == true;
    return(
        <div className="container d-flex justify-content-center">
            <div className="d-flex align-items-center px-2 text-nowrap sentence-label"><h5>{props.header}</h5></div>
            <textarea id={props.id}  className= {readonly ? "d-flex justify-content-center readonly" : "d-flex justify-content-center"} readOnly onMouseUp={props.handler} value={props.sentence}></textarea>
            <div className="d-flex align-items-center px-2 text-nowrap sentence-label"><h5></h5></div>
        </div>
    )
    
}