import axios from 'axios';
import uuid from 'react-uuid'
import UserContext from '../components/User';

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


export function handleSignup(props, userContext, cookies, setCookie) {
    document.getElementById("email_error").innerHTML = ""
    document.getElementById("password_error").innerHTML = ""
    document.getElementById("user_success").innerHTML = ""
    document.getElementById("user_error").innerHTML = ""

    console.log(userContext)
    var username = document.getElementById('username').value
    var password = document.getElementById('password').value
    axios.post(process.env.REACT_APP_BASE_URL + "/api/v1/users", {
        "email": username,
        "password": password
    })
    .then(response => {
        console.log(response.data)
        setCookie('token', response.data.token);
        userContext.setUser(cookies.token ? {token: cookies.token} : null)
        props.navigate("/", {state: {refresh:true}})
    })
    .catch(err => {   
        var errors = err.response.data.errors
        for(const key in errors){
            document.getElementById(key+"_error").innerHTML = key + " " +errors[key][0]
        }
    })
}


export function handleLogin(props, userContext, cookies, setCookie) {
    console.log(userContext != null)

    document.getElementById("user_success").innerHTML = ""
    document.getElementById("user_error").innerHTML = ""

    var username = document.getElementById('username').value
    var password = document.getElementById('password').value
    axios.post(process.env.REACT_APP_BASE_URL + "/api/v1/sessions", {
        "email": username,
        "password": password
    })
    .then(response => {
        console.log(response.data)
        console.log(UserContext)
        setCookie('token', response.data.token);
        userContext.setUser(cookies.token ? {token: cookies.token} : null)
        props.navigate("/" , {state: {refresh:true}})
        

    })
    .catch(err => {   
        console.log(err)
        var errors = err.response.data.errors
        for(const key in errors){
            document.getElementById("user_error").innerHTML = errors[0]
        }

    })
}

