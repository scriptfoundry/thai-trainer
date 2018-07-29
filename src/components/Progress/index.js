import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { operations } from '../../store';
import { memoize, getDayOfEpoch } from '../../services/Utils';

class Progress extends Component {
    render() {
        return <div>Progress</div>;
    }
}

const mapStateToProps = state => ({
    words: state.words.words
});
export default connect(mapStateToProps)(Progress);