import React from "react";
import "../styles/Recipes.css";
// APIs
import Axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

function Recipes() {
  const [receitas, setReceitas] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRecipe, setSelectedRecipe] = useState("a");
  // Full context
  const [recipeName, setRecipeName] = useState("Bolo de Laranja");
  const [ingredient, setIngredient] = useState("Laranja");
  const [description, setDescription] = useState("Esta é uma deliciosa receita de bolo de laranja.");
  const [time, setTime] = useState("10 segundos");
  const [image, setImage] = useState("https://i.ytimg.com/vi/4-yT1rjtdm8/maxresdefault.jpg");

  useEffect(() => {
    //  fetchData();
  }, []);

  const fetchData = () => {
    Axios.get("https://sheetdb.io/api/v1/e0qsyv4qfu64j?sheet=ctgBolos").then(
      (res) => {
        setReceitas(res.data);
      }
    );
  };

  const fetchCake = () => {
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

  // Selects the recipe
  const selectRecipe = (nomeReceita, tempo, ingrediente, imagem) => {
    setSelectedRecipe(nomeReceita);
    setRecipeName(nomeReceita);
    setTime(tempo);
    setIngredient(ingrediente);
    setImage(imagem);
  };

  return (
    /* Main Div */
    <div className="Recipes">
      <h2>Recipes:</h2>
      <input
        id="searchBar"
        placeholder="Search for a specific recipe!"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {filterRecipes().map((receita, index) => (
        <div
          key={index}
          className="receita-item"
          onClick={console.log("teste")}
        >
          <p>{receita.nomeReceita}</p>
          <img
            className="imgPreview"
            src={receita.imagem}
            onClick={() =>
              selectRecipe(
                receita.nomeReceita,
                receita.tempo,
                receita.ingrediente,
                receita.imagem
              )
            }
          />
        </div>
      ))}

    {selectedRecipe ? (    
 <div className="fullContext">
    <div className="contextLeft">
      <h1 className="textContext">{recipeName}</h1>
      <p className="textContext">{time}</p>
      <img src={image}/>
      <button onClick={() => { setSelectedRecipe("") }}>Close</button>
    </div>
    <div className="contextRight">
      <p className="textContext">{ingredient}</p>
      <p className="textContext">{description}</p>
    </div>
</div>) : <div hidden></div>}
</div>
  );      
}

export default Recipes;
