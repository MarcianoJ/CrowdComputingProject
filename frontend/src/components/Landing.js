import React from 'react'
import {startNewGame} from "../utils/utils.js"

require('dotenv').config()


const Landing = (props) => {

    function handleNewGame() {
        startNewGame(props)
    }

    function handleNavigateSignup() {
        props.navigate('/signup')
    }
    return(
        <div className="container centered">
            <div >
                <h3>welcome to the robot game</h3>
                <p>press the button below to start a new game or create a new account to keep track of your score</p>

                <div className="landingButtons">
                    <button className="mt-5 btn btn-primary" onClick={handleNewGame}>start game</button>
                    <button className="mt-5 btn btn-primary" onClick={handleNavigateSignup}>Sign up</button>
                </div>
                

            </div>
        </div>
    )
}

export default Landing