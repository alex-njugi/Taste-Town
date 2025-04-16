import React from 'react'
import { Link } from 'react-router-dom'


const NavBar = () => {
  return (
    <div className='navbar'>
        <h1>Taste Town</h1>
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