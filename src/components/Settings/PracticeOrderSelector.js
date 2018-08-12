import React from 'react';
import PropTypes from 'prop-types';
import DraggableOrderSelector from './DraggableOrderSelector';
const PracticeOrderSelector = ({ changePracticeDisplayOrder, practiceAllAtOnce, practiceOrder }) => (<div>
    <h2>Practice Reveal Order</h2>
    <div className="all-at-once"><input type="checkbox" id="practiceAllAtOnce" checked={ !practiceAllAtOnce } onChange={ () => changePracticeDisplayOrder( { practiceAllAtOnce: !practiceAllAtOnce } ) } name="toggle" /> <label htmlFor="practiceAllAtOnce">Reveal words incrementally in the following order</label></div>

    <DraggableOrderSelector className="practice-order-selector" order={ practiceOrder } onChange={ practiceOrder => changePracticeDisplayOrder({ practiceOrder }) } disabled={ practiceAllAtOnce }></DraggableOrderSelector>
</div>);

PracticeOrderSelector.propTypes = {
    changePracticeDisplayOrder: PropTypes.func.isRequired,
    practiceWordLimit: PropTypes.number.isRequired,
    practiceOrder: PropTypes.arrayOf(PropTypes.string).isRequired,
    practiceAllAtOnce: PropTypes.bool.isRequired,
};

export default PracticeOrderSelector;