import React from "react";
import Intro from '../components/home/IntroContainer';
import AboutUs from '../components/home/AboutUsContainer';
import AboutSpaces from '../components/home/AboutSpacesContainer';
import BeSpacer from '../components/home/BeSpacerContainer';
import {Footer} from "../components/Footer"
import '../style/home.css';

function Home() {
  return (
    <div>
        <div className="content">
            <Intro></Intro>
            <AboutUs></AboutUs>
            <AboutSpaces></AboutSpaces>
            <BeSpacer></BeSpacer>
            <Footer></Footer>
        </div>
    </div>   
  );
}

export default Home;
