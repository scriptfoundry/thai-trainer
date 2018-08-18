import React from 'react';
import PropTypes from 'prop-types';

const Navigation = ({ changeView }) => {
        return <div className="navigation">
            <h1>Thai reading tutor</h1>
            <section>
                <button onClick={ () => changeView('vowels') }>Learn vowels</button>
            </section>
            <section>
                <button onClick={ () => changeView('practice') }>Practice words</button>
            </section>
            <section>
                <button onClick={ () => changeView('testselector') }>Start test</button>
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