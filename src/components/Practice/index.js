import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class Practice extends PureComponent {
    constructor(...args) {
        super(...args);
        this.state = {
            words: []
        };
    }

    render() {
        return <div>Practice</div>;
    }
}

Practice.propTypes = {

};