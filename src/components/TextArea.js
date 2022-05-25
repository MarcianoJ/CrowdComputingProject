import React from 'react'
class TextArea extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            curr_selected: "",
            all_selected:[]

        }
        this.highlightHandler = this.highlightHandler.bind(this)
        this.removeHandler = this.removeHandler.bind(this)
    }



    highlightHandler(e) {
        if (e.type === "mouseup") {
          var sel = window.getSelection().toString();
  

          if(sel != this.state.curr_selected){
            this.setState(prevState => ({
                curr_selected:sel,
                all_selected: [...prevState.all_selected, sel]
            }))
        
          }
        } else {
          //console.log("higlight");
        }


    }

    removeHandler(e){
        var id =e.target.id
        console.log(id)
        this.state.all_selected.splice(id,1)
        console.log( this.state.all_selected)
        this.setState({
            all_selected:  this.state.all_selected
        })
    }



    render() {
        return (
            <div>
                <div className="container d-flex justify-content-center gamebox">
                    <textarea readOnly className="d-flex justify-content-center" onMouseUp={this.highlightHandler} value="This is an example description."></textarea>
                </div>

                <div className="d-flex justify-content-center">

                    <ul>
                    {
                        this.state.all_selected.map((item, i)=>{
                            return <li key={i}><span className="badge alert-success item">{item}<span className="x" id={i} onClick={this.removeHandler} aria-hidden="true">&times;</span></span></li>
                        })
                    }
                    </ul>
                </div>
            </div>
           
        )
    }
}

export default TextArea