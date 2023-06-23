import React from 'react';
import LogoLink from "./LogoLink/HeaderLogo";
import Navigation from "../Navigation/Navigation";
import MenuButton from "../MenuButton/MenuButton";

const Header = ({ loggedIn, clickOpenMenuMobile }) => {

  return (
    <header className="header">
      <LogoLink/>
      <Navigation loggedIn={loggedIn}/>
      {loggedIn && <MenuButton clickOpenMenuMobile={clickOpenMenuMobile}/>}
    </header>
  );
};

export default Header;
