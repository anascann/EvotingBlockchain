import React,{useState} from 'react';

import LandingPage from "./LandingPage/LandingPage"
import {UserContext} from "./Context/UserContext"
import Customer from "./Customer/Customer"
import Voter from "./Voter/Voter"
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';
import Switch from 'react-bootstrap/esm/Switch';

function App() {

  const [Details,setDetails]=useState({
    name:'',
    email:''
  })

  return (
   <Router>
    <div className="app">
    <UserContext.Provider value={{Details,setDetails}}>
    <Switch>
      
      <Route exact path="/" component={LandingPage}/>
      <Route path="/customer" component={Customer}/>
      <Route path="/voter" component={Voter}/>
      </Switch>
      </UserContext.Provider> 
    </div>
    </Router>
  
  );
}

export default App;
