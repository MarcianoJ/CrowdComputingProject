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
            return (<div class="instructions container">

                <div class="row">
                    <h1>Sentiment Challenge</h1>
                    <p>The Sentiment Challenge is divided into two parts: sentiment determination and sentiment highlighting</p>
                    <h2>Sentiment Determination</h2>
                    <p>
                        The goal of this task is to determine whether the underlying sentiment of the provided sentence is positive, negative or neutral.
                        Doing so, you will be provided with a sentence of which you have to determine the underlying sentiment. Click the button corresponding to your chosen sentiment to continue to the next part of the challenge.
                        When you are not sure what the sentiment is, press 'I don't know' to skip the task and continue with the next one. During the game, you can always go back to previous tasks when you made a mistake.
                    </p>
                    <p>To illustrate the goal of this task, we have prepared three examples. These are displayed in the table below.</p>
                </div>
                <div class="row justify-content-center">
                    <div class="col-6 text-start">
                        <table class="table  text-start">
                            <tr>
                                <th scope="col">Sentence</th>
                                <th scope="col">Sentiment Determination</th>
                            </tr>
                            <tr>
                                <td>I like hiking through the mountains.</td>
                                <td>Positive</td>
                            </tr>
                            <tr>
                                <td>I find chess a very boring game.</td>
                                <td>Negative</td>
                            </tr>
                            <tr>
                                <td>The man was walking through the super market.</td>
                                <td>Neutral</td>
                            </tr>
                        </table> 
                    </div>
                </div>
                <div class="row">
                    <h2>Sentiment Highlighitng</h2>
                    <p>
                        The goal of this task is to determine whether the underlying sentiment of the provided sentence is positive, negative or neutral.
                        Doing so, you will be provided with a sentence of which you have to determine the underlying sentiment. Click the button corresponding to your chosen sentiment to continue to the next part of the challenge.
                        When you are not sure what the sentiment is, press 'I don't know' to skip the task and continue with the next one. During the game, you can always go back to previous tasks when you made a mistake.
                    </p>
                    <p>To illustrate the goal of this task, we have prepared three examples. These are displayed in the table below.</p>
                </div>
            </div>)
        }

        function getEntailmentInstructions() {
            return (<div>
                <h1>Entailment Instruction</h1>
                <p>Press enter</p>
            </div>);
        }
    }
}