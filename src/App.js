import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { operations } from './store';
import Loading from './components/Loading';
import Navigation from './components/Navigation';
import Progress from './components/Progress';
import Settings from './components/Settings';

class App extends Component {
  async componentDidMount() {
    const { changeView, initializeWordsManager, initializeVoiceManager } = this.props;

    await initializeVoiceManager();
    await initializeWordsManager();

    changeView('navigation');
  }

  render() {
    let { loaded, view } = this.props;
    let content = null;

    if (!loaded) content = <Loading/>;
    else if (view === 'settings') content = <Settings />;
    else if (view === 'navigation') content = <Navigation />;
    else if (view === 'progress') content = <Progress />;

    return (
      <div className="App">
        <header>
          { content }
        </header>
      </div>
    );
  }
}

App.propTypes = {
  loaded: PropTypes.bool.isRequired,
  view: PropTypes.string
};

const { changeView, initializeWordsManager, initializeVoiceManager } = operations;

const mapStateToProps = (state) => ({
  loaded: state.words.wordsLoaded,
  view: state.view.currentView,

  thaiVoice: state.voice.thaiVoice
});

export default connect(mapStateToProps, { changeView, initializeWordsManager, initializeVoiceManager })(App);
