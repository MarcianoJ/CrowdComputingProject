export default function TextArea(props){

    return(
        <div className="container d-flex justify-content-center gamebox">
            <textarea readOnly className="d-flex justify-content-center" onMouseUp={props.handler} value={props.sentence}></textarea>
        </div>
    )
    
}