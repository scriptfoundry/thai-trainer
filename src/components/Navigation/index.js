import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { operations } from '../../store';
import { memoize, getDayOfEpoch } from '../../services/Utils';

const filterWordsByDate = memoize((words, cutoffDate) => words.filter(({dueDate}) => dueDate <= cutoffDate));
const filterWordsByAspectScore = memoize((words) => words.filter(({ aspectScores }) => aspectScores && (Math.min(...aspectScores) === 0)));
class Navigation extends Component {
    render() {
        const { changeView, words } = this.props;
        const overdueWords = filterWordsByDate(words, getDayOfEpoch());
        const ongoingWords = filterWordsByAspectScore(words);

        return <div className="navigator">
            <section>
                <h2>You have { overdueWords.length } words to test</h2>
                <button onClick={ () => changeView('boo') }>Start test</button>
            </section>
            <section>
                <h2>You are still practicing { ongoingWords.length } words</h2>
                <button>Add new words automatically and resume testing</button>
                <button>Select new words manually and resume testing</button>
                <button>Resume practicing with current cards only</button>
            </section>
            <section>
                <button onClick={ () => changeView('progress') }>View progress</button>
            </section>
            <section>
                <button onClick={ () => changeView('settings') }>Settings</button>
            </section>


        </div>;
    }
}
Navigation.propTypes = {
    changeView: PropTypes.func.isRequired,
    words: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
    words: state.words.words
});
const { changeView } = operations;
export default connect(mapStateToProps, { changeView })(Navigation);
