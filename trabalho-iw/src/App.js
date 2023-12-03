import './App.css';
import Axios from "axios";
import { useState } from "react";
import Navbar from './components/Navbar';

function App() {
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
      setReceita(res.data[4]);
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
    <div className="App">
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
    </div>
  );
}

export default App;


