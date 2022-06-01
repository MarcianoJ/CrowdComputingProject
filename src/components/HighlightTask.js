import TextArea from './TextArea'
import React from 'react'
import { ReactSession }  from 'react-client-session';

class HighlightTask extends React.Component {
    constructor(props) {

        super(props)
        var index = window.localStorage.getItem('index');

        this.state = {
            sentence:this.props.sentences[this.props.index]
        } 

        this.props.data[this.state.sentence]["rational"]=[]
        this.highlightHandler = this.highlightHandler.bind(this)
        this.removeHandler = this.removeHandler.bind(this)
        this.resetHandler = this.resetHandler.bind(this)
        this.submit = this.submit.bind(this)
    }

    highlightHandler(e) {
        var sel = window.getSelection().toString();
        var data = this.props.data 
        data[this.state.sentence]["rational"] = [...data[this.state.sentence]["rational"], sel]
        console.log(data)
        this.props.setData(({...data}))

    }

    removeHandler(e){
        var id =e.target.id
        console.log(this.props.data)

        this.props.data[this.state.sentence]["rational"].splice(id,1)
        var data = this.props.data 

        console.log("data:  ")
        console.log(data)
        console.log({...data})
        data[this.state.sentence]["rational"] = {...data}[this.state.sentence]["rational"]
        this.props.setData(({...data}))
    }

    resetHandler(e){
        var data = this.props.data 
        data[this.state.sentence]["rational"] = []
        this.props.setData(({...data}))
    }

    submit(e){
        // var data = {
        //     "sentence":
        // }
        var new_index = this.props.index + 1
        this.props.setIndex(new_index);
        if(this.props.sentences.length <= new_index){
            this.props.history.push("/finished")
            
        }
        else{
            this.props.history.push("/label")

        }


    }

    render() {
        console.log(this.props.data)
        return (
            <div>
                <TextArea  sentence = {this.state.sentence} handler={this.highlightHandler}/>

                <div className="d-flex container justify-content-center selected-items">

                    <ul>
                    {
                        this.props.data[this.state.sentence]["rational"].map((item, i)=>{
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
            </div>

        )
    }
}

export default HighlightTask