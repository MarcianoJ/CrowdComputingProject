import React, {useContext, useState} from 'react'
import {startNewGame} from "../utils/utils.js"
import UserContext from '../components/User';
import {useLocation} from 'react-router-dom';
import { useCookies } from 'react-cookie';

require('dotenv').config()


const Landing = (props) => {
    const userContext = useContext(UserContext);
    const location = useLocation();
    const [cookies, setCookie, removeCookie] = useCookies();
    const [isLoading, setIsLoading] = useState(false)

    //reload once if required
    if(location.state != null && location.state.refresh){
        window.location.reload(true);
        props.navigate("/")
    }


    function handleNewGame() {
        if(!isLoading){
            setIsLoading(true)
            startNewGame(props, userContext, cookies, setCookie)
        }
    }

    return(
        <div className="container distance">
            <div >
                <h3>welcome to the robot game</h3>
                <p>press the button below to start a new game</p>
                <div className="landingButtons">
                <button className="mt-5 btn btn-primary main-button" onClick={handleNewGame}>
                {!isLoading ? 
                    (<span>start game</span>)
                    :
                    (<div className="spinner-border text-light" role="status"><span className="sr-only"></span></div>)
                }
                </button>
                </div>
            </div>
        </div>
    )
}

export default Landing