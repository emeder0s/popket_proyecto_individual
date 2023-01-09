import React, { useState, useEffect } from "react";
var cart = localStorage.getItem("cart") ? localStorage.getItem("cart") : [];
const initialContext = {cart};
const CartContext = React.createContext(initialContext);
export default CartContext;