import React from "react";
import { useLocation, useParams } from "react-router-dom";
import UI from './UI';
import Instructions, {instruction_sentiment_analysis} from "./Instructions";
import TaskTitle, { sentiment_classify, sentiment_classify_instruction } from "./TaskTitle";

export var sentiment_label_negative = 0
export var sentiment_label_neutral = 1
export var sentiment_label_positive = 2


const SentimentLabelTask = (props) => {
    const location = useLocation()
    var sentences = location.state.sentences
    var sentenceIndex = location.state.sentenceIndex
    var sentence = sentences[sentenceIndex]
    const labels = location.state.labels
    const rationales = location.state.rationales
    console.log(labels)
    const { gameid } = useParams()

    function labelSelectHandler(e){
        var data = props.data
        props.setData(data)
        labels.push(e.target.id)
        props.navigate(`sentiment/rational/${gameid}`, {
            state:{
                sentences:sentences,
                ids:location.state.ids,
                task_id: location.state.task_id,
                sentenceIndex:sentenceIndex,
                labels: labels,
                rationales: rationales
            }
        })
    }

    function goBackHandler(e) {
        if(sentenceIndex == 0){
            props.navigate('/')
        }
        else{
            props.navigate(`sentiment/rational/${gameid}`, {state:{
                sentences:sentences,
                ids:location.state.ids,
                task_id: location.state.task_id,
                sentenceIndex:sentenceIndex-1,
                labels: labels,
                rationales: rationales
            }
            })
        }   
    }
    
    return(
        <div>
            <UI index= {sentenceIndex} sentencesLength={sentences.length}/>
            <TaskTitle task={sentiment_classify}/>
            <div className="d-flex justify-content-center flex-wrap contained">
                {sentence.split(/ /g).map((w, i) => <span key={i} className="unclickable_word">{w}</span>)}
            </div>
            <br />
            <div className="d-flex justify-content-center buttonbox">
                <button id={sentiment_label_negative} className="btn btn-danger" onClick={labelSelectHandler}>Negative</button>
                <button id={sentiment_label_neutral} className="btn btn-secondary" onClick={labelSelectHandler}>Neutral</button>
                <button id={sentiment_label_positive} className="btn btn-success" onClick={labelSelectHandler}>Positive</button>
            </div>
            <div className="d-flex justify-content-between footer-div">
                <button id="2" className="btn btn-primary footer-btn-left" onClick={goBackHandler}>Go back</button>
                <Instructions instruction={instruction_sentiment_analysis} />
            </div>

        </div>

    )
}

export default SentimentLabelTask;