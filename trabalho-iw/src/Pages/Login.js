import React from 'react';
import "../styles/Login.css";
// APIs
import Axios from "axios";
import { useState } from "react";
import { useEffect } from "react";


function Login() {

    return (
        <div className="Login">
            <h1>Login</h1>
            <label className='lbLogin'>Username: <input type="text"/></label>
            <label className='lbLogin'>Password: <input type="password"/></label>
            <button className='btLogin'>Login</button>
        </div>
    );
}

export default Login;
