import React from 'react';
import PropTypes from 'prop-types';
import { TEST_TYPECURRENT, TEST_TYPEOVERDUE, getCurrentPracticeWords, getOutstandingWords, getMasteredWords } from '../../services/Leitner';
import { getDayOfEpoch } from '../../services/Utils';

const getCount = words => words.length || 0;

const TestSelector = ({ changeView, words, setTestType, testingWordLimit }) => {
    const currentWords = getCurrentPracticeWords(words);
    const outstandingWords = getOutstandingWords(words, getDayOfEpoch());
    const masteredWords = getMasteredWords(words);

    const outstandingCount = getCount(outstandingWords);
    const currentCount = getCount(currentWords);
    const masteredCount = getCount(masteredWords);

    const backButton = <button className="back-button" onClick={ () => changeView('navigation') }>Back</button>;

    if (!outstandingCount && !currentCount && !masteredCount) {
        return <div className="test-selector">
            <h1>What would you like to test?</h1>
            { backButton }
            <h2>Nothing to test</h2>
            <h3>You need to practice before you can test</h3>
        </div>;
    }

    if (!outstandingCount && !currentCount) {
        return <div className="test-selector">
            <h1>What would you like to test?</h1>
            { backButton }
            <h1>Nothing to practice.</h1>
            <h2>You have mastered all words</h2>
        </div>;
    }

    return <div className="test-selector">
        <section>
            <h1>Test</h1>
            <h2>Select what you would like to test</h2>
        </section>
        <button disabled={ outstandingWords.length === 0 } onClick={ () => setTestType(TEST_TYPEOVERDUE) }>Overdue words ({ outstandingCount || 'none'} available)</button>
        <button disabled={ currentWords.length === 0 } onClick={ () => setTestType(TEST_TYPECURRENT) }>Current practice words ({ currentCount || 'none' } available)</button>
        <section>
            <aside>You have selected to test only { testingWordLimit } words at a time. You can change this in <span onClick={ () => changeView('settings') }>settings</span>.</aside>
        </section>
    </div>;
};
TestSelector.propTypes = {
    changeView: PropTypes.func.isRequired,
    setTestType: PropTypes.func.isRequired,
    testingWordLimit: PropTypes.number.isRequired,
    words: PropTypes.array.isRequired,
};

export default TestSelector;