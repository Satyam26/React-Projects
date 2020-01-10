import React from 'react';
import {Link, withRouter } from 'react-router-dom';

const Navbar = (props) => {
  
  return (
    <nav className="nav-wrapper">
      <div className="container">
        <Link to="/" className="brand-logo">Pokemon</Link>
        <ul className="right">
          <li><Link to="/" >Home</Link></li>
          <li><Link to="/About" >About</Link></li>
          <li><Link to="/Contact" >Contact</Link></li>
        </ul>
      </div>
    </nav>
  );
}

export default withRouter(Navbar);