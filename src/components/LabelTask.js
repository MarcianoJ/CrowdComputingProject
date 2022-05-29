import React from "react";
import { ReactSession }  from 'react-client-session';
import TextArea from "./TextArea";
class LabelTask extends React.Component{
    constructor(props, history) {
        super(props)
        var index = window.localStorage.getItem('index');

        this.state = {
            sentence:this.props.sentences[index]
        } 
        this.labelSelectHandler = this.labelSelectHandler.bind(this)
    }

    labelSelectHandler(e){
        this.props.setLabel(e.target.id)
        this.props.history.push("/")
    }

    render(){
        return(
            <div>
                <TextArea sentence = {this.state.sentence}/> 
                <div className="d-flex justify-content-center buttonbox">
                    <button id="0" className="btn btn-danger" onClick={this.labelSelectHandler}>negative</button>
                    <button id="1" className="btn btn-success" onClick={this.labelSelectHandler}>positive</button>
                    
                </div>


            </div>

        )
    }
}

export default LabelTask;