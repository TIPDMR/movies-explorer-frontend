import React from 'react';
import { Link } from "react-router-dom";
import LogoImage from "../LogoImage/LogoImage";

const LogoLink = () => {
  return (
    <Link className="logo-link" to="/">
      <LogoImage/>
    </Link>
  );
};

export default LogoLink;
