import React from 'react';
import "../styles/Share.css";
import { useState } from "react";

function Share() {
    // declares a state variable used in the post request (contains the name of the new recipe)
    const [add_nomeReceita, setNomeReceita] = useState("Your Recipe Name");
    // declares a state variable used in the post request (contains the list of ingredients for the new recipe)
    const [add_ingrediente, setIngrediente] = useState("Ingredient 1, Ingredient 2");
    // declares a state variable used in the post request (contains the time of the new recipe)
    const [add_tempo, setTempo] = useState("Your Time");
    // declares a state variable used in the post request (contains the description of the new recipe)
    const [add_descricao, setDescricao] = useState("Your Description");
    // declares a state variable used in the post request (contains the steps of the new recipe)
    const [add_preparacao, setPreparacao] = useState("Steps 1, Steps 2");
    // declares a state variable used in the post request (contains the link of the new recipe)
    const [add_imagem, setImagem] = useState("");

    // posts a new recipe using all the state variables above
    const postData = () => {
        fetch('https://sheetdb.io/api/v1/j5mbez4g3l1l0?sheet=ctgBolos', {
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
                        'descricao' : add_descricao,
                        'preparacao': add_preparacao,
                        'imagem': add_imagem
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
                <label className='lbRecipe'>Name: <input type="text" value={add_nomeReceita} onChange={(e) => setNomeReceita(e.target.value)} name="nomeReceita"/></label>
                <label className='lbRecipe'>Ingredients: <input type="text" value={add_ingrediente} onChange={(e) => setIngrediente(e.target.value)} name="nomeReceita"/></label>
                <label className='lbRecipe'>Time: <input type="text" value={add_tempo} onChange={(e) => setTempo(e.target.value)} name="nomeReceita"/></label>
                <label className='lbRecipe'>Image: <input type="text" value={add_imagem} onChange={(e) => setImagem(e.target.value)} name="nomeReceita"/></label>
                <label className='lbRecipe'>Steps: <input type="text" value={add_preparacao} onChange={(e) => setPreparacao(e.target.value)} name="nomeReceita"/></label>
                <label className='lbRecipe'>Description: <textarea id="textAreaStyle" cols="50" rows="10" value={add_descricao} onChange={(e) => setDescricao(e.target.value)} name="nomeReceita"/></label>

                <button id="submitButton" type="submit" onClick={postData}>Submit</button>
            </div>
            <div className="rightSideShare">
                <h1 className='shareTitle'>Recipe Preview</h1>
                <h3>{add_nomeReceita}</h3>
                <img className='imgPreview' src={add_imagem}/>
                <h3>Ingredients:</h3>
                <ul>
                    {add_ingrediente.split(',').map((ingredient, index) => (
                        <li key={index}>{ingredient.trim()}</li>
                    ))}
                </ul>
                <h3>{add_tempo}</h3>
                <h3>Description</h3>
                <p>{add_descricao}</p>
                <h3>Steps</h3>
                <ul>
                    {add_preparacao.split(',').map((preparacao, index) => (
                        <li key={index}>{preparacao.trim()}</li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Share;