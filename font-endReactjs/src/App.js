import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import Login from './pages/login';
import Main from './components/main';

class App extends Component {

  render() {
    return (
      <SnackbarProvider>
        <Router>
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/main">
              <Main/>
            </Route>
          </Switch>
        </Router>
      </SnackbarProvider>
    );
  }
}

export default App;
