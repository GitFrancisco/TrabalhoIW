import React from 'react';
import "../styles/Recipes.css";
// APIs
import Axios from "axios";
import { useState } from "react";
import { useEffect } from "react";


function Recipes() {
    const [receitas, setReceitas] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        Axios.get("https://sheetdb.io/api/v1/e0qsyv4qfu64j?sheet=ctgBolos").then((res) => {
            setReceitas(res.data);
        });
    };

    

    return (
        <div className="Recipes">
            <h2>Receitas:</h2>
            {receitas.map((receita, index) => (
                <div key={index} className="receita-item">
                    <p>Nome: {receita.nomeReceita}</p>
                    <img className='imgPreview' src={receita.imagem}/>
                    <p>Tempo: {receita.tempo}</p>
                    <p>Ingredientes: {receita.ingrediente}</p>
                </div>
            ))}
        </div>
    );
}

export default Recipes;