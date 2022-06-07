import React from "react";
import TextArea from "./TextArea";
import { useLocation, useParams } from "react-router-dom";
import UI from './UI';
import Instructions, {instruction_sentiment_analysis} from "./Instructions";

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
            <div>
                <UI index= {sentenceIndex}/>
                <TextArea sentence = {sentence}/> 
                <div className="d-flex justify-content-center buttonbox">
                    <button id="0" className="btn btn-danger" onClick={labelSelectHandler}>negative</button>
                    <button id="1" className="btn btn-success" onClick={labelSelectHandler}>positive</button>
                </div>
            </div>
            <Instructions instruction={instruction_sentiment_analysis} />


        </div>

    )
}

export default LabelTask;