import TextArea from './TextArea'
import React, { useState} from 'react'
import { useLocation, useParams } from "react-router-dom";
import UI from './UI';
import {resetHighlight, removeHighlight, highlight} from '../utils/entailmentHighlights'
import Instructions, {instruction_entailment} from "./Instructions";
import TaskTitle, {entailment_highlight, entailment_highlight_instruction} from "./TaskTitle";
import { entailment_label_contradicts, entailment_label_is_neutral, entailment_label_entails } from './EntailmentLabelTask';
import { publishBatchResults } from '../utils/utils'
import { useCookies } from 'react-cookie';

const EntailmentHighlight = (props) => {
    const location = useLocation()
    const { gameid } = useParams()
    const [selectStatus, setSelectStatus] = useState(0)
    const [cookies, setCookie, removeCookie] = useCookies();

    var sentences = location.state.sentences
    var sentenceIndex = location.state.sentenceIndex
    var sentence = sentences[sentenceIndex]

    var data = props.data
    function getSentimentLabel() {
        var label_id = data[sentence[0]].label;
        if (label_id == entailment_label_contradicts) {
            return "contradicts";
        } else if (label_id == entailment_label_is_neutral) {
            return "is_neutral";
        } else if (label_id == entailment_label_entails) {
            return "entails";
        } else {
            return ""
        }
    }


    //HIGHLIGHT HANDLERS
    function highlightHandler(e) {
        e.preventDefault()

        if(selectStatus === 0 && e.target.id == 0){
            var change = highlight(e,props,sentence)
            if(change)
                setSelectStatus(1)
        } 
        if(selectStatus === 1 && e.target.id == 1){
            var change = highlight(e,props,sentence)
            if(change)
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
            ids:location.state.ids,
            task_id: location.state.task_id,
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
            let final_results = {}
            for(let counter = 0; counter < sentences.length; counter++){
                var result = props.data[sentences[counter][0]]
                let rational1 = []
                let rational2 = []
                for (var i = 0; i < result.rational.length; i++) {
                    rational1.push(result.rational[i][0])
                    rational2.push(result.rational[i][1])
                }
                final_results[counter] = {
                    "classification":result.label,
                    "rationale_words":rational1,
                    "rationale_words2":rational2,
                    "data_point_id":location.state.ids[counter],
                    "task_set_id":location.state.task_id
                }
            }
            publishBatchResults(cookies.token,final_results,cookies, setCookie)
            props.navigate("/finished")
        }
        else{
            props.navigate(`entailment/label/${gameid}`, {state:{
                sentences: sentences,
                ids:location.state.ids,
                task_id: location.state.task_id,
                sentenceIndex: sentenceIndex+1
            }
            })
        }
    }

    return (
        <div>
            <UI index= {sentenceIndex} sentencesLength={sentences.length}/>

            <TaskTitle task={entailment_highlight} label={getSentimentLabel()}/>

            <TextArea id={0} sentence = {sentence[0]} handler={highlightHandler} header="Context: " readOnly={false}/>
            <TextArea id={1} sentence = {sentence[1]} handler={highlightHandler} header="Statement: " readOnly={false}/> 


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
            <TaskTitle task={entailment_highlight_instruction} label={getSentimentLabel()}/>
            <div className="d-flex justify-content-center buttonbox">
                <button className="btn btn-danger" onClick={resetHandler}>reset</button>
                <button className="btn btn-success"  onClick={submit}>finish</button>
            </div>

            <div className="d-flex justify-content-between footer-div">
                <button id="2" className="btn btn-primary footer-btn-left" onClick={goBackHandler}>go back</button>
                <Instructions instruction={instruction_entailment} />
            </div>
            
        </div>

    )
    
}

export default EntailmentHighlight