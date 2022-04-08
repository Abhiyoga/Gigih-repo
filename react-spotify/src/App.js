import "./App.css";
import React from 'react'
import { SearchProvider } from "./context/useSearchResult"
import { ApiProvider } from "./context/useStoreApi"
import Home from "./page/home";
import MainApp from "./page/app";
import { useSelector } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

function App() {
  const token = useSelector(state => state.auth.token)
  return (
    <div className="App flex flex-col min-h-screen">
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
    </div>
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
