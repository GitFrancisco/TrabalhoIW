import React, { useState, useEffect } from "react";
import "../styles/Recipes.css";
import Axios from "axios";

function Recipes() {
  const [receitas, setReceitas] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    Axios.get("https://sheetdb.io/api/v1/e0qsyv4qfu64j?sheet=ctgBolos").then(
      (res) => {
        setReceitas(res.data);
      }
    );
  };

  const filterRecipes = () => {
    return receitas.filter((receita) =>
      receita.nomeReceita.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  return (
    <div className="Recipes">
      <input
        id="searchBar"
        placeholder="Search for a specific recipe!"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div>
        <h2>Receitas:</h2>
        {filterRecipes().map((receita, index) => (
          <div key={index} className="receita-item">
            <p>Nome: {receita.nomeReceita}</p>
            <img className="imgPreview" src={receita.imagem} alt={`Recipe ${index}`} />
            <p>Tempo: {receita.tempo}</p>
            <p>Ingredientes: {receita.ingrediente}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Recipes;

/*
            <div>
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
            */
