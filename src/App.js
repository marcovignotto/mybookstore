import React, { Fragment } from "react";
// import "./App.css";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

// import { Provider } from "react-redux";
// import store from "./store/index";

import Navbar from "./components/Navigation";
import Home from "./components/Home";
import Insert from "./components/Insert";
import Database from "./components/Database";

import { theme } from "../src/styles/Theme";

import { MuiThemeProvider } from "@material-ui/core/styles";

const App = () => {
  return (
    <Router>
      <MuiThemeProvider theme={theme}>
        <Fragment>
          <div className="container">
            <Navbar />
            <Switch>
              {/* <Route exact path="/home" component={Home} /> */}
              <Route exact path="/insert" component={Insert} />
              <Route exact path="/database" component={Database} />
              <Redirect exact from="/" to="/insert" />
            </Switch>
          </div>
        </Fragment>
      </MuiThemeProvider>
    </Router>
  );
};

export default App;
