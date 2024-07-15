import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import "./NavBar.css";
import Toogle from "../Features/DarkMode/DarkMode";
import AuthNav from './AuthNav';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (isOpen && !event.target.closest('.nav-bar')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [isOpen]);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const closeNavbar = () => {
    setIsOpen(false);
  };

  return (
    <React.Fragment>
      <header>
        <nav>
          <ul className="nav-bar">
            <li className="logo">
              <NavLink to="/" onClick={closeNavbar}>
                <div className='logo-img'>
                  <img className='logo-code' src="https://i.ibb.co/pwsj940/favicon.png" alt="logo" width="15%"/>
                  <h1 className='logo-name'>CodeMasters</h1>
                </div>
              </NavLink>
            </li>
            <input type="checkbox" id="check" checked={isOpen} />
            <span className={`menu ${isOpen ? 'open' : ''}`}>
              <li><NavLink to="/" onClick={closeNavbar}>Home</NavLink></li>
              <li><NavLink to="/about" onClick={closeNavbar}>About</NavLink></li>
              <li><NavLink to="/courses" onClick={closeNavbar}>Courses</NavLink></li>
              <li><NavLink to="/quizzes" onClick={closeNavbar}>Quizzes</NavLink></li>
              <li><NavLink to="/roadmaps" onClick={closeNavbar}>Roadmaps</NavLink></li>
              <li><NavLink to="/contact" onClick={closeNavbar}>Contact</NavLink></li>
              <AuthNav closeNavbar={closeNavbar} />
              <label htmlFor="check" className="close-menu"><i className="fas fa-times" onClick={closeNavbar}></i></label>
            </span>
            <label htmlFor="check" className="open-menu" onClick={toggleNavbar}><i className="fas fa-bars"></i></label>
            <label htmlFor="check" className='toggle-btn'><li className='dark-mode'><Toogle/></li></label>
          </ul>
        </nav>
      </header>
    </React.Fragment>
  );
};

export default NavBar;
