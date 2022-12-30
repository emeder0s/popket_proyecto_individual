import React from 'react'
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Sigin from "../pages/Sigin";
import SiginSpacer from "../pages/SiginSpacer";

export const Router = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Home />} /> 
                <Route path="/login" element={<Login />} />
                <Route path="/registro" element={<Sigin/>} />
                <Route path="/registro-spacer" element={<SiginSpacer/>} />
            </Routes>
        </div>
    )
}