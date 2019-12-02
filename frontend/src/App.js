import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ChampionTable from './components/ChampionTable.js'
import PairTable from './components/PairTable.js'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ ChampionTable } />
          <Route exact path="/pairs" component={ PairTable } />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
