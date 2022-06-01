import logo from './logo.svg';
import './App.css';
import {  unstable_HistoryRouter as HistoryRouter ,
  Routes,
  Route } from "react-router-dom";
import HighlightTask from './components/HighlightTask'
import LabelTask from './components/LabelTask'
import React, { useState, useEffect} from 'react';
import { createBrowserHistory } from "history";
import { ReactSession }  from 'react-client-session';
require('dotenv').config()
const history = createBrowserHistory({ window });
const axios = require('axios').default;

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
  useEffect(() => {
    // Update the document title using the browser API
    if(index == 0){
      axios.get(process.env.REACT_APP_BASE_URL+"/api/v1/users")
      .then(function (response) {
        // handle success
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
      console.log(process.env.REACT_APP_BASE_URL)
    }
  });

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


