import React from 'react';
import Products from './Products.js';

class App extends React.Component {
  render() {
    return (
      <div className="container">
        <header className="App-header"><h1>Stocks App</h1></header>
        <section>
          <Products ></Products>
        </section>
      </div>
    );
  }
} 

export default App;