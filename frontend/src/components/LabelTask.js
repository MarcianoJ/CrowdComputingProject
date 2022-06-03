import React from "react";
import { ReactSession }  from 'react-client-session';
import TextArea from "./TextArea";
import { useLocation, useParams } from "react-router-dom";
import { useState, useEffect} from 'react';
import uuid from 'react-uuid'
const axios = require('axios').default;


const LabelTask = (props) => {
    const location = useLocation()
    var sentences = location.state.sentences
    var sentenceIndex = location.state.sentenceIndex
    var sentence = sentences[sentenceIndex]
    const { gameid } = useParams()

    function labelSelectHandler(e){
        var data = props.data
        data[sentence] = {"label": e.target.id, "rational":[]}
        props.setData(data)
        props.navigate(`/rational/${gameid}`, {state:{
            sentences:sentences,
            sentenceIndex:sentenceIndex
        }
        })
    }


    
    
    return(
        <div>
            <TextArea sentence = {sentence}/> 
            <div className="d-flex justify-content-center buttonbox">
                <button id="0" className="btn btn-danger" onClick={labelSelectHandler}>negative</button>
                <button id="1" className="btn btn-success" onClick={labelSelectHandler}>positive</button>
            </div>


        </div>

    )
}

export default LabelTask;