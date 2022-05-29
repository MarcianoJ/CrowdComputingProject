import TextArea from './TextArea'
import React from 'react'
import { ReactSession }  from 'react-client-session';

class HighlightTask extends React.Component {
    constructor(props) {
        super(props)
        var index = window.localStorage.getItem('index');

        this.state = {
            sentence:this.props.sentences[index]
        } 

        this.highlightHandler = this.highlightHandler.bind(this)
        this.removeHandler = this.removeHandler.bind(this)
        this.resetHandler = this.resetHandler.bind(this)
        this.submit = this.submit.bind(this)
    }

    highlightHandler(e) {
          var sel = window.getSelection().toString();
          if(!this.props.rational.includes(sel)){
            this.props.setRational([...this.props.rational, sel])
          }
    }

    removeHandler(e){
        var id =e.target.id
        this.props.rational.splice(id,1)
        this.props.setRational([...this.props.rational])
    }

    resetHandler(e){
        this.props.setRational([])
    }

    submit(e){
        // var data = {
        //     "sentence":
        // }
        var index = window.localStorage.getItem('index');
        var new_index = parseInt(index)+1
        window.localStorage.setItem('index',new_index);
        console.log(new_index);
        console.log(this.props.sentences)
        if(this.props.sentences.length <= new_index){
            this.props.history.push("/finished")
            
        }
        else{
            this.props.history.push("/label")

        }


    }

    render() {
        return (
            <div>
                <TextArea  sentence = {this.state.sentence} handler={this.highlightHandler}/>

                <div className="d-flex container justify-content-center selected-items">

                    <ul>
                    {
                        this.props.rational.map((item, i)=>{
                            return (
                            <li key={i}><span className="badge alert-success item">{item}<span className="x" id={i} onClick={this.removeHandler} aria-hidden="true">&times;</span></span></li>
                            )
                        })
                    }
                    </ul>
                </div>

                <div className="d-flex justify-content-center buttonbox">
                    <button className="btn btn-danger" onClick={this.resetHandler}>reset</button>
                    <button className="btn btn-success"  onClick={this.submit}>next</button>
                </div>
                <h3>label: {this.props.label}</h3>
                <h3>user: {ReactSession.get("username")}</h3>


            </div>

        )
    }
}

export default HighlightTask