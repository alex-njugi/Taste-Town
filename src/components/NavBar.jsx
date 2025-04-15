import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = () => {
  return (
    <div>
        <nav>
            <h1>Taste Town</h1>
            <div>
                <Link to="/">Home</Link>
                <Link to="/Menu">Menu</Link>
                <Link to="/About">About us</Link>
                <Link to="/Contact">Contact</Link>

            </div>
                
            

        </nav>
    </div>
  )
}

export default NavBar