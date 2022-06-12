import React, { useContext } from 'react'
import UserContext from '../components/User';

import { useCookies } from 'react-cookie';
import { handleLogin } from '../utils/utils'
const Login = (props) => {
    const userContext = useContext(UserContext);
    const [cookies, setCookie] = useCookies();
    function handleSubmit(e) {
       handleLogin(props, userContext, cookies, setCookie)
    }

    return (
        <div>

            <div className="container">
                <div className="form">
                    <h3 className='mt-2 mb-2'>Login</h3>
                    <p>Login to your account.</p>
                    <label>Email</label>
                    <input type="text" name="username" id="username" required/>

                    <label>Password</label>
                    <input type="password" name="password" id="password" required/>


                    <label/>
                    <button className="btn btn-success" onClick={handleSubmit} > signup</button>

                    <div className='error'>
                        <p id="user_error"></p>
                    </div>
                    <div className='success'>
                        <p id="user_success"></p>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default Login
