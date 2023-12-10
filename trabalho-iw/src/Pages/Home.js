import React from 'react';
import { Link } from "react-router-dom";
import BannerImage from '../assets/cakeMain.jpg';
import "../styles/Home.css";


function Home() {
  return <div className="Home">
    
          <div className="headerContainer" style={{ backgroundImage: `url(${BannerImage})` }}>
            <h1> SugarJoy</h1>
            <p> Where every slice tells a sweet story </p>
            <Link to="/recipes">
              <button>Find the cake for you</button>
            </Link>
          </div>
  
        </div>;
  
}

export default Home;