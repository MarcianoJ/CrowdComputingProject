import React, {useContext, useState}  from "react"
import {startNewGame} from "../utils/utils.js"
import UserContext from '../components/User';
import { useCookies } from 'react-cookie';

const Finished = (props) => {
    const userContext = useContext(UserContext);
    const [cookies, setCookie, removeCookie] = useCookies();
    const [isLoading, setIsLoading] = useState(false)

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