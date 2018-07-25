import React, { Component } from 'react';
import { loadLatestWords } from './services/WordManager';

class App extends Component {
  constructor(...args) {
    super(...args);

    this.state = { words: [] };
  }

  async componentDidMount() {
    let words = await loadLatestWords();
    this.setState({ words });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          hi
        </p>
      </div>
    );
  }
}

export default App;
