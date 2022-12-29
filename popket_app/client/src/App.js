import React, { useState } from "react";
import {BrowserRouter} from "react-router-dom";
import { Router } from './router/router';
import {Navigation} from './components/Navigation';
import UserContext from "./components/context/UserContext";
import './style/body.css';

function App() {
  const [user, setUser] = useState();

  return (
    <div>
      <BrowserRouter>
        <UserContext.Provider value={{user,setUser}}>
          <Navigation></Navigation>
          <Router></Router>
        </UserContext.Provider>
      </BrowserRouter>
    </div>
      
  );
}

export default App;

