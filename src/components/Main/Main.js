import React from 'react';
import Promo from "./Promo/Promo";
import AboutProject from "./AboutProject/AboutProject";
import Techs from "./Techs/Techs";
import AboutMe from "./AboutMe/AboutMe";
import Portfolio from "./Portfolio/Portfolio";
import { Outlet } from "react-router-dom";

const Main = () => {
  return (<>
    <main className="main">
      <Promo/>
      <AboutProject/>
      <Techs/>
      <AboutMe/>
      <Portfolio/>
    </main>
    <Outlet/>
  </>
  );
};

export default Main;
