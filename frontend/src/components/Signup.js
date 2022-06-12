import React, { useContext } from 'react'
import UserContext from '../components/User';
import { useCookies } from 'react-cookie';
import { handleSignup } from '../utils/utils';

const Signup = (props) => {
    const userContext = useContext(UserContext);
    const [cookies, setCookie] = useCookies();

    function handleSubmit(e) {
        handleSignup(props, userContext, cookies, setCookie)
    }

    return (
        <div>

            <div className="container">
                <div className="form">
                    <h3 className='mb-2 mt-2'>Create new account</h3>
                    <p>
                        By creating an account, your current progress can be saved. <br/>
                        Please provide the following information.
                    </p>
                    <label>Email</label>
                    <input type="text" name="username" id="username" required/>
                    <div className='error'>
                        <p id="email_error"></p>
                    </div>

                    <label>Password</label>
                    <input type="password" name="password" id="password" required/>
                    <div className='error'>
                        <p id="password_error"></p>
                    </div>

                    <label/>
                    <button className="btn btn-success" onClick={handleSubmit} >Sign Up</button>

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

export default Signup
