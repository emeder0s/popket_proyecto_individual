import React from 'react'
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Sigin from "../pages/Sigin";

export const Router = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Home />} /> 
                <Route path="/login" element={<Login />} />
                <Route path="/registro" element={<Sigin/>} />
            </Routes>
        </div>
    )
}