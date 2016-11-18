import React from 'react';
import { Route } from 'react-router';
import App from './App';
import Game from './Game';

export default (
  <Route>
    <Route path="/" component={App} />
    <Route path="/new_game" component={Game} />
  </Route>
);
