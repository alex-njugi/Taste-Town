import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'


const NavBar = () => {
  return (
    <div className='navbar'>
        <img src={logo} alt="Taste Town Logo" />
        <nav className='nav-links'>
            <Link to="/">Home</Link>
            <Link to="/Menu">Menu</Link>
            <Link to="/About">About us</Link>
            <Link to="/Contact">Contact</Link>

        </nav>
        
    </div>
  )
}

export default NavBar