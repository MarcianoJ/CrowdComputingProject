import React, {useContext, useState}  from "react"
import {startNewGame} from "../utils/utils.js"
import UserContext from '../components/User';
import { useCookies } from 'react-cookie';

const Finished = (props) => {
    const userContext = useContext(UserContext);
    const [cookies, setCookie, removeCookie] = useCookies();
    const [isLoading, setIsLoading] = useState(false)

    const formlink = "https://docs.google.com/forms/d/e/1FAIpQLSfgO1bNkmnK7Joe8SNi9t2MQiDWfXYqAXcF6f5YbKjCf6egzg/viewform?usp=sf_link"
    function handlePlayagain() {
        if(!isLoading) {
            setIsLoading(true)
            startNewGame(props,userContext,cookies, setCookie)
        }
    }

    return(
        <div>
            <div className="container distance">
                <h1>Congratulations!</h1>
                <h4>You have completed the game!</h4>
                <h5>By helping us gather information about task explanations, you brought us one step closer to better explainable AI.</h5>
                <h5>Thank you very much!</h5>
                {
                    formlink == "" 
                    ? "" 
                    : <h5>Help us further improve the game by filling in the following <a target="_blank" href="https://docs.google.com/forms/d/e/1FAIpQLSfgO1bNkmnK7Joe8SNi9t2MQiDWfXYqAXcF6f5YbKjCf6egzg/viewform?usp=sf_link">form</a>.</h5>
                }
                <button className="mt-3 btn btn-primary main-button" onClick={handlePlayagain}>
                {!isLoading ? 
                    (<span>Play again</span>)
                    :
                    (<div class="spinner-border text-light" role="status"><span class="sr-only"></span></div>)
                }
                </button>
            </div>
        </div>
    )
}

export default Finished