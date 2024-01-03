import React from "react";
import "../styles/Recipes.css";
// APIs
import Axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

function Recipes() {
  const [receitas, setReceitas] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  //useEffect(() => {
   // fetchData();
 // }, []);

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
      <h2>Recipes:</h2>
      <input id="searchBar" placeholder="Search for a specific recipe!" onChange={(e) => setSearchTerm(e.target.value)} />
    </div>
  );
}

export default Recipes;

/*
  return (
    <div className="Recipes">
      <h2>Recipes:</h2>
      <input id="searchBar" placeholder="Search for a specific recipe!" onChange={(e) => setSearchTerm(e.target.value)} />
      {filterRecipes().map((receita, index) => (
        <div key={index} className="receita-item" onClick={console.log("teste")}>
          <p>{receita.nomeReceita}</p>
          <img className="imgPreview" src={receita.imagem} />
        </div>
      ))}
    </div>
  );        
            */
