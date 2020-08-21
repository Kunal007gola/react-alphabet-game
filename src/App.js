import React from 'react';
import logo from './logo.svg';
import './App.css';

import Game from './Game';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 style={{marginTop: 0}}>Learn ABC</h1>
      </header>
      <Game />
    </div>
  );
}

export default App;
