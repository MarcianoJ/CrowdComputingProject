import './App.css';
import {Routes,Route,useNavigate } from "react-router-dom";
import HighlightTask from './components/HighlightTask'
import LabelTask from './components/LabelTask'
import React, { useState} from 'react';
import Landing from "./components/Landing"

function App() {
  const navigate = useNavigate();
  const [data, setData] = useState({})
  const [index, setIndex] = useState(0)

  return (
    <div  >
          <Routes>
            <Route path="/" element={<Landing navigate={navigate}  />} />
            <Route path="/rational/:gameid" element={<HighlightTask data={data} setData={setData} index={index} setIndex={setIndex} navigate={navigate}  />}/>
            <Route path="/label/:gameid" element={<LabelTask data={data} setData={setData} index={index} setIndex={setIndex} navigate={navigate}/>}/>
            <Route path="/finished" element={<h3>FINISHED</h3>}/>
          </Routes>
    </div >
  );
}

export default App;


