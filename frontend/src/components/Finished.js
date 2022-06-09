import React from "react"
import {startNewGame} from "../utils/utils.js"

const Finished = (props) => {

    function handlePlayagain() {
        startNewGame(props)
    }

    return(
        <div>

            <div className="container distance">
                    <h1>Congratulations!</h1>
                    <h4>You have completed the game!</h4>
                    <h5>By helping us gather information about task explanations, you brought us one step closer to better explainable AI.</h5>
                    <h5>Thank you very much!</h5>
                    <button onClick={handlePlayagain} className="btn btn-primary">Play again</button>
            </div>

        </div>
    )
}

export default Finished