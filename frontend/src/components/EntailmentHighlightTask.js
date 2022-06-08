import TextArea from './TextArea'
import React, { useState} from 'react'
import { useLocation, useParams } from "react-router-dom";
import UI from './UI';
import {resetHighlight, removeHighlight, highlight} from '../utils/entailmentHighlights'
import Instructions, {instruction_entailment} from "./Instructions";
import TaskTitle, {entailment_highlight} from "./TaskTitle";

const EntailmentHighlight = (props) => {
    const location = useLocation()
    const { gameid } = useParams()
    const [selectStatus, setSelectStatus] = useState(0)
    console.log(props.data)

    
    var sentences = location.state.sentences
    var sentenceIndex = location.state.sentenceIndex
    var sentence = sentences[sentenceIndex]

    //HIGHLIGHT HANDLERS
    function highlightHandler(e) {

        if(selectStatus === 0 && e.target.id == 0){
            highlight(e,props,sentence)
            setSelectStatus(1)
        } 
        if(selectStatus === 1 && e.target.id == 1){
            highlight(e,props,sentence)
            setSelectStatus(0)
        }
    }


    function removeHandler(e){
        removeHighlight(e, props, sentence)
        setSelectStatus(0)

    }

    function resetHandler(e){
        resetHighlight(e, props, sentence)
        setSelectStatus(0)
    }

    function goBackHandler(e) {
        props.navigate(`/entailment/label/${gameid}`, {state:{
            sentences:sentences,
            sentenceIndex:sentenceIndex
        }
        })
    }

    //SUBMIT
    function submit(e){

        if(selectStatus == 1){
            return
        }
        if(sentenceIndex >= sentences.length-1){
            //TODO: push results to database
            props.navigate("/finished")
        }
        else{
            props.navigate(`entailment/label/${gameid}`, {state:{
                sentences: sentences,
                sentenceIndex: sentenceIndex+1
            }
            })
        }
    }

    return (
        <div>
            <UI index= {sentenceIndex}/>

            <TaskTitle task={entailment_highlight}/>
            <TextArea id={0} sentence = {sentence[0]} handler={highlightHandler} header="Sentence 1: " readOnly={false}/>
            <TextArea id={1} sentence = {sentence[1]} handler={highlightHandler} header="Sentence 2: " readOnly={false}/> 

            <div className="d-flex container justify-content-center">

                <ul>
                {   
                    props.data[sentence[0]]["rational"].map((item, i)=>{
                        return (
                            <div className="d-flex entailment-box">
                                <li key={item[0]}><span className="badge alert-success item">{item[0]}<span className="x" id={i} onClick={removeHandler} aria-hidden="true"></span></span></li>
                                <li key={item[1]}><span className="badge alert-success item">{item[1]}<span className="x" id={i} onClick={removeHandler} aria-hidden="true"></span></span></li>
                                <span className="x" id={i} onClick={removeHandler} aria-hidden="true">&times;</span>
                            </div>
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
                <Instructions instruction={instruction_entailment} />
            </div>
            
        </div>

    )
    
}

export default EntailmentHighlight