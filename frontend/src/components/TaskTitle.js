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
    var label = getLabel();
    console.log(label)
    return (
        showTitle ? 
            <div class="container justify-content-center">
                { getTitle(task, label) }
            </div>
            : null
        )

    // todo: if takes too long: show hint to press help.

    function getLabel() {
        if (props.label) {
            return props.label.toString()
        } else {
            return ""
        }
    }

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
    function createEmptyExplanation() {
        return <br/>
    }



    function getTitle (task, label) {
        if (task && task != no_task) {
            if (task == entailment_classify) {
                return createTitle(
                    "Entailment Challenge",
                    "Select whether the statement entails, contradicts or stands neutral towards the context."
                );
            } else if (task == entailment_classify_instruction) {
                return createEmptyExplanation() //createExplanation("Press help for more information.")
            }
            
            else if (task == entailment_highlight) {
                var description = ""
                if (label == "is_neutral") {
                    description =  "Highlight which part of the context stands neutral towards the statement, followed by the part of the statement that it corresponds to."
                } else if (label == "contradicts") {
                    description =  "Highlight which part of the context contradicts the statement, followed by the part of the statement that it contradicts."
                } else if (label == "entails") {
                    description =  "Highlight which part of the context the statement entails from, followed by the part of the statement that it entails."
                }
                return createTitle(
                    "Entailment Challenge",
                    description
                )
            } else if (task == entailment_highlight_instruction) {
                var instruction = ""
                if (label == "is_neutral") {
                    instruction =  "Highlight at least one part of the context that stands neutral towards the statement. Try to select the most important ones. Press finish when done."
                } else if (label == "contradicts") {
                    instruction =  "Try to highlight as many parts of the context and statement, but try to focus on the most important ones. Press finish when done."
                } else if (label == "entails") {
                    instruction =  "Try to highlight as many parts of the context and statement, but try to focus on the most important ones. Press finish when done."
                }
                return createExplanation(instruction)
            } else if (task == sentiment_classify) {
                return createTitle(
                    "Sentiment challenge",
                    "Is the sentiment behind the following text negative, neutral or positive?"
                )
            } else if (task == sentiment_classify_instruction) {
                return createEmptyExplanation(); //createExplanation("Please select the corresponding label. When in doubt, choose neutral.")
            } 
            
            else if (task == sentiment_highlight) {
                return  createTitle(
                    "Sentiment challenge",
                    "Please highlight all parts of the text that make the text ".concat(label + ".")
                )
            } else if (task == sentiment_highlight_instruction) {
                return null; //createExplanation("Follow these instructions carefully")
            }
        }
        return null
    }
}