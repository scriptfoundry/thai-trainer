import React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { TEST_TYPECURRENT, TEST_TYPEOVERDUE, getCurrentPracticeWords, getOutstandingWords, getMasteredWords } from '../../services/Leitner';
import { getDayOfEpoch } from '../../services/Utils';

const getCount = words => words.length || 0;

const TestSelector = ({ setTestType, testingWordLimit, words }) => {
    const currentWords = getCurrentPracticeWords(words);
    const outstandingWords = getOutstandingWords(words, getDayOfEpoch());
    const masteredWords = getMasteredWords(words);

    const outstandingCount = getCount(outstandingWords);
    const currentCount = getCount(currentWords);
    const masteredCount = getCount(masteredWords);

    if (!outstandingCount && !currentCount && !masteredCount) {
        return <div className="navigation">
            <h1>Nothing to test</h1>
            <h2>You need to <Link to="/practice">practice</Link> before you can test</h2>
        </div>;
    }

    if (!outstandingCount && !currentCount) {
        return <div className="navigation">
            <h1>Nothing to test.</h1>
            <h2>You have mastered all words</h2>
        </div>;
    }

    return <div className="navigation">
        <h1>Test</h1>
        <h2>Select what you would like to test</h2>

        { outstandingWords.length === 0
            ? null
            : <section><Link className="button" to="/test/overdue" onClick={ () => setTestType(TEST_TYPEOVERDUE) }>Overdue words ({ outstandingCount || 'none'} available)</Link></section>
        }

        { currentWords.length === 0
            ? null
            : <section><Link className="button" to="/test/current" onClick={ () => setTestType(TEST_TYPECURRENT) }>Current practice words ({ currentCount || 'none' } available)</Link></section>
        }

        <section>
            <aside>You have selected to test only { testingWordLimit } words at a time. You can change this in <Link to='/settings'>settings</Link>.</aside>
        </section>
    </div>;
};
TestSelector.propTypes = {
    setTestType: PropTypes.func.isRequired,
    testingWordLimit: PropTypes.number.isRequired,
    words: PropTypes.array.isRequired,
};

export default withRouter(TestSelector);