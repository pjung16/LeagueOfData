import React from 'react';
import './App.css';
import 'semantic-ui-css/semantic.min.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home'
import ChampionPage from './components/ChampionPage.js'

function App() {
  return (
    <div className="App" style={{backgroundColor: '#033d45', paddingTop: '100px', minHeight: '100vh'}}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Home } />
          <Route exact path="/pairs" component={ ChampionPage } />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
