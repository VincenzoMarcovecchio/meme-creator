import React from 'react';
import Meme from '../Meme/Meme';
import MemeGenerated from '../MemeGenerated/MemeGenerated';
import { Switch, Route } from 'react-router-dom';
import './styles.module.css';

function App() {
  return (
    <>
      <h1>Meme Creator</h1>
      <Switch>
        <Route exact path="/">
          <Meme></Meme>
        </Route>
        <Route path="/generated">
          <MemeGenerated />
        </Route>
      </Switch>
    </>
  );
}

export default App;
