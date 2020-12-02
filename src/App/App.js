import React from 'react';
import Meme from '../Meme/Meme';
import MemeGenerated from '../MemeGenerated/MemeGenerated';
import { Switch, Route } from 'react-router-dom';
import Layout from '../Layout';
import Videogames from '../Videogames/Videogames';
import './styles.module.css';

function App() {
  return (
    <>
      <h1>Meme Creator & more...</h1>
      <Switch>
        <Layout>
          <Route exact path="/">
            <Meme></Meme>
          </Route>
          <Route exact path="/memes">
            <Meme></Meme>
          </Route>
          <Route exact path="/games">
            <Videogames></Videogames>
          </Route>
          <Route path="/generated">
            <MemeGenerated />
          </Route>
        </Layout>
      </Switch>
    </>
  );
}

export default App;
