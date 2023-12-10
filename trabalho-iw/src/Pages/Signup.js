import React from 'react';
import "../styles/Signup.css";
import { Link } from "react-router-dom";
// APIs
import Axios from "axios";
import { useState } from "react";
import { useEffect } from "react";


function Signup() {
    const [add_username, setUsername] = useState("");
    const [add_password, setPassword] = useState("");

    const postData = () => {
      fetch('https://sheetdb.io/api/v1/e0qsyv4qfu64j?sheet=userLogin', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            data: [
                {
                    'username': add_username,
                    'password': add_password,
                    'adminStatus': "disabled"
                }
            ]
        })
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
    }
  
    return (
        <div className="Signup">
            <h1>Signup</h1>
            <label className='lbSignup'>Username: <input value={add_username} onChange= {(e) => setUsername(e.target.value)}type="text"/></label>
            <label className='lbSignup'>Password: <input value={add_password} onChange= {(e) => setPassword(e.target.value)}type="password"/></label>
            <button className='btSignup' onClick={postData}>Signup</button>
            <p>Already have an account? Click the button below to login!</p>
            <Link to="/login">
                <button className='btSignup'>Login</button>
            </Link>  
        </div>
    );
}

export default Signup;
