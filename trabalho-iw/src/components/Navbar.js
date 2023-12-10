import React, { useState } from 'react'
import Logo from '../assets/logoCake.png';
import { Link } from 'react-router-dom';
import ReorderIcon from '@mui/icons-material/Reorder'; 
import '../styles/Navbar.css';


function Navbar() {

  const [openLinks, setOpenLinks] = useState(false)
  const toggleNavBar = () =>  {
    setOpenLinks(!openLinks);
  };


  

  return (
    <div className="navbar">  
        <div className="leftSide" id={openLinks ? "open " : "close"}>
            <Link to="/">
               <img src={Logo} />
            </Link>
            <div className="hiddenLinks">
              <Link to="/"> Home </Link>
              <Link to="/recipes"> Cake Recipes </Link>
              <Link to="/share"> Share your Recipe </Link>
              <Link to="/about"> About us </Link>
            </div>
        </div>
          <div className="rightSide">
            <Link to="/"> Home 🏠</Link>
            <Link to="/recipes"> Cake Recipes 📖</Link>
            <Link to="/share">  Share your Recipe🔗 </Link>
            <Link to="/about"> About us 🧑‍💻</Link>
            <Link to="/signup"> Join us 🪶</Link>
            <button onClick={toggleNavBar}>
              <ReorderIcon/>
            </button>
          </div>
        </div>
  );
}

export default Navbar