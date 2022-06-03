import React from 'react'
import axios from 'axios';
import uuid from 'react-uuid'
require('dotenv').config()

const Landing = (props) => {

    function handleClick() {
        axios.get(process.env.REACT_APP_BASE_URL + "/api/v1/users")
        .then(response => {
            //TODO: get sentences form api.
            var sentences = ["my fist sentence", "my second sentence"]
            var gameid = uuid()
            props.navigate(`/label/${gameid}`, {state:{
                sentences: sentences,
                sentenceIndex: 0
            }})

        })
        .catch(err => {
            console.log(err)
        })

    }
    return(
        <div>
            <button onClick={handleClick}>start game</button>
        </div>
    )
}

export default Landing