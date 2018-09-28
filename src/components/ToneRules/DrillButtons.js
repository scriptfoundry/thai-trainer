import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getTonesDescriptors } from '../../services/Tones';


class DrillButtons extends PureComponent {
    constructor(...args) {
        super(...args);

        this.state = {
            label: ''
        };

        this.changeLabel = this.changeLabel.bind(this);
    }
    changeLabel(label, className) {
        this.setState({ label });
        this.props.onHover(label, className);
    }
    render() {
        let {label} = this.state;
        let descriptorsList = getTonesDescriptors();
        let buttons = descriptorsList.map(({ stage, label, className }) =>
            <Link
                className="button"
                key={ stage }
                onMouseOver={ () => this.changeLabel(label, className) }
                onMouseOut={ () => this.changeLabel('') }
                to={`/basics/tones/rules/drill/${stage}`} >{stage}</Link>);

        return <div className="drill-buttons">
            <h3>Practice starting at stage:</h3>
            <div className="buttons">{ buttons }</div>
            <h4 className="labels">{ label }</h4>
        </div>;
    }
}

DrillButtons.propTypes = {
    onHover: PropTypes.func.isRequired
};
export default DrillButtons;