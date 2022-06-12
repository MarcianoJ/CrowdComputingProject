import React from 'react'

export const no_instruction = 0
export const instruction_sentiment_analysis = 1
export const instruction_entailment = 2

export default function Instructions(props) {

    const [showInstructions, setShowInstructions] = React.useState(false)
    
    var instruction = props.instruction
    var enableInstructions = instruction && instruction != no_instruction

    if (enableInstructions) {
        return (
            <div>
                <button className={showInstructions ? "btn instruction-button-open btn-outline-primary footer-btn-right" : "btn instruction-button-open btn-primary footer-btn-right"} onClick={() => { setShowInstructions(!showInstructions); }}> Help </button>
                { showInstructions ? (
                    <div className="instruction-container"> 
                        { getInstructions(props.instruction) }
                        <button className="btn btn-danger exit footer-btn-right" onClick={() => { setShowInstructions(false); }}> X </button>
                    </div>
                ) : null }
            </div>
        )
    } else {
        return <div>hidden</div>
    }


    function getInstructions(instructions) {
        if (instructions) {
            if (instructions == instruction_sentiment_analysis) {
                return getSentimentInstructions();
            } else if (instructions == instruction_entailment) {
                return getEntailmentInstructions();
            }
        } 
        return null;


        function getSentimentInstructions() {
            return (<div className="instructions container">

                <div className="row">
                    <h1>Sentiment Challenge</h1> <br/>
                    <p>The Sentiment Challenge is divided into two parts: sentiment determination and sentiment highlighting. The first part, sentiment determination, requires you to determine and select the underlying sentiment behind the provided text. The second part, sentiment highlighting, requires you to highlight all words that explain you choice of sentiment. We discuss both parts individually.</p>
                    <h2>1) Sentiment Determination</h2>
                    <p>
                        Determine whether the sentiment behind the provided text is positive, negative or neutral.<br/>
                        Read the sentence, determine the underlying sentiment and click the button that corresponds with your choice. <br/>
                        Examples of positive, negative and neutral sentences can be found in the table below.<br/>
                        If a sentence contains both positive or negative elements, pick the one which in your opinion mostly dominates the sentiment of the sentence.<br/>
                        When you do not know which sentiment to choose, or when the task is broken, press 'I don't know' to skip the task. <br/>
                    </p>
                </div>
                <div className="row justify-content-center">
                    <div className="col-8 text-start">
                        <table className="table  text-start">
                            <tr>
                                <th scope="col">Sentence</th>
                                <th scope="col">Expected sentiment (part 1)</th>
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
                            <tr>
                                <td>The man was walking through the super market.</td>
                                <td>Neutral</td>
                            </tr>
                            <tr>
                                <td>The beautiful bicycle was stored in a dark stinky cellar.</td>
                                <td>Both positive or negative, the negative sentiment dominates.</td>
                            </tr>
                        </table> 
                    </div>
                </div>
                <div className="pt-2 row">
                    <h2>2) Sentiment Highlighting</h2>
                    <p>
                        The second part of the sentiment challenge requires you to highlight all words that explain your choice for the selected sentiment. We illustrate how to perform the task with the following four examples from the table above.<br/>
                    </p>

                    <p>
                        <b>Example 1 - negative</b> <br/>
                        <i>I find chess a <mark className="yellow">very boring</mark> game</i> <br/>
                        After determining the sentence has a negative sentiment in the first part of the challenge, you will have to highlight all words that make the sentence negative and that explain your choice of a 'negative' sentiment.
                        In this example you will have to highlight the words <i>very</i> and <i>boring</i>. 
                    </p>
                    
                    <p>
                        <b>Example 2 - positive</b> <br/>
                        <i>I <mark className="yellow">like </mark>hiking through the mountains.</i> <br/>
                        The same goes for this example, only then you will have to highlight all words in the sentence that make the sentence positive. This will be the word "like".
                    </p>

                    <p>
                        <b>Example 3 - neutral</b> <br/>
                        <i>The man <mark className="yellow">was walking</mark> through the super market.</i> <br/>
                        Selecting words that make the sentence 'neutral' can be a bit tricky, since all words of the sentence can be seen as neutral words.
                        Because of this you are required to only select words that you feel contributed <b>mostly</b> towards your determination of a neutral sentiment. Select at least one word that contributed. In this case we highlight the words  <i>was</i> and <i>walking</i>
                    </p>

                    <p>
                        <b>Example 4 - both positive and negative</b> <br/>
                        <i>The beautiful bicycle was stored in a <mark className="yellow">dark stinky</mark> cellar.</i> <br/>
                        This sentence contains both positive and negative elements. As explained in the table above, in this sentence we determine that the negative sentiment dominates the positive sentiment, choosing the 'negative' label as sentiment.
                        In this challenge, you now only have to highlight the negative words in sentence, being <i>dark</i> and <i>stinky</i>. 
                    </p>

                    <p>
                        Highlighting is done by pressing on a word and dragging the mouse over it. The selected words are automatically shown underneath the sentence. Here you can review them and delete them when wrongfully selected. 
                        For ease of use, it is possible to select multiple words at the same time. This is handled in the same way as if the words are selected individually. So, for the example above, the selection of "very boring" and "very" "boring" is the same.
                        When you do not know which words to highlight, or when the task is broken, press 'I don't know' to skip the task. <br/>
                    </p>
                </div>
            </div>)
        }

        function getEntailmentInstructions() {
            return (<div className="instructions container">
                <h1>Entailment Instruction</h1> <br/>
                <p>
                    Entailment is the relationship between two sentences where the truth of one (the statement) requires the truth of the other (the context). 
                    For example, the sentence "I am walking through the forrest" entails "There are a lot of trees here.". In this challenge we call the first sentence the context and the second sentence the statement. 
                    For this task you will first determine whether the statements entails from (follows from), contradicts or stands neutral towards the context. After determining this, you will be asked to highlight which part of the context relates to which part of the statement.
                </p>
                <h2>1) Entailment Determination</h2>
                <p>
                    The goal of this sub-task is to determine whether the statement entails from (follows from), stands neutral towards (is not related to) or contradicts the context. <br/>
                    Read the sentence, determining the label and click the button that corresponds with your choice. <br/>
                    Examples of the different classes can be found in the table below. <br/>
                    When you do not know which label to choose, or when the task is broken, press 'I don't know' to skip the task. <br/>
                </p>
                <div className="row justify-content-center">
                    <div className="col-10 text-start">
                        <table className="table  text-start">
                            <tr>
                                <th scope="col">Context</th>
                                <th scope="col">Statement</th>
                                <th scope="col">Expected label (part 1)</th>
                            </tr>
                            <tr>
                                <td>My bicycle was stolen today</td>
                                <td>I cannot cycle to work</td>
                                <td>Entails, because I do not have a bike to cycle with.</td>
                            </tr>
                            <tr>
                                <td>A man is holding a stick</td>
                                <td>A man is standing there empty handed</td>
                                <td>Contradicts, the man is not empty handed because he is holding a stick.</td>
                            </tr>
                            <tr>
                                <td>The man was walking through the super market.</td>
                                <td>I just saw a squirrel </td>
                                <td>Neutral, the statement does not relate to the context</td>
                            </tr>
                        </table> 
                    </div>
                </div>

                <h2>2) Entailment Highlighting</h2>
                <p>
                    The second part of the sentiment challenge requires you to highlight which parts of the context relate to which part of the statement. First highlight a part of the context and then highlight the part of the statement it relates to. Repeat this until all important parts are highlighted.
                    We will further explain how this should be done for each of the three examples of the table above
                </p>
                <p>
                    <b>Example 1 - entails</b> <br/>
                    Context: <i>My <mark className="yellow">bicycle</mark>  <mark className="red">was stolen</mark> today</i> <br/>
                    Statement: <i>I  <mark className="red">cannot <mark className="yellow">cycle</mark></mark> to work</i><br/>
                    Search for parts of the context and the statement that entail from each other. In this example this is "bicycle" and "cycle", and "was stolen" and "cannot cycle". 
                    To select these parts, first highlight "bicycle" in the context, and then highlight "cycle". Then repeat this for "was stolen" and "cannot cycle"
                </p>
                <p>
                    <b>Example 2 - contradiction</b> <br/>
                    Context: <i>A man is <mark className="yellow">holding a stick</mark></i> <br/>
                    Statement: <i>A man is standing there  <mark className="yellow">empty handed</mark></i> <br/>
                    Search for parts of the context and the statement that contradict each other. In this example this is "holding a stick" and "empty handed". 
                    To select these parts, first highlight "holding a stick" in the context and then highlight "empty handed" in the statement.
                    Try to select all the parts that are most important for explaining the entailment.
                </p>
                <p>
                    <b>Example 3 - neutral</b> <br/>
                    Context: <i><mark className="yellow">The man</mark> was walking through the <mark className="red">super market</mark>.</i> <br/>
                    Statement: <i><mark className="yellow">I</mark> just saw a <mark className="red">squirrel</mark></i><br/>
                    For the neutral label, it is a bit more tricky because any part of the context and statement can be seen as non-relatable.
                    Because of this, you should try to select the most important parts of the context and the statement that make the context and statement non-relatable. Your choice should reflect your thought process when choosing the neutral label.
                    Aim at selecting at least one part of both the context and the statement.  In this case we choose "supermarket" and "squirrel", and "The man" and "I", since they are both two important parts that make the sentences non-relatable.
                    "supermarket" and squirrel are chosen because they are important part of both sentences and are non-relevant. In addition, "The man" and "I" are chosen because the fact that both sentences concern a different subject, contributes to both sentences being non-relatable.
                </p>
                <p>
                    The two parts are highlighted by first selecting a group of words in the context, and then selecting a group of words in the statement.
                    To highlight, click on a word and mouse over while holding the button. The selected words are automatically shown underneath the text. Here you can review them and delete them when wrongfully selected. 
                    When you do not know which words to highlight, or when the task is broken, press 'I don't know' to skip the task. <br/>
                </p>
            </div>);
        }
    }
}