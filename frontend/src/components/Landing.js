import React, {useContext} from 'react'
import {startNewGame} from "../utils/utils.js"
import UserContext from '../components/User';
import {useLocation} from 'react-router-dom';

import alien from '../images/alien.jpeg'
import bob from '../images/Bob with nametag.jpg'

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
            <div class="container">
                <div class="row">
                    <h1>Bob: The Alien Translator Robot</h1>
                    <h3>Team up with Bob and save the earth!</h3>
                </div>
                <br/>
                <br/>
                <div class="row">
                    <h4>The story of Bob</h4>
                    <div class="col-2">
                        <img class="w-100" src={bob} alt="Bob"/>
                    </div>
                    
                    <div class="col-10 text-justify ">
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
                <div class="row">
                    <div class="col-10">
                        <h4>Our Mission</h4>
                        <p class="text-justify">
                            With the rise of artificial intelligence systems, many real-life decisions are being made by machine learning algorithms.
                            Examples are self-driving cars, the youtube recommendation system, and, just like Bob, automatic translation systems.
                            The weird thing is that these algorithms are very complicated and we often have no idea how these machines come to their decisions. <br/>
                            We believe this should change! By learning these algorithms how to explain how they came to their decision, we believe we can fix this problem.
                            But to do so, we need data. A lot of data. By playing our game, you will automatically generate data that we need for learning these algorithms how to explain themselves.
                            So by helping Bob, you are helping us in our quest towards better explainable AI. So thank you!
                        </p>
                    </div>
                    <div class="col-2">
                        <img class="w-100" src={alien} alt="Alien"/>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12">
                        <h4>Press the button to start the game.</h4>
                        <p>
                            Read the instructions carefully and help Bob translate the alien language. <br/>
                            Press the help for more information when anything is unclear. <br/>
                            Good luck!
                        </p>
                        <button className="btn btn-primary" onClick={handleNewGame}>Start game</button>
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default Landing