import React from 'react';
import PropTypes from 'prop-types';
import PlayButton from '../common/PlayButton';

const rxUnaspriated = /[ปบฏตฎดจก]/;
const rxAspirated = /[ผพภฐฑฒถทธฉชฌขคฅฆ]/;

const ConsonantGroup = ({ groupName, consonants }) => {
    const items = consonants.map(({character, consonant}, index) => {
        const className = rxUnaspriated.test(character) ? 'unaspirated'
        : rxAspirated.test(character) ? 'aspirated'
        : null;

        return <div key={ index } className={ className }>
            <h3>{ character }</h3>
            <p>{ consonant[4] } <PlayButton word={{ thai: consonant[4] }} /></p>
        </div>;

    });

    return <section>
        <h2>{ groupName }</h2>
        <div className="characters">
            { items }
        </div>
    </section>;
};

ConsonantGroup.propTypes = {
    groupName: PropTypes.string.isRequired,
    consonants: PropTypes.array.isRequired,
};

export default ConsonantGroup;