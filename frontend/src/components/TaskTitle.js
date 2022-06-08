import React, { useContext} from 'react'
import UserContext from './User';
import { useCookies } from 'react-cookie';

export const no_task = 0
export const entailment_classify = 1
export const entailment_classify_instruction = 1.5
export const entailment_highlight = 2
export const entailment_highlight_instruction = 2.5
export const sentiment_classify = 3
export const sentiment_classify_instruction = 3.5
export const sentiment_highlight = 4
export const sentiment_highlight_instruction = 4.5


export default function TaskTitle(props) {
    const userContext = useContext(UserContext);
    const [cookies, setCookie, removeCookie] = useCookies();
    
    var task = props.task
    var showTitle = task && task != no_task

    return (
        showTitle ? 
            <div class="container justify-content-center">
                { getTitle(task) }
            </div>
            : null
        )

    // todo: if takes too long: show hint to press help.

    function createTitle(title, subtitle) {
        return <div class="mb-3">
        <h1>{title}</h1>
        <h4>{subtitle}</h4>
    </div>
    }
    function createExplanation(explanation) {
        return <h5 class="mt-2 mb-2">
            {explanation}
        </h5>
    }

    function getTitle (task) {
        if (task && task != no_task) {
            if (task == entailment_classify) {
                return createTitle(
                    "Entailment Challenge",
                    "Please indicate whether the second statement is entails, contradicts, or is neutral towards the first statement"
                );
            } else if (task == entailment_classify_instruction) {
                return createExplanation("Follow these instructions carefully")
            }
            
            else if (task == entailment_highlight) {
                return createTitle(
                    "Entailment Challenge",
                    "Please select words from the first label and second label that made you select the classification."
                )
            } else if (task == entailment_highlight_instruction) {
                return createExplanation("Follow these instructions carefully")
            } 
            
            else if (task == sentiment_classify) {
                return createTitle(
                    "Sentiment challenge",
                    "Please select words from the first label and second label that made you select the classification."
                )
            } else if (task == sentiment_classify_instruction) {
                return createExplanation("Follow these instructions carefully")
            } 
            
            else if (task == sentiment_highlight) {
                return  createTitle(
                    "Sentiment challenge",
                    ">Please highlight the words that explains you choice of class."
                )
            } else if (task == sentiment_highlight_instruction) {
                return createExplanation("Follow these instructions carefully")
            }
        }
        return null
    }
}