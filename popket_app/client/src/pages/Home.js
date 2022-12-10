import React, { useState } from "react";
import Navigation from '../components/Navigation';
import Intro from '../components/home/IntroContainer';
import AboutUs from '../components/home/AboutUsContainer';
import AboutSpaces from '../components/home/AboutSpacesContainer';
import BeSpacer from '../components/home/BeSpacerContainer';
import '../style/home.css';

function Home() {
  return (
    <div>
        <Navigation></Navigation>
        <div className="page">
            <Intro></Intro>
            <AboutUs></AboutUs>
            <AboutSpaces></AboutSpaces>
            <BeSpacer></BeSpacer>
            <p>Hola</p>
        </div>
    </div>
      
  );
}

export default Home;