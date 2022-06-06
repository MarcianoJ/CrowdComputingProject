import React, {useContext} from 'react'
import {startNewGame} from "../utils/utils.js"
import UserContext from '../components/User';
import {useLocation} from 'react-router-dom';

require('dotenv').config()


const Landing = (props) => {
    const userContext = useContext(UserContext);
    const location = useLocation();
    
    if(location.state != null && location.state.refresh){
        window.location.reload(true);
        props.navigate("/")
    }


    function handleNewGame() {
        startNewGame(props)
    }

    function handleNavigateSignup() {
        props.navigate('/signup')
    }
    return(
        <div className="container distance">
            <div >
                <h3>welcome to the robot game</h3>
                <p>press the button below to start a new game or create a new account to keep track of your score</p>
                <div className="landingButtons">
                    <button className="mt-5 btn btn-primary" onClick={handleNewGame}>start game</button>
                </div>
            </div>
        </div>
    )
}

export default Landing