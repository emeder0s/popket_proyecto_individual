import React from 'react'
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Sigin from "../pages/Sigin";
import SiginSpacer from "../pages/SiginSpacer";
import MyAccount from "../pages/MyAccount";
import EditSpace from '../pages/EditSpace';

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
            </Routes>
        </div>
    )
}