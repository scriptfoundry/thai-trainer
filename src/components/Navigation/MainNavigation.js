import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const Navigation = ({ changeView }) => {
        return <Fragment>
            <h1>Thai reading tutor</h1>
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
                <button onClick={ () => changeView('basics') }>Thai basics</button>
            </section>
            <section>
                <button onClick={ () => changeView('settings') }>Settings</button>
            </section>
        </Fragment>;
};

Navigation.propTypes = {
    changeView: PropTypes.func.isRequired
};

export default Navigation;