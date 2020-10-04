import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from './components/pages/Home';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Header from './components/layout/Header';

export default function App() {
  return (
    <div className="App App-header">
      <BrowserRouter>
        <Header></Header>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/Login" component={Login} />
          <Route path="/Register" component={Register} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

