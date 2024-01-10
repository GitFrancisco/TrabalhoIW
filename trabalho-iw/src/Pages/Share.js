import React from 'react';
import "../styles/Share.css";
import Axios from "axios";
import { useState } from "react";

function Share() {
    const [add_nomeReceita, setNomeReceita] = useState("Your Recipe Name");
    const [add_ingrediente, setIngrediente] = useState("Ingredient 1, Ingredient 2");
    const [add_tempo, setTempo] = useState("Your Time");
    const [add_descricao, setDescricao] = useState("Your Description");
    const [add_imagem, setImagem] = useState("");

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
                        'ingrediente': add_ingrediente.split(',').map(item => item.trim()),
                        'tempo': add_tempo,
                        'descricao' : add_descricao,
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
                <h3>{add_descricao}</h3>
                <h3>{add_tempo}</h3>
            </div>
        </div>
    )
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
            <label className='lbRecipe'>Image: <input id="fileUpload" type="file" onChange={e => uploadImage(e)}/></label>


<label className='lbRecipe'>Image: <input type="text" value={add_imagem} onChange= {(e) => setImagem(e.target.value)} name="nomeReceita"/></label>
*/