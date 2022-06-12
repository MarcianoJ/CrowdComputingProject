import React,{ useState, useEffect } from "react";
import alien from '../images/alien.jpeg'
import robot from '../images/robot.jpeg'
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { useLocation, useParams } from "react-router-dom";


export default function UI(props){
    const [cookies, setCookie, removeCookie] = useCookies();
    const [sentenceClear, setsentenceClear] = useState("");
    const [sentenceClearPartial, setSentenceClearPartial] = useState("")
    const [robotResponse, setRobotResponse] = useState("")
    const { gameid } = useParams()
    if(cookies.story_id == undefined || cookies.story_id == 8)
        setCookie('story_id', 0)

    useEffect(() =>{
        var div = (Math.ceil(sentenceClear.length/props.sentencesLength))
        var counter = 0
        for(let i = 0; i<sentenceClear.length; i++){
            if (counter-1 == props.index){
                setSentenceClearPartial(sentenceClear.substring(0, i))
            }
            if (i%div == 0){
                counter++
            }
        }

        var config = {
            method: 'get',
            url: process.env.REACT_APP_BASE_URL + "/api/v1/next_alien_comment",
            
            params : {
                token: cookies.token,
                alien_story_id: 1,
                alien_comment_id:cookies.story_id
            }};
    
            axios(config)
            .then(function (response) {
                setsentenceClear(response.data.translated)
                if(response.data.robot_response != robotResponse)
                    setRobotResponse(response.data.robot_response)
            })
            .catch(function (error) {
            console.log(error);
            });
        
    }, [sentenceClearPartial, sentenceClear])


    const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    function generateString(length) {
        let result = ' ';
        const charactersLength = characters.length;
        for ( let i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
    
        return result;
    }
    
    return(
        <div className="container ui-container mt-5">
            <div className="image-div container">
                <img src={alien} alt="Alien"  />
            </div>
            <div className="sentences container">
                <div className="box mb-3">
                    <p>{sentenceClearPartial.concat(generateString(sentenceClear.length - sentenceClearPartial.length - 1))}</p>
                </div>
                <div className="box">
                {(props.index == props.sentencesLength-1) ? <p>{robotResponse}</p> : <p></p>}
                    <p></p>
                </div>
            </div>
            <div style={{fontFamily: 'Brush Script MT'}} className="d-flex justify-content-center text">
                <p>{parseInt((props.index/(props.sentencesLength-1))*100)}%</p>
            </div>
            <div className="image-div container">
                <img src={robot} alt="Robot" />
            </div>
        </div>
    )

}

