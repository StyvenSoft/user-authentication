import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Axios from 'axios';
import Home from './components/pages/Home';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Header from './components/layout/Header';
import UserContext from './context/UserContext';

export default function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined
  });

  useEffect(() => {
    const checkLoggedIn = async () => {
      const token = localStorage.getItem("auth-token");
      
      const tokenRes = await Axios.post(
        "http://localhost:4000/users/tokenIsValid",
        null,
        { headers: { "x-auth-token": token} }
      );
      console.log(tokenRes.data);
    }
    checkLoggedIn();
  }, [input])

  return (
    <div className="App App-header">
      <BrowserRouter>
        <UserContext.Provider value={{ userData, setUserData }}>
          <Header />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/Login" component={Login} />
            <Route path="/Register" component={Register} />
          </Switch>
        </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
}

