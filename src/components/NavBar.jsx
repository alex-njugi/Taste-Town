import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBagShopping, faUserGear, faBars, faTimes } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()

  const toggleMenu = () => setMenuOpen(!menuOpen)
  const closeMenu = () => setMenuOpen(false)

  return (
    <div className='navbar'>
      <img src={logo} alt="Taste Town Logo" />

      {/* Hamburger icon for mobile */}
      <button className='hamburger' onClick={toggleMenu} aria-label="Toggle menu">
        <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} />
      </button>

      {/* Side sliding menu */}
      <nav className={`nav-links ${menuOpen ? 'open' : ''}`}>
        <Link to="/" onClick={closeMenu}>Home</Link>
        <Link to="/Menu" onClick={closeMenu}>Menu</Link>
        <Link to="/About" onClick={closeMenu}>About us</Link>
        <Link to="/Contact" onClick={closeMenu}>Contact</Link>
      </nav>

      {/* Side buttons always visible */}
      <div className='sidebtn'>
        <button className='userbtn' onClick={() => navigate('/Admin')}>
          <FontAwesomeIcon icon={faUserGear} />
        </button>
        <button className='shopbag'>
          <FontAwesomeIcon icon={faBagShopping} />
        </button>
        <button className='signbtn'>Sign Up</button>
      </div>
    </div>
  )
}

export default NavBar
