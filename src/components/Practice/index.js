import { connect } from 'react-redux';
import { operations } from '../../store';
import Practice from './Practice';

import './Practice.css';

const mapStateToProps = ({ words, settings, view }) => ({
    currentIndex: words.currentIndex,
    currentStage: words.currentStage,
    queue: words.queue,
    words: words.words,
    practiceWordLimit: settings.practiceWordLimit,
    pronunciationType: settings.pronunciationType,
    practiceOrder: settings.practiceOrder,
    practiceAllAtOnce: settings.practiceAllAtOnce,
    subview: view.subview
});

const { seedPractice, advancePractice, nudgePractice, closePractice, changeSubview } = operations;

export default connect(mapStateToProps, { seedPractice, advancePractice, nudgePractice, closePractice, changeSubview })(Practice);