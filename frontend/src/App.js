import React from 'react';
import './App.css';
import 'semantic-ui-css/semantic.min.css';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home'
import ChampionPage from './components/ChampionPage.js'

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Switch>
          <Route exact path="/" component={ Home } />
          <Route path="/pairs" component={ ChampionPage } />
        </Switch>
      </HashRouter>
    </div>
  );
}

export default App;
