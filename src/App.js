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
  const [label, setLabel] = useState(0)
  const [rational, setRational] = useState([])

  var sentences = ["my first sentence", "my second sentence"]


  return (
    <HistoryRouter  history={history}>
          <Routes>
            <Route path="/" element={<HighlightTask sentences = {sentences} rational={rational} label={label}  setRational={setRational} history={history}  />}/>
            <Route path="/label" element={<LabelTask sentences = {sentences} label={label} setLabel={setLabel}  history={history} />}/>
            <Route path="/finished" element={<h3>FINISHED</h3>}/>

          </Routes>
          <h3>index: {window.localStorage.getItem('index')}</h3>
    </HistoryRouter >
  );
}

export default App;
