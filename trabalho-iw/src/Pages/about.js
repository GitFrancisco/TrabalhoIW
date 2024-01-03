import React from 'react'
import "../styles/about.css";
import Dan from '../assets/DanMar.png';
import Fra from '../assets/FraPir.png';
import github from '../assets/github.png';
import ipt from '../assets/ipt.png';

function about() {
  return (
    <div className="about">
        <div className="info">
            <div>
                <img src={Dan} alt="DanMar" />
                <h1> Daniel Marques</h1>
                <h2> Número: 24847</h2>
            </div>
            <div>
                <img src={Fra} alt="FraPir" />
                <h1> Francisco Pires</h1>
                <h2> Número: 24865</h2>
            </div>
        </div>
        <div className="description">
            <p>Licenciatura de Engenheria informática </p>
            <a href="https://github.com/tanguree11/TrabalhoIW"> 
                <img id="git" src={github} alt="github" />
            </a>
            <a href="https://www.ipt.pt/"> 
                <img id="ipt" src={ipt} alt="ipt" />
            </a>
        </div>
    </div>
  )
}

export default about;
