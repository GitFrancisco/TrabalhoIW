import React from 'react';
import "../styles/Share.css";
// APIs
import Axios from "axios";
import { useState } from "react";


function Share() {
    const RecipeName = "Your Recipe Name";
    const Ingredient = "Your Ingredients";
    const Time = "Your Time";
    const Image = "";

    const [receita, setReceita] = useState("");
    const [add_nomeReceita, setNomeReceita] = useState("");
    const [add_ingrediente, setIngrediente] = useState("");
    const [add_tempo, setTempo] = useState("");
    const [add_imagem, setImagem] = useState("");
  
    const inputChange = event => {
      setReceita(event.target.value);
    };
  
    const fetchData = () => {
      Axios.get("https://sheetdb.io/api/v1/e0qsyv4qfu64j?sheet=ctgBolos").then((res) => {
        setReceita(res.data[1]);
      });
    };
  
    const postData = () => {
      fetch('https://sheetdb.io/api/v1/e0qsyv4qfu64j?sheet=ctgBolos', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            data: [
                {
                    'nomeReceita': add_nomeReceita,
                    'ingrediente': add_ingrediente,
                    'tempo': add_tempo,
                    'imagem':add_imagem
                }
            ]
        })
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
    }
  
    return (
      <div className="Share">
        <div className="leftSideShare">
            <h1 className='shareTitle'>Your Recipe</h1>
            <label className='lbRecipe'>Name: <input type="text" value={add_nomeReceita} onChange= {(e) => setNomeReceita(e.target.value)} name="nomeReceita"/></label>
            <label className='lbRecipe'>Ingredient: <input type="text" value={add_ingrediente} onChange= {(e) => setIngrediente(e.target.value)} name="nomeReceita"/></label>
            <label className='lbRecipe'>Time: <input type="text" value={add_tempo} onChange= {(e) => setTempo(e.target.value)} name="nomeReceita"/></label>
            <label className='lbRecipe'>Image: <input type="text" value={add_imagem} onChange= {(e) => setImagem(e.target.value)} name="nomeReceita"/></label>
            <button type="submit" onClick={postData}>Submit</button>
        </div>
        <div className="rightSideShare">
            <h1 className='shareTitle'>Recipe Preview</h1>
            <h3>{RecipeName}</h3>
            <img className='imgPreview' src={receita.imagem}/>
            <h3>{Ingredient}</h3>
            <h3>{Time}</h3>
        </div>
      </div>)
}

export default Share;

/*
<label>
Nome da Receita: <input type="text" value={add_nomeReceita} onChange= {(e) => setNomeReceita(e.target.value)} name="nomeReceita"/>
</label>
<hr />
<label>
Ingrediente: <input type="text" value={add_ingrediente} onChange= {(e) => setIngrediente(e.target.value)} name="nomeReceita"/>
</label>
<hr />
<label>
Tempo: <input type="text" value={add_tempo} onChange= {(e) => setTempo(e.target.value)} name="nomeReceita"/>
</label>
<hr />
<label>
Imagem: <input type="text" value={add_imagem} onChange= {(e) => setImagem(e.target.value)} name="nomeReceita"/>
</label>
<hr />
<button type="submit" onClick={postData}>Enviar</button>
<button type="submit" onClick={fetchData}>Mostrar</button>
<h3>{receita.nomeReceita}</h3>
<h3>{receita.ingrediente}</h3>
<h3>{receita.tempo}</h3>
<img class="boloImg" src={receita.imagem}/>
*/