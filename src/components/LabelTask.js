import React from "react";
import { ReactSession }  from 'react-client-session';
import TextArea from "./TextArea";
class LabelTask extends React.Component{
    constructor(props, history) {
        super(props)

        this.state = {
            sentence:this.props.sentences[this.props.index]
        } 


        this.props.data[this.state.sentence]={"rational":[], "label":-1}

        this.labelSelectHandler = this.labelSelectHandler.bind(this)
    }

    labelSelectHandler(e){
        var data = this.props.data
        console.log(this.state.sentence)
        data[this.state.sentence].label = e.target.id
        this.props.setData(data)
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