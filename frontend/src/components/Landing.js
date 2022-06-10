import React, {useContext, useState} from 'react'
import {startNewGame} from "../utils/utils.js"
import UserContext from '../components/User';
import {useLocation} from 'react-router-dom';
import { useCookies } from 'react-cookie';

import alien from '../images/alien.jpeg'
import bob from '../images/Bob with nametag.jpg'

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
        <div className="container mt-2 mb-5">
            <div className="container">
                <div className="row">
                    <h1>Bob: The Alien Translator Robot</h1>
                    <h3>Team up with Bob and save the earth!</h3>

                </div>
                <br/>
                <br/>
                <div className="row">
                    <h4>The story of Bob</h4>
                    <div className="col-2">
                        <img className="w-100" src={bob} alt="Bob"/>
                    </div>
                    
                    <div className="col-10 text-justify ">
                        <p>
                            Bob is just a regular robot like you and me: he likes the beach, he likes coffee in the morning and, most of all, enjoys his free paycheck from the government for being their official 'Alien Translator Robot'. 
                            Because aliens do not exit right? <br/>
                            Well, they do and they have come to destroy the earth! Team up with Bob and safe earth from total destruction by negotiating with the aliens and finding out what they want.
                            But before that is possible, Bob's algorithm needs some help translating the complicated alien language. 
                            Complete the tasks provided by Bob and help him figure out what the aliens want. You and Bob are earths last hope!
                        </p>
                    </div>
                </div>
                <br/>
                <div className="row">
                    <div className="col-10">
                        <h4>Our Mission</h4>
                        <p className="text-justify">
                            With the rise of artificial intelligence systems, many real-life decisions are being made by machine learning algorithms.
                            Examples are self-driving cars, the youtube recommendation system, and, just like Bob, automatic translation systems.
                            The weird thing is that these algorithms are very complicated and we often have no idea how these machines come to their decisions. <br/>
                            We believe this should change! By learning these algorithms how to explain how they came to their decision, we believe we can fix this problem.
                            But to do so, we need data. A lot of data. By playing our game, you will automatically generate data that we need for learning these algorithms how to explain themselves.
                            So by helping Bob, you are helping us in our quest towards better explainable AI. So thank you!
                        </p>
                    </div>
                    <div className="col-2">
                        <img className="w-100" src={alien} alt="Alien"/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <h4>Press the button to start the game</h4>
                        <p>
                            Read the instructions carefully and help Bob translate the alien language. <br/>
                            Press the help for more information when anything is unclear. <br/>
                            Good luck!
                        </p>
                        <div className="landingButtons">
                        <button className="btn btn-primary main-button" onClick={handleNewGame}>
                        {!isLoading ? 
                            (<span>Start Game</span>)
                            :
                            (<div className="spinner-border text-light" role="status"><span className="sr-only"></span></div>)
                        }
                        </button>                    
                    </div>
                </div>
            </div>
        </div>
    </div>)
}

export default Landing