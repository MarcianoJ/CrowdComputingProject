import TextArea from './TextArea'
import React, { useState} from 'react'
import { useLocation, useParams } from "react-router-dom";
import UI from './UI';
import {resetHighlight, removeHighlight, highlight} from '../utils/entailmentHighlights'

const EntailmentHighlight = (props) => {
    const location = useLocation()
    const { gameid } = useParams()
    const [selectStatus, setSelectStatus] = useState(0)

    
    var sentences = location.state.sentences
    var sentenceIndex = location.state.sentenceIndex
    var sentence = sentences[sentenceIndex]
    console.log(sentences)
    console.log(sentenceIndex)

    //HIGHLIGHT HANDLERS
    function highlightHandler(e) {

        if(selectStatus === 0 && e.target.id == 0){
            highlight(e,props,sentence)
            console.log("selected first")
            setSelectStatus(1)
        } 
        if(selectStatus === 1 && e.target.id == 1){
            highlight(e,props,sentence)
            console.log("selected second")
            setSelectStatus(0)
        }


        console.log(props.data[sentence[0]]["rational"])
    }


    function removeHandler(e){
        removeHighlight(e, props, sentence)
        setSelectStatus(0)

    }

    function resetHandler(e){
        resetHighlight(e, props, sentence)
        setSelectStatus(0)

    }

    //SUBMIT
    function submit(e){

        if(selectStatus == 1){
            return
        }
        console.log(sentences.length-1)
        console.log(sentenceIndex)

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
            <TextArea id={0} sentence = {sentence[0]} handler={highlightHandler}/>
            <TextArea id={1} sentence = {sentence[1]} handler={highlightHandler}/> 

            <div className="d-flex container justify-content-center selected-items">

                <ul>
                {   
                    props.data[sentence[0]]["rational"].map((item, i)=>{
                        console.log(item, i)
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
                <button className="btn btn-success"  onClick={submit}>next</button>
            </div>
        </div>

    )
    
}

export default EntailmentHighlight