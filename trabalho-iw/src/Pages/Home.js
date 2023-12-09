import React from 'react';
import { Link } from "react-router-dom";
import BannerImage from '../assets/cakeMain.jpg';
import "../styles/Home.css";

function Home() {
  return <div className="Home">
    
          <div className="headerContainer" style={{ backgroundImage: `url(${BannerImage})` }}>
            <h1> Cake World </h1>
            <p> The place to share your sweetness </p>
            <Link to="/recepies">
              <button>Find the cake for you</button>
            </Link>
          </div>
  
        </div>;
  
}

export default Home;