import React, { useState, useEffect } from "react";
import Axios from "axios";
import "../styles/AdminDashboard.css";

function AdminDashboard() {
  // **** Login ****
  // declares a state variable "username" which will be used to check wether the account exists in the API or not
  const [username, setUsername] = useState("");
  // declares a state variable "username" which will be used to check wether the account exists in the API or not
  const [password, setPassword] = useState("");
  // declares a state variable "login" used to GET the (login) data from the API
  const [login, setLogin] = useState([]);
  // declares a state variable "loginError" which will be used in case the username/password do not match 
  const [loginError, setLoginError] = useState("");
  // declares a state variable "authenticated" which will if the user logins or not
  const [authenticated, setAuthenticated] = useState(false);
  // **** Manage Admin Account ****
  // declares a state variable "newUsername" which will be used to create a new user account
  const [newUsername, setNewUsername] = useState("");
  // declares a state variable "newPassword" which will be used to create a new user account
  const [newPassword, setNewPassword] = useState("");
  // declares a state variable "selectedUser" which will take the value of "username" from a specific user
  const [selectedUser, setSelectedUser] = useState("");
  // declares a state variable "searchAdminTerm" which will be used to use the (admin) search bar
  const [searchAdminTerm, setSearchAdminTerm] = useState("");
  // **** Manage Cake Recipes ****
  // declares a state variable "receitas"  used to GET the (cake) data from the API
  const [receitas, setReceitas] = useState([]);
  // declares a state variable "searchTerm" which will be used to use the (recipes) search bar
  const [searchTerm, setSearchTerm] = useState("");
  // declares a state variable "selectedRecipe" which will take the value of "nomeReceita" from a specific recipe
  const [selectedRecipe, setSelectedRecipe] = useState("");
  // declares a state variable "newNomeReceita" which will be used to change "nomeReceita" of an existing recipe to newNomeReceita
  const [newNomeReceita, setnewNomeReceita] = useState("");

  // ************* Login ****************
  // determines whether a user gets access to the admin dashboard or not
  const handleLogin = () => {
    // checks if the username and password match with the ones in the API
    const user = login.find(
      (user) => user.username === username && user.password === password
    );

    if (user) {
      // Successful login
      setAuthenticated(true);
      setLoginError("");
    } else {
      // Invalid User
      setAuthenticated(false);
      setLoginError("Wrong Credentials.");
    }
  };
  
  // fetches the data user data from the API (GET)
  const fetchData = () => {
    
    Axios.get("https://sheetdb.io/api/v1/j5mbez4g3l1l0?sheet=userLogin").then(
      (res) => {
        setLogin(res.data);
      }
    );
  };

  // ************* Admin ****************
  // adds a new admin to the API (POST)
  const addAdmin = () => {
    fetch("https://sheetdb.io/api/v1/j5mbez4g3l1l0?sheet=userLogin", {
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
      .then((data) =>{
        console.log(data);
        // Atualiza a data
        fetchData();
      })
  };

  // removes an existing user from the API (REMOVE)
  const removeAdmin = () => {
    if (selectedUser) {
      fetch(
        `https://sheetdb.io/api/v1/j5mbez4g3l1l0/username/${selectedUser}?sheet=userLogin`,
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

  // filters the results (when using the search bar)
  const filterAdmin = () => {
    return login.filter((user) =>
      user.username.toLowerCase().includes(searchAdminTerm.toLowerCase())
    );
  };

  // gets the value of "username" of a specific user and sets the selectedUser to the selected one
  const selectUser = (user) => {
    setSelectedUser(user);
    if (selectedUser) {
      console.log(selectedUser);
    } else {
      console.log("Error.");
    }
  };
  // ************* Recipes ****************

  // gets the value of "selectRecipe" of a specific user and sets the selectRecipe to the selected one
  const selectRecipe = (nomeReceita) => {
    setSelectedRecipe(nomeReceita);
    if (selectRecipe) {
      console.log(selectedRecipe);
    } else {
      console.log("Error.");
    }
  };

  // removes a recipe from the API (DELETE)
  const removeRecipe = (nomeReceita) => {
    if (nomeReceita) {
      fetch(
        `https://sheetdb.io/api/v1/j5mbez4g3l1l0/nomeReceita/${nomeReceita}`,
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
          // updates the data
          fetchCakeData();
          setSelectedRecipe("");
        })
        .catch((error) => {
          console.error("Error deleting recipe:", error);
        });
    }
  };

  // Updates a recipe (only "nomeReceita") in the API (PATCH)
  const updateRecipe = () => {
    if (selectedRecipe && newNomeReceita) {
      fetch(
        `https://sheetdb.io/api/v1/j5mbez4g3l1l0/nomeReceita/${selectedRecipe}`,
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
          // updates the cake data
          fetchCakeData();
        });
    }
  };

  // gets the recipes data
  const fetchCakeData = () => {
    Axios.get("https://sheetdb.io/api/v1/j5mbez4g3l1l0?sheet=ctgBolos").then(
      (res) => {
        setReceitas(res.data);
      }
    );
  };

  // filters the results (when using the search bar)
  const filterRecipes = () => {
    return receitas.filter((receita) =>
      receita.nomeReceita.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  // calls both functions right when this tab is opened
  useEffect(() => {
    fetchCakeData();
    fetchData();
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
            <input
                id="searchRecipeUpdate"
                placeholder="Search for a specific admin!"
                onChange={(e) => setSearchAdminTerm(e.target.value)}
              />
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
