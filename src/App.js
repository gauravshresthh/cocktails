import React from 'react';
import Home from './pages/Home';
import About from './pages/About';
import SingleCocktail from './pages/SingleCocktail';
import Error from './pages/Error';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Navbar from './components/Navbar';

export default function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" exact component={Home} />

        <Route path="/about" component={About} />
        <Route path="/cocktail/:id" component={SingleCocktail} />
        <Route path="*" component={Error} />
      </Switch>
    </Router>
  );
}
