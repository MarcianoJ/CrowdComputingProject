import axios from 'axios';
import uuid from 'react-uuid'

export function startNewGame(props) {
    console.log('Starting new game')
    axios.get(process.env.REACT_APP_BASE_URL + "/api/v1/users")
    .then(response => {
        //TODO: get sentences form api.
        var sentences = ["Had he known what was going to happen, he would have never stepped into the shower."]
        var gameid = uuid()
        props.navigate(`/label/${gameid}`, {state:{
            sentences: sentences,
            sentenceIndex: 0
        }})
    })
    .catch(err => {      
        console.log(err)
        var sentences = ["Had he known what was going to happen, he would have never stepped into the shower."]
        var gameid = uuid()
        props.navigate(`/label/${gameid}`, {state:{
            sentences: sentences,
            sentenceIndex: 0
        }})
    })
}