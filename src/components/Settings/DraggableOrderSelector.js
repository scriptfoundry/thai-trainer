import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { moveArrayItem } from '../../services/Utils';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const grid = 8;
const getListStyle = isDraggingOver => ({
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: isDraggingOver ? '#999' : '#ddd',
    padding: grid,
    width: 250,
});
const getItemStyle = (isDragging, draggableStyle, disabled) => ({
    userSelect: 'none',
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,
    background: isDragging ? '#73959a' : disabled ? '#eee' : '#c8dbde',
    color: isDragging ? '#fff' : disabled ? '#ccc' : 'initial',
    textAlign: 'center',
    ...draggableStyle,
});

export default class DragDropSorter extends Component {
    constructor(...args) {
        super(...args);

        this.onDragEnd = this.onDragEnd.bind(this);
    }
    onDragEnd({ source, destination }) {
        if (!destination) return;
        const order = moveArrayItem(this.props.order, source.index, destination.index);
        this.props.onChange(order);
    }
    render() {
        const { disabled } = this.props;
        return <DragDropContext onDragEnd={ this.onDragEnd }>
             <Droppable droppableId="droppable" isDropDisabled={ disabled }>
                 {(provided, snapshot) => <div ref={ provided.innerRef } style={ getListStyle(snapshot.isDraggingOver) }>
                    {
                        this.props.order.map((childOrder, index) => <Draggable key={childOrder} draggableId={childOrder} index={index} isDragDisabled={ disabled }>
                            {(provided, snapshot) => <div ref={ provided.innerRef } { ...provided.draggableProps } { ...provided.dragHandleProps } style={ getItemStyle(snapshot.isDragging, provided.draggableProps.style, disabled) } >{ childOrder }</div>}
                        </Draggable>)
                    }
                 </div>}
             </Droppable>
        </DragDropContext>;
    }
}

DragDropSorter.propTypes = {
    disabled: PropTypes.bool.isRequired,
    order: PropTypes.arrayOf(PropTypes.string).isRequired,
    onChange: PropTypes.func.isRequired,
};