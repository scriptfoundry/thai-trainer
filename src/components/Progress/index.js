import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { operations } from '../../store';
import { memoize, getDayOfEpoch } from '../../services/Utils';
import ProgressItem from './ProgressItem';

import './Progress.css';

const getItems = memoize((words, pronunciationType) => words.map(word => <ProgressItem key={word.id} word={word} pronunciationType={ pronunciationType } />, 1));

class Progress extends Component {
    render() {
        const { words, pronunciationType } = this.props;
        const items = getItems(words, pronunciationType);

        return <div className="progress">
            <h1>Progress</h1>
            <div className="progress-items">
                { items }
            </div>
        </div>;
    }
}
Progress.propTypes = {
    words: PropTypes.array.isRequired,
    pronunciationType: PropTypes.string.isRequired,
    changeView: PropTypes.func.isRequired

};
const mapStateToProps = state => ({
    words: state.words.words,
    pronunciationType: state.settings.pronunciationType,
});

const { changeView } = operations;
export default connect(mapStateToProps, { changeView })(Progress);