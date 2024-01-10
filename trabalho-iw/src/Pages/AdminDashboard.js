import React, { useState, useEffect } from "react";
import Axios from "axios";
import "../styles/AdminDashboard.css";

function AdminDashboard() {
  // Login
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState([]);
  const [loginError, setLoginError] = useState("");
  const [authenticated, setAuthenticated] = useState(true);
  // Manage Admin Account
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  // Manage Cake Recipes
  const [receitas, setReceitas] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRecipe, setSelectedRecipe] = useState("");
  const [newNomeReceita, setnewNomeReceita] = useState("");

  // ************* Login ****************
  const handleLogin = () => {
    const user = login.find(
      (user) => user.username === username && user.password === password
    );

    if (user) {
      // Usuário autenticado com sucesso
      setAuthenticated(true);
      setLoginError("");
    } else {
      // Credenciais inválidas
      setAuthenticated(false);
      setLoginError("Wrong Credentials.");
    }
  };

  const fetchData = () => {
    Axios.get("https://sheetdb.io/api/v1/e0qsyv4qfu64j?sheet=userLogin").then(
      (res) => {
        setLogin(res.data);
      }
    );
  };

  // ************* Admin ****************
  const addAdmin = () => {
    fetch("https://sheetdb.io/api/v1/e0qsyv4qfu64j?sheet=userLogin", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: [
          {
            username: newUsername,
            password: newPassword,
          },
        ],
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  };

  const removeAdmin = () => {
    if (selectedUser) {
      fetch(
        `https://sheetdb.io/api/v1/e0qsyv4qfu64j/username/${selectedUser}?sheet=userLogin`,
        {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          // Atualiza a data
          fetchData();
          setSelectedUser("");
        })
        .catch((error) => {
          console.error("Error deleting user:", error);
        });
    }
  };

  // Filters the results
  const filterAdmin = () => {
    return login.filter((user) =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const selectUser = (user) => {
    setSelectedUser(user);
    if (selectedUser) {
      console.log(selectedUser);
    } else {
      console.log("Error.");
    }
  };
  // ************* Recipes ****************

  // Selects the recipe
  const selectRecipe = (nomeReceita) => {
    setSelectedRecipe(nomeReceita);
    if (selectRecipe) {
      console.log(selectedRecipe);
    } else {
      console.log("Error.");
    }
  };

  // Removes a recipe from the API
  const removeRecipe = (nomeReceita) => {
    if (nomeReceita) {
      fetch(
        `https://sheetdb.io/api/v1/e0qsyv4qfu64j/nomeReceita/${nomeReceita}`,
        {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          // Atualiza a data
          fetchCakeData();
        })
        .catch((error) => {
          console.error("Error deleting recipe:", error);
        });
    }
  };
  // Updates a recipe from the API
  const updateRecipe = () => {
    if (selectedRecipe && newNomeReceita) {
      fetch(
        `https://sheetdb.io/api/v1/e0qsyv4qfu64j/nomeReceita/${selectedRecipe}`,
        {
          method: "PATCH",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            data: {
              nomeReceita: `${newNomeReceita}`,
            },
          }),
        }
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          // Atualiza a data
          fetchCakeData();
        });
    }
  };

  // Gets the recipes data
  const fetchCakeData = () => {
    Axios.get("https://sheetdb.io/api/v1/e0qsyv4qfu64j?sheet=ctgBolos").then(
      (res) => {
        setReceitas(res.data);
      }
    );
  };

  // Filters the results
  const filterRecipes = () => {
    return receitas.filter((receita) =>
      receita.nomeReceita.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  // Chamar a função fetchData assim que o componente for montado
  useEffect(() => {
    // fetchCakeData();
    //fetchData();
  }, []);

  return (
    <div className="AdminDashboard">
      {authenticated ? (
        <div className="adminDashboardAccess">
          <div className="editRecipe">
            <h1>Delete & Update Recipe</h1>
            <div className="showRecipe">
              <input
                id="searchRecipeUpdate"
                placeholder="Search for a specific recipe!"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {filterRecipes().map((receita, index) => (
                <div key={index} className="recipeDisplay">
                  <p>{receita.nomeReceita}</p>
                  <button onClick={() => selectRecipe(receita.nomeReceita)}>
                    Select Recipe
                  </button>
                </div>
              ))}
            </div>

            <label>
              Recipe Name:
              <input
                className="updateRecipe"
                onChange={(e) => setnewNomeReceita(e.target.value)}
              ></input>
            </label>
            <label className="lbAdmin">Selected Recipe: {selectedRecipe}</label>
            <button className="btAdmin" onClick={updateRecipe}>
              Update Recipe
            </button>
            <button
              className="btAdmin"
              onClick={() => removeRecipe(selectedRecipe)}
            >
              Delete Recipe
            </button>
          </div>
          <div className="createAdmin">
            <h1>Create New Admin User</h1>
            <label className="lbLogin">
              Username:{" "}
              <input
                type="text"
                onChange={(e) => setNewUsername(e.target.value)}
              />
            </label>
            <label className="lbLogin">
              Password:{" "}
              <input
                type="password"
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </label>
            <button className="btAdmin" onClick={addAdmin}>
              Create New Admin
            </button>
            <h1>Delete Admin User</h1>
            {filterAdmin().map((user, index) => (
              <div key={index} className="recipeDisplay">
                <p>{user.username}</p>
                <button onClick={() => selectUser(user.username)}>
                  Select User
                </button>
              </div>
            ))}
            <label className="lbAdmin">Selected User: {selectedUser}</label>
            <button className="btAdmin" onClick={removeAdmin}>
              Delete Selected Admin
            </button>
          </div>
        </div>
      ) : (
        <div className="adminLogin">
          <h1>Login</h1>
          <label className="lbLogin">
            Username:{" "}
            <input id="userText" type="text" onChange={(e) => setUsername(e.target.value)} />
          </label>
          <label className="lbLogin">
            Password:{" "}
            <input id="userPass"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <button className="btLogin" onClick={handleLogin}>
            Login
          </button>
          {loginError && <p className="error-message">{loginError}</p>}
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
