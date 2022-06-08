import React, { useContext} from 'react'
import UserContext from './User';
import { useCookies } from 'react-cookie';

export const no_task = 0
export const entailment_classify = 1
export const entailment_highlight = 2
export const sentiment_classify = 3
export const sentiment_highlight = 4

export default function TaskTitle(props) {
    const userContext = useContext(UserContext);
    const [cookies, setCookie, removeCookie] = useCookies();
    
    var task = props.task
    var showTitle = task && task != no_task

    return (
        showTitle ? 
            <div class="container justify-content-center">
                <h4>{ getTitle(task) }</h4>
            </div>
            : null
        )

    // todo: if takes too long: show hint to press help.

    function getTitle (task) {
        if (task && task != no_task) {
            if (task == entailment_classify) {
                return <div>
                    <h1>Entailment Challenge</h1>
                    <h3>Please indicate whether the second statement is entails, contradicts, or is neutral towards the first statement.</h3>
                </div>
            } else if (task == entailment_highlight) {
            return <div>
                    <h2>Entailment Challenge</h2>
                    <p>Please select words from the first label and second label that made you select the classification.</p>
                </div>
            } else if (task == sentiment_classify) {
                return <div>
                <h2>Sentiment challenge</h2>
                <p>Please select words from the first label and second label that made you select the classification.</p>
            </div>
            } else if (task == sentiment_highlight) {
                return <div>
                <h2>Sentiment challenge</h2>
                <p>Please highlight the words that explains you choice of class.</p>
            </div>
            }
        return null
        }
    }
}