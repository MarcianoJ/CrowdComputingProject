import axios from 'axios';
import uuid from 'react-uuid'

export function startNewGame(props, userContext, cookies, setCookie) {
    if(userContext.user == null)
        signupAnonymous(props, userContext, cookies, setCookie)

    //START AN SENTIMENT TASK
    if(Math.random() >= 0.5){
        var sentiment_input = []
        var ids = []
         getRandomSentimentTaks(cookies.token).then(taskResponse =>{
            for (var counter = 0; counter <= taskResponse.data_point_count; counter++){
                getSentence(cookies.token,taskResponse.id, counter).then(sentenceResponse =>{
                    sentiment_input.push(sentenceResponse.input)
                    ids.push(sentenceResponse.id)
                    if (sentiment_input.length == taskResponse.data_point_count){
                        props.navigate(`sentiment/label/${uuid()}`, {state:{
                                     sentences: sentiment_input,
                                     sentenceIndex: 0,
                                     ids:ids,
                                     task_id: taskResponse.task_id
                                 }})
                    }
                })
            }
            
        })
        return
    }
    //START AN ENTAILMENT TASK 
    else{
        props.navigate("/" , {state: {refresh:true}})
        return
    //     axios.get(process.env.REACT_APP_BASE_URL + "/api/v1/users")
    // .then(response => {
    //     //TODO: get sentences form api.
    //     var sentences = [["An adult dressed in black holds a stick.", " An adult is walking away, empty-handed"],["A child in a yellow plastic safety swing is laughing as a dark-haired woman in pink and coral pants stands behind her", "A young mother is playing with her daughter in a swing."] ]
    //     var gameid = uuid()
    //     props.navigate(`entailment/label/${gameid}`, {state:{
    //         sentences: sentences,
    //         sentenceIndex: 0
    //     }})
    // })
    // .catch(err => {      
    //     var sentences = [["An adult dressed in black holds a stick.", " An adult is walking away, empty-handed"],["A child in a yellow plastic safety swing is laughing as a dark-haired woman in pink and coral pants stands behind her", "A young mother is playing with her daughter in a swing."] ]
    //     var gameid = uuid()
    //     props.navigate(`entailment/label/${gameid}`, {state:{
    //         sentences: sentences,
    //         sentenceIndex: 0
    //     }})
    // })
    }

    
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


function signupAnonymous(props, userContext, cookies, setCookie){
    axios.post(process.env.REACT_APP_BASE_URL + "/api/v1/sessions", {
        "email": "anonymous",
        "password": ""
    })
    .then(response => {
        console.log("new anonymous user created")
        setCookie('token', response.data.token);
        setCookie('anonymous',true);
        setCookie('id', response.data.id);
        userContext.setUser(cookies.token ? {token: cookies.token} : null)
        props.navigate.reload()
    })
    .catch(err => {   
        console.log(err)
    })
}



async function getRandomSentimentTaks(token){
    var config = {
        method: 'get',
        url: process.env.REACT_APP_BASE_URL+'/api/v1/random_task_set',
        params: {
            token: token
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

