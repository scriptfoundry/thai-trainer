import { connect } from 'react-redux';
import { operations } from '../../store';
import Practice from './Practice';

const mapStateToProps = ({ words, settings }) => ({
    currentIndex: words.currentIndex,
    currentStage: words.currentStage,
    queue: words.queue,
    words: words.words,
    practiceWordLimit: settings.practiceWordLimit,
    pronunciationType: settings.pronunciationType,
});

const { changeView, seedPractice, advancePractice, nudgePractice, closePractice } = operations;

export default connect(mapStateToProps, { changeView, seedPractice, advancePractice, nudgePractice, closePractice })(Practice);