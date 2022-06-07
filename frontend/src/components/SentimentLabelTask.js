import React from "react";
import TextArea from "./TextArea";
import { useLocation, useParams } from "react-router-dom";
import UI from './UI';
import Instructions, {instruction_sentiment_analysis} from "./Instructions";

const axios = require('axios').default;


const SentimentLabelTask = (props) => {
    const location = useLocation()
    var sentences = location.state.sentences
    var sentenceIndex = location.state.sentenceIndex
    var sentence = sentences[sentenceIndex]
    const { gameid } = useParams()

    function labelSelectHandler(e){
        var data = props.data
        data[sentence] = {"label": e.target.id, "rational":[]}
        props.setData(data)
        props.navigate(`sentiment/rational/${gameid}`, {state:{
            sentences:sentences,
            sentenceIndex:sentenceIndex
        }
        })
    }

    
    return(
        <div>
<<<<<<< HEAD:frontend/src/components/LabelTask.js
            <div>
                <UI index= {sentenceIndex}/>
                <TextArea sentence = {sentence}/> 
                <div className="d-flex justify-content-center buttonbox">
                    <button id="0" className="btn btn-danger" onClick={labelSelectHandler}>negative</button>
                    <button id="1" className="btn btn-success" onClick={labelSelectHandler}>positive</button>
                </div>
=======
            <UI index= {sentenceIndex}/>
            <TextArea sentence = {sentence}/> 
            <div className="d-flex justify-content-center buttonbox">
                <button id="0" className="btn btn-danger" onClick={labelSelectHandler}>negative</button>
                <button id="1" className="btn btn-secondary" onClick={labelSelectHandler}>neutral</button>
                <button id="2" className="btn btn-success" onClick={labelSelectHandler}>positive</button>
>>>>>>> main:frontend/src/components/SentimentLabelTask.js
            </div>
            <Instructions instruction={instruction_sentiment_analysis} />


        </div>

    )
}

export default SentimentLabelTask;