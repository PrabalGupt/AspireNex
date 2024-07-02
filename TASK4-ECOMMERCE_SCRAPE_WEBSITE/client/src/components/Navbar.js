import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Navbar.css'; // Import your CSS file
import '../css/global.css'; // Import the new CSS file

const navIcons = [
  { src: '/assets/icons/search.svg', alt: 'search' },
  { src: '/assets/icons/black-heart.svg', alt: 'heart' },
  { src: '/assets/icons/user.svg', alt: 'user' },
];

const Navbar = () => {
  return (
    <header className="navbar-header">
      <nav className="navbar">
        <Link to="/" className="navbar-logo">
          <img 
            src="/assets/icons/logo.svg"
            width={27}
            height={27}
            alt="logo"
          />

          <p className="navbar-logo-text">
          Shop<span className='navbar-logo-highlight'>Spy</span>
          </p>
        </Link>

        <div className="navbar-icons">
          {navIcons.map((icon, index) => (
            <img 
              key={index}
              src={icon.src}
              alt={icon.alt}
              width={28}
              height={28}
              className="navbar-icon"
            />
          ))}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
