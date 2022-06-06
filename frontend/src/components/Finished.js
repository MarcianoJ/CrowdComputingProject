import React from "react"
import {startNewGame} from "../utils/utils.js"

const Finished = (props) => {

    function handlePlayagain() {
        console.log("paly again")
        startNewGame(props)
    }

    return(
        <div>

            <div className="container centered">
                    <h3>Congratulations!</h3>
                    <p>you have completed the game!</p>
                    <button onClick={handlePlayagain} className="btn btn-primary">play again</button>
            </div>

        </div>
    )
}

export default Finished