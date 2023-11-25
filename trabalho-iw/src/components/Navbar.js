import React from 'react'
import Logo from '../assets/logo.png'
import "../styles/Navbar.css"

function Navbar() {
  return (
    <div className="navbar">
        <div className="leftSide">
            <img src={Logo}/>
        </div>
        <div className="rightSide">
            <span>Expect</span>
            <span>The</span>
            <span>Unexpected</span>
        </div>
    </div>
  )
}

export default Navbar