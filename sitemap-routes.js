import React from 'react';
import Meme from './src/Meme/Meme';
import MemeGenerated from './src/MemeGenerated/MemeGenerated';
import { Switch, Route } from 'react-router-dom';
import './styles.module.css';

export default App = () => {
  return (
    <Route>
      <Route exact path="/">
        <Meme></Meme>
      </Route>
      <Route path="/generated">
        <MemeGenerated />
      </Route>
    </Route>
  );
};
