import React from 'react';
import './App.css';
import 'semantic-ui-css/semantic.min.css';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Header from './components/Header.js';
import Home from './components/Home';
import ChampionPage from './components/ChampionPage';
import BestTeamsPage from './components/BestTeamsPage';

function App() {
  return (
    <div>
      <div className="App">
        <HashRouter>
          <Header />
          <Switch>
            <Route exact path="/" component={ Home } />
            <Route path="/pairs" component={ ChampionPage } />
            <Route exact path="/bestTeams" component= { BestTeamsPage } />
          </Switch>
        </HashRouter>
      </div>
    </div>
  );
}

export default App;
