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
import ConsonantNavigation from './components/Navigation/ConsonantNavigation';
import TonesNavigation from './components/Navigation/ToneNavigation';
import Progress from './components/Progress';
import Settings from './components/Settings';
import Practice from './components/Practice';
import Test from './components/Test';
import TestSelector from './components/TestSelector';
import Vowels from './components/Vowels';
import Consonants from './components/Consonants';
import Confusion from './components/Confusion';
import ConsonantClasses from './components/ConsonantClasses';
import ToneRules from './components/ToneRules';
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
          <Route path='/basics/consonants' exact component={ConsonantNavigation} />
          <Route path='/basics/consonants/confusion/drill-:visibleConfusion(\d)' component= {Confusion} />
          <Route path="/basics/consonants/review" component={Consonants} />
          <Route path='/basics/consonants/confusion' component= {Confusion} />
          <Route path="/basics/tones" exact component={TonesNavigation} />
          <Route path="/basics/tones/classes" exact component={ConsonantClasses} />
          <Route path="/basics/tones/classes/drill/:type(all|mid-high)" component={ConsonantClasses} />
          <Route path="/basics/tones/rules" exact component={ToneRules} />
          <Route path="/basics/tones/rules/drill/:type(all|low|mid|high)" component={ToneRules} />

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
