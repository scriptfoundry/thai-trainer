import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { PRONUNCIATIONTYPE_IPA, PRONUNCIATIONTYPE_PAIBOON } from '../../services/WordManager';
import CategoryPicker from './CategoryPicker';
import ConsonantList from './ConsonantList';

class Consonants extends Component {
    constructor(...args) {
        super(...args);

        this.state = {
            filter: null
        };
    }
    componentDidMount() {
        this.props.initializeConsonants();
    }
    componentWillUnmount() {
        this.props.clearSounds();
    }

    render() {
        const { consonantKeys, consonants, pronunciationType, showConsonantsByKey, visibleConsonantKey } = this.props;

        return <div className="consonants">
            <h1>All consonants</h1>
            <CategoryPicker consonantKeys={ consonantKeys } showConsonantsByKey={ showConsonantsByKey } visibleConsonantKey={ visibleConsonantKey } />
            <ConsonantList consonants={consonants} consonantKeys={consonantKeys} visibleConsonantKey={visibleConsonantKey} pronunciationType={ pronunciationType } />
        </div>;
    }
}

Consonants.propTypes = {
    clearSounds: PropTypes.func.isRequired,
    consonantKeys: PropTypes.object,
    consonants: PropTypes.object.isRequired,
    initializeConsonants: PropTypes.func.isRequired,
    pronunciationType: PropTypes.oneOf([ PRONUNCIATIONTYPE_IPA, PRONUNCIATIONTYPE_PAIBOON ]).isRequired,
    showConsonantsByKey: PropTypes.func.isRequired,
    visibleConsonantKey: PropTypes.string,
};

export default Consonants;