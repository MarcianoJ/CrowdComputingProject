import React, {useState} from 'react'
import { useLocation, useParams } from "react-router-dom";
import UI from './UI';
import Instructions, {instruction_sentiment_analysis} from "./Instructions";
import TaskTitle, { sentiment_highlight, sentiment_highlight_instruction } from './TaskTitle';
import {sentiment_label_negative, sentiment_label_neutral, sentiment_label_positive} from './SentimentLabelTask'
import { publishBatchResults } from '../utils/utils'
import { useCookies } from 'react-cookie';

const SentimentHighlightTask = (props) => {
    const location = useLocation()
    const { gameid } = useParams()
    const [cookies, setCookie] = useCookies();

    var sentences = location.state.sentences
    var sentenceIndex = location.state.sentenceIndex
    var sentence = sentences[sentenceIndex]
    const labels = location.state.labels
    const label = labels[sentenceIndex]
    const rationales = location.state.rationales
    console.log(rationales)
    function getSentimentLabel() {
        var label_id = label;
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
    const [words, setWords] = useState(() => {
        return sentence.split(/ /g).map(w => ({word: w, highlighted: false}))
    })

    function resetHandler(e){
        // For some bizzare reason react does not understand when we update the original array. So I do a deep copy instead.
        let copy = [...words]
        copy.map(w => w.highlighted = false) 
        setWords(copy)
    }

    //SUBMIT
    function submit(e){
        rationales.push(words.filter(w => w.highlighted).map(w => w.word))
        if(sentenceIndex >= sentences.length-1){
            let final_results = {}
            for(let i = 0; i<sentences.length; i++){
                final_results[i] = {
                    "classification":labels[i],
                    "rationale_words":rationales[i],
                    "data_point_id":location.state.ids[i],
                    "task_set_id":location.state.task_id
                }
            }
            publishBatchResults(cookies.token,final_results,cookies, setCookie)
            props.navigate("/finished")
        }
        else{
            props.navigate(`/sentiment/label/${gameid}`, {state:{
                sentences: sentences,
                ids: location.state.ids,
                task_id: location.state.task_id,
                sentenceIndex: sentenceIndex+1,
                labels: labels,
                rationales: rationales
            }
            })
        }
    }

    function goBackHandler(e) {
        props.navigate(`/sentiment/label/${gameid}`, {state:{
            sentences:sentences,
            ids:location.state.ids,
            task_id: location.state.task_id,
            sentenceIndex:sentenceIndex
        }
        })
    }

    function className(w) {
        if (w.highlighted) return "clickable_word highlighted"
        else return "clickable_word"
    }

    function clickableWords(words, clickCallback) {
        let dom = words.map((w, i) => <span key={i} className={className(w)} onClick={() => clickCallback(w, i)}>{w.word}</span>);
        return dom
    }

    function word_clicked(w, i) {
        // For some bizzare reason react does not understand when we update the original array. So I do a deep copy instead.
        let copy = [...words]
        copy[i].highlighted = !copy[i].highlighted
        setWords(copy)
    }

    return (
        <div>
            <UI index= {sentenceIndex} sentencesLength={sentences.length}/>
            <TaskTitle task={sentiment_highlight} label={getSentimentLabel()}/>
            <TaskTitle task={sentiment_highlight_instruction} label={getSentimentLabel()}/>
            <div className="d-flex justify-content-center flex-wrap contained">
                {clickableWords(words, word_clicked)}
            </div>
            <div className="d-flex justify-content-center buttonbox">
                <button className="btn btn-danger" onClick={resetHandler}>Reset</button>
                <button className="btn btn-success"  onClick={submit}>Finish</button>
            </div>
            <div className="d-flex justify-content-between footer-div">
                <button id="2" className="btn btn-primary footer-btn-left" onClick={goBackHandler}>Go back</button>
                <Instructions instruction={instruction_sentiment_analysis} />
            </div>

        </div>

    )
    
}

export default SentimentHighlightTask