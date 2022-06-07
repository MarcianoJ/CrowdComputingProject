import TextArea from './TextArea'
import React from 'react'
import { useLocation, useParams } from "react-router-dom";
import UI from './UI';
import {resetHighlight, removeHighlight, highlight} from '../utils/sentmentHighlights'
import Instructions, {instruction_sentiment_analysis} from "./Instructions";

const SentimentHighlightTask = (props) => {
    const location = useLocation()
    const { gameid } = useParams()
    var sentences = location.state.sentences
    var sentenceIndex = location.state.sentenceIndex
    var sentence = sentences[sentenceIndex]
    console.log(sentences)
    console.log(sentenceIndex)

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
            props.navigate("/finished")
        }
        else{
            props.navigate(`/sentiment/label/${gameid}`, {state:{
                sentences: sentences,
                sentenceIndex: sentenceIndex+1
            }
            })
        }
    }

    return (
        <div>
            <UI index= {sentenceIndex}/>
            <TextArea  sentence = {sentence} handler={highlightHandler}/>

            <div className="d-flex container justify-content-center selected-items">

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
                <button className="btn btn-success"  onClick={submit}>next</button>
            </div>
            <Instructions instruction={instruction_sentiment_analysis} />

        </div>

    )
    
}

export default SentimentHighlightTask