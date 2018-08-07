import React from 'react';
import PropTypes from 'prop-types';
import { memoize, getDayOfEpoch } from '../../services/Utils';

const filterWordsByDate = memoize((words, cutoffDate) => words.filter(({dueDate}) => dueDate <= cutoffDate));

const Navigation = ({ changeView, words }) => {
        const overdueWords = filterWordsByDate(words, getDayOfEpoch());

        return <div className="navigator">
            <section>
                <h2>You have { overdueWords.length } words to test</h2>
                <button onClick={ () => changeView('test') }>Start test</button>
            </section>
            <section>
                <button onClick={ () => changeView('practice') }>Practice</button>
            </section>
            <section>
                <button onClick={ () => changeView('progress') }>View progress</button>
            </section>
            <section>
                <button onClick={ () => changeView('settings') }>Settings</button>
            </section>


        </div>;
};

Navigation.propTypes = {
    changeView: PropTypes.func.isRequired,
    words: PropTypes.array.isRequired,
};

export default Navigation;