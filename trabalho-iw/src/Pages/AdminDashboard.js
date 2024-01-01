import React, { useState, useEffect } from 'react';
import Axios from "axios";
import "../styles/AdminDashboard.css";

function AdminDashboard() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [login, setLogin] = useState([]);
  const [loginError, setLoginError] = useState('');
  const [authenticated, setAuthenticated] = useState(false);

  const handleLogin = () => {
    const user = login.find(user => user.username === username && user.password === password);

    if (user) {
      // Usuário autenticado com sucesso
      setAuthenticated(true);
      setLoginError('');
    } else {
      // Credenciais inválidas
      setAuthenticated(false);
      setLoginError('Wrong Credentials.');
    }
  };

  const fetchData = () => {
    Axios.get("https://sheetdb.io/api/v1/e0qsyv4qfu64j?sheet=userLogin").then(
      (res) => {
        setLogin(res.data);
      }
    );
  };

  // Chamar a função fetchData assim que o componente for montado
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="AdminDashboard">
      {authenticated ? (
        <div className="adminDashboardAcess">
          <h1>Teste</h1>
        </div>
      ) : (
        <div className="adminLogin">
          <h1>Login</h1>
          <label className='lbLogin'>Username: <input type="text" onChange={(e) => setUsername(e.target.value)} /></label>
          <label className='lbLogin'>Password: <input type="password" onChange={(e) => setPassword(e.target.value)} /></label>
          <button className='btLogin' onClick={handleLogin}>Login</button>
          {loginError && <p className="error-message">{loginError}</p>}
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
