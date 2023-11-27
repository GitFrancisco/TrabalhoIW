import './App.css';
import Axios from "axios";
import { useState } from "react";
import Navbar from './components/Navbar';

function App() {
  const [receita, setReceita] = useState("");

  //Axios.get("https://catfact.ninja/fact").then((res) => {
  //  setReceita(res.data.fact);
  //});

  Axios.get("https://api.sheety.co/7a067a08c05347be6ceb18c1b3f63c24/baseDeDadosTrabalhoIw/página1").then((res) => {
    setReceita(res.data.página1[0].nomeReceita);
  });

  return (
    <div className="App">
      <p>{receita}</p>
    </div>
  );
}

export default App;
