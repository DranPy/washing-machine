import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import "./App.css";
import MainMenu from './components/MainMenu'; 
import { Reservations } from "./components";
import Users from "./pages/Users";


export default class App extends Component {
  render() {
    return (
      <Router> 
        <div className="App">
          <header className="App-header">
            <MainMenu />
          </header>
          <Switch>
            <Route path="/" exact component={Reservations} />
            <Route path="/users" component={Users} />
          </Switch>
        </div>
      </Router>
    );
  }
}
