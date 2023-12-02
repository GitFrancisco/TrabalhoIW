import './App.css';
import Axios from "axios";
import { useState } from "react";
import Navbar from './components/Navbar';

function App() {
  const [receita, setReceita] = useState("");

  const fetchData = () => {
    Axios.get("https://api.sheety.co/7a067a08c05347be6ceb18c1b3f63c24/baseDeDadosTrabalhoIw/página1").then((res) => {
      setReceita(res.data.página1[2]);
    });
  };

  const postData = () => {
    // Aqui você pode criar um objeto com os dados que deseja enviar
    const dataToPost = {
      "nomeReceita": "Bolo de Koala",
      "ingrediente": "Koala",
      "tempo": "200 segundos",
      "imagem": "https://c02.purpledshub.com/uploads/sites/62/2022/09/Koala.-GettyImages-1266039701-46f8a64.jpg?w=1029&webp=1",
      "id" : 10
    };

    // Use Axios.post para enviar dados
    Axios.post("https://api.sheety.co/7a067a08c05347be6ceb18c1b3f63c24/baseDeDadosTrabalhoIw/página1", { página1: [dataToPost] })
      .then((res) => {
        console.log("Dados postados com sucesso:", res.data);
        // Atualize o estado com os dados recém-postados, se necessário
        setReceita(dataToPost);
      })
      .catch((error) => {
        console.error("Erro ao postar dados:", error);
      });
  };

  return (
    <div className="App">
      <button onClick={postData}></button>
      <h3>{receita.nomeReceita}</h3>
      <img class="boloImg" src={receita.imagem}/>
    </div>
  );
}

export default App;
