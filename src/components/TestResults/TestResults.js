import React from 'react';
import PropTypes from 'prop-types';
import Item from './Item';

const TestResult = ({saveTest, testWords, scores}) => {
    const items = testWords.map(testWord => {
        const aspectScores = scores.reduce((aspectScores, { id, score, aspect }) => {
            if (id === testWord.id) aspectScores[aspect] = score;

            return aspectScores;
        }, [0, 0]);

        return <Item key={ testWord.id } word={ testWord } aspectScores={ aspectScores } />;
    });

    return <div className="test-results">
        <h1>Results</h1>
        <section>
            <button className="save-button" onClick={ () => saveTest(scores) }>Save results</button>
        </section>
        <section className="items">
            <div className="result header">
                <div></div>
                <div>Reading</div>
                <div>Comprehension</div>
            </div>
            { items }
        </section>
    </div>;
};

TestResult.propTypes = {
    pronunciationType: PropTypes.string.isRequired,
    queue: PropTypes.array.isRequired,
    scores: PropTypes.arrayOf(PropTypes.object).isRequired,
    testWords: PropTypes.array.isRequired,
    saveTest: PropTypes.func.isRequired,
};

export default TestResult;
