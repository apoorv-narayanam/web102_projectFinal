import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';

const Header = () => (
  <header className="header">
    <Link to="/" className="header-title">My Awesome Forum</Link>
  </header>
);

export default Header;