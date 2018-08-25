import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Preview from './Preview';
import CardContainer from './CardContainer';
import SoundsContainer from './SoundsContainer';

class Practice extends Component {
    componentWillMount() {
        const { practiceWordLimit, seedPractice, words } = this.props;

        seedPractice(words, practiceWordLimit);
    }
    componentWillUnmount() {
        this.props.closePractice();
    }

    render() {
        const { match: { params }, ...props } = this.props;
        const subview = params.type || null;

        return (<div className="practice">
        <Link className="test-button" to="/test/current">Test now <span className="icon">〉</span></Link>
        <h1>Practice</h1>
        {
            subview === 'full' ? <CardContainer { ...props } />
            : subview === 'sounds-only' ? <SoundsContainer { ...props } />
            : <Preview { ...props } />
        }
    </div>);

    }
}

Practice.propTypes = {
    match: PropTypes.shape({ params: PropTypes.object.isRequired }).isRequired,
    practiceWordLimit: PropTypes.number.isRequired,
    seedPractice: PropTypes.func.isRequired,
    closePractice: PropTypes.func.isRequired,
    words: PropTypes.array.isRequired,
};

export default Practice;