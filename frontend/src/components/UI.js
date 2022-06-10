import React from "react";

import alien from '../images/alien.png'
import robot from '../images/robot.png'
import background from '../images/background.jpeg'
import axios from "axios";
import { useCookies } from 'react-cookie';

export default function UI(props){

    const [cookies, setCookie, removeCookie] = useCookies();

    let story_id = cookies.story_id;
    if (story_id === null)
        story_id = 1
    let comment_number = cookies.alien_comment;
    if (comment_number === null)
        comment_number = 1

    axios.get(process.env.REACT_APP_BASE_URL + "/api/v1/next_alien_comment",{
        "token": cookies.token,
        "alien_story_id": story_id,
        "alien_comment": comment_number
    })
        .then(response => {
            const sentence = response.data.translated.substring(0, props.index * 2);
            const sentenceScrambled = response.data.untranslated.substring(props.index * 2);
            const robot_sentence = response.data.robot_response;
            if (sentenceScrambled === '')
                setCookie("alien_comment", comment_number+1)

            return(
                <div className="d-flex justify-content-center mt-5" style={{
                    backgroundImage: `url(${background})`,
                    height:"70vh"
                }}>
                    <div>
                        <img src={alien} alt="Alien" width="300" />
                    </div>
                    <div className="">
                        <div className="box sb-1">
                            <p>{robot_sentence}</p>
                        </div>
                        <div className="box sb-2">
                            <p>{sentence+sentenceScrambled}</p>
                        </div>
                    </div>


                    <div className="container">
                        <img src={robot} alt="Robot" width="300" />
                        <div style={{fontFamily: 'Brush Script MT'}} className="text centered">{parseInt(props.index/35*100)}%</div>
                    </div>


                </div>
            )
        })
        .catch(err => {
            console.log(err);
        })


}