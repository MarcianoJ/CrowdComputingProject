import logo from './logo.svg';
import './App.css';
import GameNav from './components/GameNav'
import {  unstable_HistoryRouter as HistoryRouter ,
  Routes,
  Route } from "react-router-dom";
import HighlightTask from './components/HighlightTask'
import LabelTask from './components/LabelTask'
import React, { useState } from 'react';
import { createBrowserHistory } from "history";
import { ReactSession }  from 'react-client-session';

const history = createBrowserHistory({ window });

var item = window.localStorage.getItem('index');

if(!item)
  window.localStorage.setItem('index', 0);



function App() {
//DATA STRUCTURE
//  {
//    "sentence": {
//      "label":0/1,
//      "rational":[...]
//    }
//  }
  const [data, setData] = useState({})
  const [index, setIndex] = useState(0)

  var sentences = ["my first sentence", "my second sentence"]


  return (
    <HistoryRouter  history={history}>
          <Routes>
            <Route path="/" element={<HighlightTask sentences = {sentences} data={data} setData={setData} index={index} setIndex={setIndex} history={history}  />}/>
            <Route path="/label" element={<LabelTask sentences = {sentences} data={data} setData={setData} index={index} setIndex={setIndex} history={history} />}/>
            <Route path="/finished" element={<h3>FINISHED</h3>}/>
          </Routes>
          <h3>sentence n. {index}</h3>

    </HistoryRouter >
  );
}

export default App;


