import axios from 'axios';
import uuid from 'react-uuid'

export function startNewGame(props, userContext, cookies, setCookie) {
    if(cookies.token == null){
        signupAnonymous(props, userContext, cookies, setCookie).then((token)=>{
            _startGame(props, userContext, token, setCookie)
        })
    }
    else{
        _startGame(props, userContext, cookies.token, setCookie)
    } 
}

function _startGame(props, userContext, token, setCookie) {
    if(Math.random() >= 0.5)
        _startEntailmentGame(props, userContext, token, setCookie)
    else
        _startSentimentGame(props, userContext, token, setCookie)
}


function _startEntailmentGame(props, userContext, token, setCookie){
    var sentiment_input = []
    var ids = []
     getRandomTaks(token, 'textual_entailment').then(taskResponse =>{
        console.log(taskResponse)
        if(taskResponse.id === undefined)
            return props.navigate("/",{state: {refresh:true}} )
        getAllSentences(token,taskResponse.id).then(sentenceResponse =>{
            console.log(sentenceResponse.unfinished_data_point_count)
            if(sentenceResponse.unfinished_data_point_count == 0)
                return props.navigate("/",{state: {refresh:true}} )
            for(const datapoint of sentenceResponse.unfinished_data_points){
                var id = datapoint.id
                ids.push(id)
                sentiment_input.push([datapoint.input, datapoint.input2])
            }
            console.log(sentiment_input)
            props.navigate(`entailment/label/${uuid()}`, {state:{
                sentences: sentiment_input,
                sentenceIndex: 0,
                ids:ids,
                task_id: taskResponse.id
            }})
            
        })
        
    })
}

function _startSentimentGame(props, userContext, token, setCookie) {
    var sentiment_input = []
    var ids = []
     getRandomTaks(token, 'sentiment_analysis').then(taskResponse =>{
        console.log(taskResponse)
        getAllSentences(token,taskResponse.id).then(sentenceResponse =>{
            if(sentenceResponse.unfinished_data_point_count == 0)
                return props.navigate("/",{state: {refresh:true}} )
            for(const datapoint of sentenceResponse.unfinished_data_points){
                var id = datapoint.id
                ids.push(id)
                sentiment_input.push(datapoint.input)
            }
            props.navigate(`sentiment/label/${uuid()}`, {state:{
                sentences: sentiment_input,
                sentenceIndex: 0,
                ids:ids,
                task_id: taskResponse.task_id
            }})
            
        })
        
    })
}

export function handleSignup(props, userContext, cookies, setCookie) {
    document.getElementById("email_error").innerHTML = ""
    document.getElementById("password_error").innerHTML = ""
    document.getElementById("user_success").innerHTML = ""
    document.getElementById("user_error").innerHTML = ""

    var username = document.getElementById('username').value
    var password = document.getElementById('password').value
    axios.post(process.env.REACT_APP_BASE_URL + "/api/v1/users", {
        "email": username,
        "password": password
    })
    .then(response => {
        setCookie('token', response.data.token);
        setCookie('anonymous',false);
        setCookie('id', response.data.id);
    })
    .catch(err => {   
        var errors = err.response.data.errors
        for(const key in errors){
            document.getElementById(key+"_error").innerHTML = key + " " +errors[key][0]
        }
    })
}


export function handleLogin(props, userContext, cookies, setCookie) {
    document.getElementById("user_success").innerHTML = ""
    document.getElementById("user_error").innerHTML = ""

    var username = document.getElementById('username').value
    var password = document.getElementById('password').value
    axios.post(process.env.REACT_APP_BASE_URL + "/api/v1/sessions", {
        "email": username,
        "password": password
    })
    .then(response => {
        setCookie('token', response.data.token);
        setCookie('anonymous',false);
        setCookie('id', response.data.id);
        userContext.setUser(cookies.token ? {token: cookies.token} : null)
        props.navigate("/" , {state: {refresh:true}})
        

    })
    .catch(err => {   
        var errors = err.response.data.errors
        for(const key in errors){
            document.getElementById("user_error").innerHTML = errors[0]
        }

    })
}


async function signupAnonymous(props, userContext, cookies, setCookie){
    return await axios.post(process.env.REACT_APP_BASE_URL + "/api/v1/sessions", {
        "email": "anonymous",
        "password": ""
    })
    .then(response => {
        setCookie('token', response.data.token);
        setCookie('anonymous',true);
        setCookie('id', response.data.id);

        userContext.setUser(cookies.token ? {token: cookies.token} : null)
        return response.data.token
    })
    .catch(err => {   
        console.log(err)
        return
    })
}


async function getAllSentences(token,task_set_id ) {
      var config = {
        method: 'get',
        url: process.env.REACT_APP_BASE_URL+'/api/v1/unfinished_data_points',
        params: {
            token:token, 
            task_set_id:task_set_id
        }
      };
      return await axios(config)
      .then(function (response) {
        console.log(response)
        return response.data
      })
      .catch(function (error) {
        console.log(error);
      });
}


async function getRandomTaks(token, task_name){
    var config = {
        method: 'get',
        url: process.env.REACT_APP_BASE_URL+'/api/v1/random_task_set',
        params: {
            token: token, 
            nlp_kind : task_name
        }
    };
    return await axios(config)
    .then(async function (response) {
        return response.data;
    })
    .catch(function (error) {
        console.log(error)
    });
}


async function getSentence(token, task_set_id,data_point_id){
var config = {
  method: 'get',
  url: process.env.REACT_APP_BASE_URL+'/api/v1/next_data_point',
  params : {
    token: token,
    task_set_id: task_set_id,
    data_point_id:data_point_id
  }
};

return await axios(config)
.then(function (response) {
  return response.data;
})
.catch(function (error) {
    console.log(error)
});

}


export function publishBatchResults(token, task_results){
    var axios = require('axios');
    var data = {
    "token": token,
    "task_results": task_results
    };

    var config = {
    method: 'post',
    url: process.env.REACT_APP_BASE_URL+'/api/v1/batch_task_results',
    data : data
    };

    axios(config)
    .then(function (response) {
        console.log(response)
    })
    .catch(function (error) {
        console.log(error);
    });

}


// function getRandomSentimentTaks(){
//     axios.get(process.env.REACT_APP_BASE_URL + "/api/v1/next_data_point")
//     .then(response => {
//         //TODO: get sentences form api.
//         var sentences = ["Had he known what was going to happen, he would have never stepped into the shower.", "he would have never stepped into the shower"]
//         var gameid = uuid()
//         props.navigate(`sentiment/label/${gameid}`, {state:{
//             sentences: sentences,
//             sentenceIndex: 0
//         }})
//     })
//     .catch(err => {      
//         var sentences = ["Had he known what was going to happen, he would have never stepped into the shower.", "he would have never stepped into the shower"]
//         var gameid = uuid()
//         props.navigate(`sentiment/label/${gameid}`, {state:{
//             sentences: sentences,
//             sentenceIndex: 0
//         }})
//     })
// }

