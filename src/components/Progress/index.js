import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { operations } from '../../store';
import Progress from './Progress';

import './Progress.css';

const mapStateToProps = state => ({
    words: state.words.words,
    pronunciationType: state.settings.pronunciationType,
    previewTab: state.view.previewTab,
});

const { changeView, changePreviewTab } = operations;
export default connect(mapStateToProps, { changeView, changePreviewTab })(Progress);