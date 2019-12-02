import React from 'react';
import './App.css';
import { HashRouter, Route, Switch } from 'react-router-dom';
import ChampionTable from './components/ChampionTable.js'

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Switch>
          <Route exact path="/" component={ChampionTable} />
          {/* <Route exact path="/champion/:id" component={WIP} /> */}
        </Switch>
      </HashRouter>
    </div>
  );
}

export default App;
