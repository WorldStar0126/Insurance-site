import React from "react";
import { Link } from "react-router-dom";

// import LogoLight2x from "../../images/logo2x.png";
// import LogoDark2x from "../../images/logo-dark2x.png";
import LogoLight2x from "../../images/logo/logo-header.png";

const Logo = () => {
  return (
    <Link to={`${process.env.PUBLIC_URL}/`} className="logo-link">
      {/* <img className="logo-light logo-img" src={LogoLight2x} alt="logo" />
      <img className="logo-dark logo-img" src={LogoDark2x} alt="logo" /> */}
      <img className="logo-light" src={LogoLight2x} alt="logo" />
    </Link>
  );
};

export default Logo;
