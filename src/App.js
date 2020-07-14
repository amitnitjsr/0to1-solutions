import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Carts from './components/Carts/Carts';
import Prod_List from './components/Prod_List/Prod_List';
import Success from './components/Success/Success';
import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Route exact path='/' component={Prod_List} />
          <Route path='/cart' component={Carts} />
          <Route path='/success_buy' component={Success} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
