import React from 'react'
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Sigin from "../pages/Sigin";
import SiginSpacer from "../pages/SiginSpacer";
import MyAccount from "../pages/MyAccount";
import EditSpace from '../pages/EditSpace';
import AllSpaces from '../pages/AllSpaces';
import Space from '../pages/Space';
import Product from '../pages/Product';
import Order from '../pages/Order'
import OrderDone from '../pages/OrderDone'

export const Router = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Home />} /> 
                <Route path="/login" element={<Login />} />
                <Route path="/registro" element={<Sigin/>} />
                <Route path="/registro-spacer" element={<SiginSpacer/>} />
                <Route path="/editar-space" element={<EditSpace/>} />
                <Route path="/mi-cuenta" element={<MyAccount/>} />
                <Route path="/espacios" element={<AllSpaces/>} />
                <Route path="/espacio/:id" element={<Space/>} />
                <Route path="/producto/:id" element={<Product/>} />
                <Route path="/tramitar-pedido" element={<Order/>} />
                <Route path="/pedido-realizado" element={<OrderDone/>} />
            </Routes>
        </div>
    )
}