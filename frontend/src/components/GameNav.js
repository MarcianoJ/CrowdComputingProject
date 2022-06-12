import React, { useContext } from 'react'
import UserContext from '../components/User';
import { useCookies } from 'react-cookie';

export default function GameNav(props) {
    const userContext = useContext(UserContext);
    const [cookies, setCookie, removeCookie] = useCookies();
    return(
        <div>
            <nav className="navbar bg-light">
                <div className='home-btn'>
                    <button  className="btn btn-primary" onClick={()=>{props.navigate("/")}}>Home</button>
                </div>

                <div className='other-btn'>


                {   (userContext.user != null && !cookies.anonymous) ? 
                    ( 
                <button className="btn btn-primary" onClick={()=>{removeCookie("token"); userContext.setUser(null)}}>Log out</button> ) 
                : 
                (
                    <div>
                <button className="btn btn-primary" onClick={()=>{props.navigate("/login")}}>Log in</button>
                <button className="btn btn-primary" onClick={()=>{props.navigate("/signup")}}>Sign up</button>
                    </ div>
                )}

                </div>
            </nav>
            <div className="warning-mobile">
                <h5>The game does not work on mobile devices</h5>
            </div>
        </div>

    )
}