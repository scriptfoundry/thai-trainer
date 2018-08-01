import { connect } from 'react-redux';
import { operations } from '../../store';
import Practice from './Practice';

const mapStateToProps = ({ practice, settings, words }) => ({
    currentIndex: practice.currentIndex,
    currentStage: practice.currentStage,
    queue: practice.queue,
    words: words.words,
    practiceWordLimit: settings.practiceWordLimit,
    pronunciationType: settings.pronunciationType,
});

const { changeView, seedPractice, advancePractice, nudgePractice, closePractice } = operations;

export default connect(mapStateToProps, { changeView, seedPractice, advancePractice, nudgePractice, closePractice })(Practice);