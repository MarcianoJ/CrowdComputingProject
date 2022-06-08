import React from "react"
import {startNewGame} from "../utils/utils.js"

const Finished = (props) => {

    function handlePlayagain() {
        startNewGame(props)
    }

    return(
        <div>

            <div className="container distance">
                    <h3>Congratulations!</h3>
                    <p>you have completed the game!</p>
                    <button onClick={handlePlayagain} className="btn btn-primary">play again</button>
            </div>

        </div>
    )
}

export default Finished