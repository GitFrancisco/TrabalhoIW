import React from "react";
import "../styles/Recipes.css";
// APIs
import Axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import CloseIcon from '@mui/icons-material/Close';

function Recipes() {
  // state variable that is used to store every recipe in the API (fetch)
  const [receitas, setReceitas] = useState([]);
  // state variable used in the search bar, to search for a specific recipe
  const [searchTerm, setSearchTerm] = useState("");
  // state variable used to open the full context popup, stores "nomeReceita"
  const [selectedRecipe, setSelectedRecipe] = useState("");
  // Full context "popup"
  // state variable used to store the full recipe context of the selectedRecipe
  const [recipeName, setRecipeName] = useState("");
  const [ingredient, setIngredient] = useState("");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState("");
  const [inst, setInst] = useState("");
  const [image, setImage] = useState("");

  // loads the recipe when opening the tab
  useEffect(() => {
     fetchData();
  }, []);

  // fetches the recipes from the API
  const fetchData = () => {
    Axios.get("https://sheetdb.io/api/v1/e0qsyv4qfu64j?sheet=ctgBolos").then(
      (res) => {
        setReceitas(res.data);
      }
    );
  };

  // filters the recipes using the searchTerm state variable
  const filterRecipes = () => {
    return receitas.filter((receita) =>
      receita.nomeReceita.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  // selects the recipe
  const selectRecipe = (nomeReceita, tempo, ingrediente, imagem, preparacao, descricao) => {
    setSelectedRecipe(nomeReceita);
    setRecipeName(nomeReceita);
    setTime(tempo);
    setIngredient(ingrediente);
    setImage(imagem);
    setDescription(descricao);
    setInst(preparacao);
  };


  return (
  <div className="container" >
      {selectedRecipe ? (
      <div className="fullContext">
        <div className="contextLeft">
            <h1 className="textTitle">{recipeName}</h1>
            <p className="textTime">{time}</p>
            <img className="imagemBolo" src={image} />
            <button className="closeButton"
                onClick={() => {
                    setSelectedRecipe("");
                }}
            >
                <CloseIcon/>
            </button>
        </div>
        <div className="contextRight">
            <p className="textContext">{description}</p>
            <div style={{display: 'flex'}}>
                <div style={{width: '40%'}}>
                  <h3>Ingredients:</h3>
                    <ul className= "textIngr">
                        {ingredient.split(',').map((ingredient, index) => (
                            <li key={index}>{ingredient.trim()}</li>
                        ))}
                    </ul>
                </div>
                <div style={{width: '60%'}}>
                  <h3>Instructions:</h3>
                    <ul className= "textInstr">
                        {inst.split(',').map((inst, index) => (
                            <li key={index}>{inst.trim()}</li>
                        ))}
                    </ul>
                </div>    
            </div>
        </div>
    </div>
) : (
  <div className="Recipes">
    <h2 id="recTitle" >Recipes:</h2>
    <input
      id="searchBar"
      placeholder="Search for a specific recipe!"
      onChange={(e) => setSearchTerm(e.target.value)}
    />
    {filterRecipes().map((receita, index) => (
      <div
        key={index}
        className="receita-item"
        onClick={() => console.log("teste")}
      >
        <p id="nomeReceita">{receita.nomeReceita}</p>
        <img
          className="imgPreview"
          src={receita.imagem}
          onClick={() =>
            selectRecipe(
              receita.nomeReceita,
              receita.tempo,
              receita.ingrediente,
              receita.imagem,
              receita.preparacao,
              receita.descricao
            )
          }
        />
      </div>
    ))}</div>
)}

    </div>
  );
}

export default Recipes;
