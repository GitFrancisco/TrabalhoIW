import React, { useState } from 'react'
import Logo from '../assets/logoCake.png';
import { Link } from 'react-router-dom';
import ReorderIcon from '@mui/icons-material/Reorder'; 
import '../styles/Navbar.css';

function Navbar() {
  // state variable that verifies whether the "links" are open or not (phone mode)
  const [openLinks, setOpenLinks] = useState(false);
  // checks if the navbar is expanded or not (phone mode)
  const toggleNavBar = () =>  {
    setOpenLinks(!openLinks);
  };

  return (
    <div className="navbar">  
        <div className="leftSide" id={openLinks ? "open " : "close"}>
            <Link to="/">
               <img src={Logo} style={{display: openLinks ? 'none' : 'block'}} />
            </Link>
            <div className="hiddenLinks">
              <Link to="/"> Home </Link>
              <Link to="/recipes"> Cake Recipes </Link>
              <Link to="/share"> Share your Recipe </Link>
              <Link to="/about"> About us </Link>
              <Link to="/Dashboard"> Admin Dashboard</Link>
            </div>
        </div>
        <div className="rightSide">
            <Link to="/"> Home 🏠</Link>
            <Link to="/recipes"> Cake Recipes 📖</Link>
            <Link to="/share">  Share your Recipe🔗 </Link>
            <Link to="/about"> About us 🧑‍💻</Link>
            <Link to="/Dashboard"> Admin Dashboard🪶</Link>
            <button onClick={toggleNavBar}>
              <ReorderIcon/>
            </button>
        </div>
    </div>
  );
}

export default Navbar
