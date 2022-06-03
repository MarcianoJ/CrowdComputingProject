import TextArea from './TextArea'
import React from 'react'
import { ReactSession }  from 'react-client-session';
import { useLocation, useParams } from "react-router-dom";

const HighlightTask = (props) => {
    const location = useLocation()
    const { gameid } = useParams()
    
    var sentences = location.state.sentences
    var sentenceIndex = location.state.sentenceIndex
    var sentence = sentences[sentenceIndex]

    //HIGHLIGHT HANDLERS
    function highlightHandler(e) {
        var sel = window.getSelection().toString();
        var data = props.data 
        data[sentence]["rational"] = [...data[sentence]["rational"], sel]
        props.setData(({...data}))
    }

    function removeHandler(e){
        var id =e.target.id
        props.data[sentence]["rational"].splice(id,1)
        var data = props.data 
        data[sentence]["rational"] = {...data}[sentence]["rational"]
        props.setData(({...data}))
    }

    function resetHandler(e){
        var data = props.data 
        data[sentence]["rational"] = []
        props.setData(({...data}))
    }

    //SUBMIT
    function submit(e){
        console.log(sentenceIndex)
        console.log(sentences.length)
        if(sentenceIndex >= sentences.length-1){

            //TODO: push results to database
            props.navigate("/finished")
        }
        else{
            props.navigate(`/label/${gameid}`, {state:{
                sentences: sentences,
                sentenceIndex: sentenceIndex+1
            }
            })
        }
    }

    return (
        <div>
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
        </div>

    )
    
}

export default HighlightTask