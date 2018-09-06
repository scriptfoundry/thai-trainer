import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { operations } from './store';
import ScrollReset from './components/common/ScrollReset';
import Loading from './components/Loading';
import Breadcrumb from './components/Navigation/Breadcrumbs';
import MainNavigation from './components/Navigation/MainNavigation';
import NavigationBasics from './components/Navigation/BasicsNavigation';
import Progress from './components/Progress';
import Settings from './components/Settings';
import Practice from './components/Practice';
import Test from './components/Test';
import TestSelector from './components/TestSelector';
import Vowels from './components/Vowels';
import Consonants from './components/Consonants';
import Confusion from './components/Confusion';
import Tracking from './components/common/Tracking';
import NotFound from './components/NotFound';

import './styles/css/App.css';
import 'rc-slider/assets/index.css';

class App extends Component {
  async componentDidMount() {
    const { initializeWordsManager, initializeVoiceManager, initializeSettings, setApplicationReady } = this.props;

    await Promise.all([
      initializeVoiceManager(),
      initializeWordsManager(),
      initializeSettings(),
    ])
    .then(() => setApplicationReady());
  }
  render() {
    if (!this.props.applicationReady) return <Loading />;

    return <Router>
      <ScrollReset>
        <Breadcrumb />
        <Route path="*" component={Tracking} />
        <Switch>
          <Route path="/" exact component={MainNavigation} />
          <Route path="/basics" exact component={NavigationBasics} />
          <Route path='/basics/vowels' component={Vowels} />
          <Route path='/basics/consonantconfusion/drill-:visibleConfusion(\d)' component= {Confusion} />
          <Route path='/basics/consonantconfusion' exact component= {Confusion} />
          <Route path="/basics/consonants" component={Consonants} />
          <Route path='/progress' component={Progress} />
          <Route path='/practice/:type?' component={Practice} />
          <Route path='/test' exact component={TestSelector} />
          <Route path='/test/:type(overdue|current)' component={Test} />
          <Route path="/settings" component={Settings} />
          <Route component={NotFound} />
        </Switch>
      </ScrollReset>
    </Router>;
  }
}

App.propTypes = {
  applicationReady: PropTypes.bool.isRequired,
  setApplicationReady: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  applicationReady: state.view.applicationReady,
});

export default connect(mapStateToProps, operations)(App);
