import React, { useState } from "react";
import {BrowserRouter} from "react-router-dom";
import { Router } from './router/router';
import {Navigation} from './components/Navigation';
import ShoppingCart from './components/ShoppingCart';
import UserContext from "./components/context/UserContext";
import './style/body.css';

function App() {
  const [user, setUser] = useState();
  const [viewCart,setViewCart] = useState(false);

  return (
    <div>
      <BrowserRouter>
        <UserContext.Provider value={{user,setUser}}>
          <Navigation  viewCart={viewCart} setViewCart={setViewCart}></Navigation>
          <div>
          {viewCart ? <ShoppingCart></ShoppingCart> : ""}
          <Router></Router>
          </div>
        </UserContext.Provider>
      </BrowserRouter>
    </div>
      
  );
}

export default App;

