import React from "react";
import TextArea from "./TextArea";
import { useLocation, useParams } from "react-router-dom";
import UI from './UI';
import Instructions, {instruction_sentiment_analysis} from "./Instructions";
import TaskTitle, { sentiment_classify, sentiment_classify_instruction } from "./TaskTitle";

const axios = require('axios').default;


const SentimentLabelTask = (props) => {
    const location = useLocation()
    var sentences = location.state.sentences
    var sentenceIndex = location.state.sentenceIndex
    var sentence = sentences[sentenceIndex]
    const { gameid } = useParams()
    console.log(props.data)

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


    function goBackHandler(e) {
        if(sentenceIndex == 0){
            props.navigate('/')
        }
        else{
            props.navigate(`entailment/rational/${gameid}`, {state:{
                sentences:sentences,
                sentenceIndex:sentenceIndex-1
            }
            })
        }   
    }


    
    return(
        <div>
            <UI index= {sentenceIndex}/>
            <TaskTitle task={sentiment_classify}/>
            <TextArea sentence = {sentence} header="" readOnly={true}/> 

            <TaskTitle task={sentiment_classify_instruction}/>
            <div className="d-flex justify-content-center buttonbox">
                <button id="0" className="btn btn-danger" onClick={labelSelectHandler}>negative</button>
                <button id="1" className="btn btn-secondary" onClick={labelSelectHandler}>neutral</button>
                <button id="2" className="btn btn-success" onClick={labelSelectHandler}>positive</button>
            </div>
            <div className="d-flex justify-content-between footer-div">
                <button id="2" className="btn btn-primary footer-btn-left" onClick={goBackHandler}>go back</button>
                <Instructions instruction={instruction_sentiment_analysis} />
            </div>

        </div>

    )
}

export default SentimentLabelTask;