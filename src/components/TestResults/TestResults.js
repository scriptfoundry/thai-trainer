import React from 'react';
import PropTypes from 'prop-types';
import Item from './Item';

const TestResult = ({changeView, testWords, scores, pronunciationType}) => {
    const items = testWords.map(testWord => {
        const aspectScores = scores.reduce((aspectScores, { id, score, stage }) => {
            if (id === testWord.id) aspectScores[stage] = score;

            return aspectScores;
        }, [0, 0, 0]);

        return <Item key={ testWord.id } word={ testWord } aspectScores={ aspectScores } pronunciationType={ pronunciationType } />;
    });

    return <div className="test-results">
        <button className="back-button" onClick={ () => changeView('navigation') }>Back</button>

        <h1>Results</h1>
        { items }
    </div>;
};

TestResult.propTypes = {
    pronunciationType: PropTypes.string.isRequired,
    queue: PropTypes.array.isRequired,
    scores: PropTypes.arrayOf(PropTypes.number).isRequired,
    testWords: PropTypes.array.isRequired,
    words: PropTypes.array.isRequired,
    changeView: PropTypes.func.isRequired,
};

export default TestResult;
