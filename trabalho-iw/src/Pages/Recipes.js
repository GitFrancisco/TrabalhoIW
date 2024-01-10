import React from "react";
import "../styles/Recipes.css";
// APIs
import Axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import CloseIcon from '@mui/icons-material/Close';

function Recipes() {
  const [receitas, setReceitas] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRecipe, setSelectedRecipe] = useState("");
  // Full context
  const [recipeName, setRecipeName] = useState("Bolo de Laranja");
  const [ingredient, setIngredient] = useState("Laranja, Farinha, Ovos, Açucar, Roxo, Rato, Amarelo, Carro");
  const [description, setDescription] = useState("Esta é uma deliciosa receita de bolo de laranja. A sua familia vai adorar, pois é saborosa, fresca saudavel e para todos os gosto blah blha blha. Para preparar esta receita, começe por misturar os ovos com o açucar e, de seguida,coloque a farinha.");
  const [time, setTime] = useState("1 Hora e 15 minutos");
  const [inst, setInst] = useState("Misturar açucar com os ovos, misturar farinha, jusntr a laranja, colocar no forno a 200ºC por 3 horas");
  const [image, setImage] = useState(
  
    
    
  
    "https://i.ytimg.com/vi/4-yT1rjtdm8/maxresdefault.jpg"
  );

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
                  <h3>Ingredientes:</h3>
                    <ul className= "textIngr">
                        {ingredient.split(',').map((ingredient, index) => (
                            <li key={index}>{ingredient.trim()}</li>
                        ))}
                    </ul>
                </div>
                <div style={{width: '60%'}}>
                  <h3>Instruções:</h3>
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
              receita.imagem
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
