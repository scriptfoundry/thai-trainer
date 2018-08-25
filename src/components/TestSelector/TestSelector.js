import React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { getCurrentPracticeWords, getOutstandingWords, getMasteredWords } from '../../services/Leitner';
import { getDayOfEpoch } from '../../services/Utils';

const getCount = words => words.length || 0;

const TestSelector = ({ testingWordLimit, words }) => {
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
            : <section><Link className="button" to="/test/overdue">Overdue words ({ outstandingCount || 'none'} available)</Link></section>
        }

        { currentWords.length === 0
            ? null
            : <section><Link className="button" to="/test/current">Current practice words ({ currentCount || 'none' } available)</Link></section>
        }

        <section>
            <aside>According to your <Link to='/settings'>settings</Link>, tests will cover a maximum of { testingWordLimit } words at a time. It is important to set the right value. Too high and tests will take too long and you&apos;ll not enjoy doing them. Too low, and they won&apos;t be a challenge</aside>
        </section>
    </div>;
};
TestSelector.propTypes = {
    setTestType: PropTypes.func.isRequired,
    testingWordLimit: PropTypes.number.isRequired,
    words: PropTypes.array.isRequired,
};

export default withRouter(TestSelector);