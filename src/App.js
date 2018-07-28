import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { operations } from './store';

class App extends Component {
  async componentDidMount() {
    const { dispatch } = this.props;

    await dispatch(operations.initializeWordsManager());

    dispatch(operations.changeView('boo'));
  }

  render() {
    return (
      <div className="App">
        <header>
          Home
        </header>
      </div>
    );
  }
}
App.propTypes = {
  dispatch: PropTypes.func.isRequired,
};


export default connect()(App);
