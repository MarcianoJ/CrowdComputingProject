import './App.css';
import {Routes,Route,useNavigate } from "react-router-dom";
import HighlightTask from './components/HighlightTask'
import LabelTask from './components/LabelTask'
import React, { useState} from 'react';
import Landing from "./components/Landing"
import Signup from "./components/Signup"
import Finished from "./components/Finished"
function App() {
  const navigate = useNavigate();
  const [data, setData] = useState({})

  return (
    <div  >
          <Routes>
            <Route path="/" element={<Landing navigate={navigate}  />} />
            <Route path="/rational/:gameid" element={<HighlightTask data={data} setData={setData} navigate={navigate}  />}/>
            <Route path="/label/:gameid" element={<LabelTask data={data} setData={setData} navigate={navigate}/>}/>
            <Route path="/signup" element={<Signup navigate={navigate}/>} />
            <Route path="/finished" element={<Finished navigate={navigate}/>}/>
          </Routes>
    </div >
  );
}

export default App;


