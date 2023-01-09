import React, { useState } from "react";
import {BrowserRouter} from "react-router-dom";
import { Router } from './router/router';
import {Navigation} from './components/Navigation';
import {Footer} from './components/Footer';
import ShoppingCart from './components/ShoppingCart';
import UserContext from "./components/context/UserContext";
import CartContext from "./components/context/CartContext";
import './style/body.css';

function App() {
  const [user, setUser] = useState();
  const [cartContext, setCartContext] = useState();
  const [viewCart,setViewCart] = useState(false);

  return (
    <div>
      <BrowserRouter>
      <CartContext.Provider value={{cartContext, setCartContext}}>
        <UserContext.Provider value={{user,setUser}}>
          <Navigation  viewCart={viewCart} setViewCart={setViewCart}></Navigation>
          <div>
          {viewCart ? <ShoppingCart></ShoppingCart> : ""}
          <Router></Router>
          </div>
          {/* <Footer></Footer> */}
        </UserContext.Provider>
      </CartContext.Provider>
      </BrowserRouter>
    </div>
      
  );
}

export default App;

