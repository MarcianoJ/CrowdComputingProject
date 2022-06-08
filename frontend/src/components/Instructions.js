import React, { useContext} from 'react'
import UserContext from '../components/User';
import { useCookies } from 'react-cookie';

export const no_instruction = 0
export const instruction_sentiment_analysis = 1
export const instruction_entailment = 2

export default function Instructions(props) {
    const userContext = useContext(UserContext);
    const [cookies, setCookie, removeCookie] = useCookies();

    const [showInstructions, setShowInstructions] = React.useState(false)
    
    var instruction = props.instruction
    var enableInstructions = instruction && instruction != no_instruction

    if (enableInstructions) {
        return (
            <div>
                <button className={showInstructions ? "btn instruction-button-open btn-outline-primary footer-btn-right" : "btn instruction-button-open btn-primary footer-btn-right"} onClick={() => { setShowInstructions(!showInstructions); }}> Help </button>
                { showInstructions ? (
                    <div class="instruction-container"> 
                        <button class="btn btn-danger exit footer-btn-right" onClick={() => { setShowInstructions(false); }}> X </button>
                        { getInstructions(props.instruction) }
                    </div>
                ) : null }
            </div>
        )
    } else {
        return <div>hidden</div>
    }


    function getInstructions(instructions) {
        console.log(instructions);
        if (instructions) {
            if (instructions == instruction_sentiment_analysis) {
                return getSentimentInstructions();
            } else if (instructions == instruction_entailment) {
                return getEntailmentInstructions();
            }
        } 
        return null;


        function getSentimentInstructions() {
            return (<div class="instructions">
                <h1>Sentiment Instructions</h1>
                <p>Press enter</p>
            </div>);
        }

        function getEntailmentInstructions() {
            return (<div>
                <h1>Entailment Instruction</h1>
                <p>Press enter</p>
            </div>);
        }
    }
}