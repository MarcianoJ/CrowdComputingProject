import React from 'react'
import axios from 'axios';


const Signup = () => {

    function handleSubmit(e) {

        var username = document.getElementById('username').value
        var password = document.getElementById('password').value
        axios.post(process.env.REACT_APP_BASE_URL + "/api/v1/users")
        .then(response => {
            //TODO: User signe up
        })
        .catch(err => {      
        })
    }

    return (
        <div>

            <div className="container centered">
                <div className="form centered">
                    <label>username</label>
                    <input type="text" name="username" id="username" required/>

                    <label>password</label>
                    <input type="password" name="password" id="password" required/>

                    <label/>
                    <button className="btn btn-success" onClick={handleSubmit} > signup</button>
                </div>
            </div>

        </div>
    )
}

export default Signup
