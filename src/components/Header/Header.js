import React from 'react';
import LogoLink from "./LogoLink/HeaderLogo";
import Navigation from "../Navigation/Navigation";
import MenuButton from "../MenuButton/MenuButton";

const Header = ({ clickOpenMenuMobile, isLoggedIn }) => {
  return (
    <header className="header">
      <LogoLink/>
      <Navigation isLoggedIn={isLoggedIn}/>
      {isLoggedIn && <MenuButton clickOpenMenuMobile={clickOpenMenuMobile}/>}
    </header>
  );
};

export default Header;
