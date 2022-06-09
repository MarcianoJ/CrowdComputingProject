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
                <h3>Congratulations!</h3>
                <p>you have completed the game!</p>
                <button className="mt-5 btn btn-primary main-button" onClick={handlePlayagain}>
                {!isLoading ? 
                    (<span>play again</span>)
                    :
                    (<div class="spinner-border text-light" role="status"><span class="sr-only"></span></div>)
                }
                </button>
            </div>

        </div>
    )
}

export default Finished