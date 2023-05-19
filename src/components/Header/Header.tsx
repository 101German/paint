import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import "./Header.css";

interface HeaderProps {}

const Header: FC<HeaderProps> = () => (
  <div className="header">
    <p className="paint-logo">Paint</p>
      <Link to="/draw"><button className="draw-button">Draw</button></Link>
  </div>
);

export default Header;
