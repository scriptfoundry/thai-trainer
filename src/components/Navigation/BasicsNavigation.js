import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const Navigation = ({ changeView }) => {
        return <Fragment>
            <h1>Thai Basics</h1>
            <section>
                <button onClick={ () => changeView('vowels') }>Review vowels</button>
            </section>
            <section>
                <button onClick={ () => changeView('consonants') }>Review consonants</button>
            </section>
            <section>
                <button onClick={ () => changeView('confusion') }>Disentangle consonants</button>
            </section>
        </Fragment>;
};

Navigation.propTypes = {
    changeView: PropTypes.func.isRequired,
};

export default Navigation;