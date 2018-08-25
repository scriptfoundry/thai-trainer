import { connect } from 'react-redux';
import { operations } from '../../store';
import Practice from './Practice';

import '../../styles/css/Practice.css';

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

export default connect(mapStateToProps, operations)(Practice);