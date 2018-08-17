import React from 'react';
import PropTypes from 'prop-types';
import ProgressItem from './ProgressItem';

const WordsTable = ({pronunciationType, showProgress, visibleWords}) => {
    const items = visibleWords.map(word => <ProgressItem word={ word } key={ word.id } pronunciationType={ pronunciationType } showProgress={ showProgress } />);
    const className = showProgress ? 'words-table' : 'words-table no-progress';
    return <div className={ className }>
        <table>
            <thead>
                <tr>
                    <th>Term</th>
                    <th>Thai</th>
                    <th>Pronunciation</th>
                    { showProgress ? <th>Progress</th> : null }
                </tr>
            </thead>
            <tbody>
                { items }
            </tbody>
        </table>
    </div>;
};

WordsTable.propTypes = {
    pronunciationType: PropTypes.string.isRequired,
    showProgress: PropTypes.bool,
    visibleWords: PropTypes.array.isRequired,
};
WordsTable.defaultProps = {
    showProgress: true
};

export default WordsTable;