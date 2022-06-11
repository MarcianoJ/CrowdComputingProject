import TextArea from './TextArea'
import React from 'react'
import { useLocation, useParams } from "react-router-dom";
import UI from './UI';
import {resetHighlight, removeHighlight, highlight} from '../utils/sentmentHighlights'
import Instructions, {instruction_sentiment_analysis} from "./Instructions";
import TaskTitle, { sentiment_highlight, sentiment_highlight_instruction } from './TaskTitle';
import {sentiment_label_negative, sentiment_label_neutral, sentiment_label_positive} from './SentimentLabelTask'
import { publishBatchResults } from '../utils/utils'
import { useCookies } from 'react-cookie';

const SentimentHighlightTask = (props) => {
    const location = useLocation()
    const { gameid } = useParams()
    const [cookies, setCookie, removeCookie] = useCookies();

    var sentences = location.state.sentences
    var sentenceIndex = location.state.sentenceIndex
    var sentence = sentences[sentenceIndex]

    var data = props.data
    function getSentimentLabel() {
        var label_id = data[sentence].label;
        if (label_id == sentiment_label_negative) {
            return "negative";
        } else if (label_id == sentiment_label_neutral) {
            return "neutral";
        } else if (label_id == sentiment_label_positive) {
            return "postive";
        } else {
            return ""
        }
    }


    //HIGHLIGHT HANDLERS
    function highlightHandler(e) {
        highlight(e,props,sentence)
    }

    function removeHandler(e){
        removeHighlight(e, props, sentence)
    }

    function resetHandler(e){
        resetHighlight(e, props, sentence)
    }

    //SUBMIT
    function submit(e){
        if(sentenceIndex >= sentences.length-1){
            //TODO: push results to database
            let final_results = {}
            let counter = 0
            for(let key in props.data){
                var result = props.data[key]
                final_results[counter] = {
                    "classification":result.label,
                    "rationale_words":result.rational,
                    "data_point_id":location.state.ids[counter],
                    "task_set_id":location.state.task_id
                }
                counter++
            }
            publishBatchResults(cookies.token,final_results)
            props.navigate("/finished")
        }
        else{
            props.navigate(`/sentiment/label/${gameid}`, {state:{
                sentences: sentences,
                ids: location.state.ids,
                task_id: location.state.task_id,
                sentenceIndex: sentenceIndex+1
            }
            })
        }
    }

    function goBackHandler(e) {
        props.navigate(`/sentiment/label/${gameid}`, {state:{
            sentences:sentences,
            ids:location.satete.ids,
            sentenceIndex:sentenceIndex
        }
        })
    }

    return (
        <div>
            <UI index= {sentenceIndex}/>
            <TaskTitle task={sentiment_highlight} label={getSentimentLabel()}/>
            <TaskTitle task={sentiment_highlight_instruction} label={getSentimentLabel()}/>

            <TextArea  sentence = {sentence} handler={highlightHandler} header="" readOnly={false}/>
            <div className="d-flex container justify-content-center">
                <ul>
                {
                    props.data[sentence]["rational"].map((item, i)=>{
                        return (
                        <li key={i}><span className="badge alert-success item">{item}<span className="x" id={i} onClick={removeHandler} aria-hidden="true">&times;</span></span></li>
                        )
                    })
                }
                </ul>
            </div>
            <div className="d-flex justify-content-center buttonbox">
                <button className="btn btn-danger" onClick={resetHandler}>reset</button>
                <button className="btn btn-success"  onClick={submit}>finish</button>
            </div>
            <div className="d-flex justify-content-between footer-div">
                <button id="2" className="btn btn-primary footer-btn-left" onClick={goBackHandler}>go back</button>
                <Instructions instruction={instruction_sentiment_analysis} />
            </div>

        </div>

    )
    
}

export default SentimentHighlightTask