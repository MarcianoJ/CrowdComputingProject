import TextArea from './TextArea'
import React from 'react'
import { useLocation, useParams } from "react-router-dom";
import UI from './UI';
import {resetHighlight, removeHighlight, highlight} from '../utils/sentmentHighlights'
import Instructions, {instruction_sentiment_analysis} from "./Instructions";
import TaskTitle, { sentiment_highlight } from './TaskTitle';

const SentimentHighlightTask = (props) => {
    const location = useLocation()
    const { gameid } = useParams()
    var sentences = location.state.sentences
    var sentenceIndex = location.state.sentenceIndex
    var sentence = sentences[sentenceIndex]
    console.log(props.data)


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

    function goBackHandler(e) {
        props.navigate(`/sentiment/label/${gameid}`, {state:{
            sentences:sentences,
            sentenceIndex:sentenceIndex
        }
        })
    }

    return (
        <div>
            <UI index= {sentenceIndex}/>
            <TaskTitle task={sentiment_highlight}/>
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
                <button className="btn btn-success"  onClick={submit}>finished</button>
            </div>
            <div className="d-flex justify-content-between footer-div">
                <button id="2" className="btn btn-primary footer-btn-left" onClick={goBackHandler}>go back</button>
                <Instructions instruction={instruction_sentiment_analysis} />
            </div>

        </div>

    )
    
}

export default SentimentHighlightTask