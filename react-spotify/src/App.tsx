import "./App.css";
import React from 'react'
import { SearchProvider } from "./context/useSearchResult"
import { ApiProvider } from "./context/useStoreApi"
import Home from "./page/home";
import { RootStateOrAny, useSelector } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import MainApp from "./page/app";

function App() {
  const token = useSelector((state: RootStateOrAny) => state.auth.token);
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/create-playlist" exact>
          {
            token === null
            ? <Redirect to="/" />
            : <MainApp />
          }
        </Route>
      </Switch>
    </Router>
  );
}

const AppContainer = () => {
  return (
    <ApiProvider>
      <SearchProvider>
        <App />
      </SearchProvider>
    </ApiProvider>
  )
}

export default AppContainer;
