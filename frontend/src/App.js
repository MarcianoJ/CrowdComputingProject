import './App.css';
import {Routes,Route,useNavigate } from "react-router-dom";
import HighlightTask from './components/HighlightTask'
import LabelTask from './components/LabelTask'
import React, { useState} from 'react';
import Landing from "./components/Landing"
import Signup from "./components/Signup"
import Finished from "./components/Finished"
import Login from "./components/Login"
import UserContext from './components/User';
import { useCookies } from 'react-cookie';
import GameNav from './components/GameNav';

function App() {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies();
  const [data, setData] = useState({})
  const [user, setUser] = useState(cookies.token ? {token: cookies.token} : null);

  return (
    <UserContext.Provider value={{user, setUser}}>
          <GameNav navigate={navigate}/>
          <Routes>
            <Route path="/" element={<Landing navigate={navigate}  />} />
            <Route path="/rational/:gameid" element={<HighlightTask data={data} setData={setData} navigate={navigate}  />}/>
            <Route path="/label/:gameid" element={<LabelTask data={data} setData={setData} navigate={navigate}/>}/>
            <Route path="/signup" element={<Signup navigate={navigate}/>} />
            <Route path="/login" element={<Login navigate={navigate}/>} />
            <Route path="/finished" element={<Finished navigate={navigate}/>}/>
          </Routes>
    </UserContext.Provider>
  );
}

export default App;


