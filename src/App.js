import React, { Component } from 'react';
import { Link } from 'react-router';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="center">
        <h4 style={{ textDecoration: 'line-through' }}>Yatzee</h4>
        <h4 style={{ textDecoration: 'line-through' }}>Yhatzee</h4>
        <h4 style={{ textDecoration: 'line-through' }}>Yachtzee</h4>
        <h4>Something-Zee</h4>
        <Link to="/new_game" className="btn red">New Game</Link>
      </div>
    );
  }
}

export default App;
