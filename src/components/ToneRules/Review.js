import React, { PureComponent } from 'react';
import DrillButtons from './DrillButtons';
import Hint from '../common/Hint';
import { classNames } from '../../services/Utils';

class Review extends PureComponent {
    constructor(...args) {
        super(...args);

        this.state = {
            focusedStage: null,
            className: null,
        };

        this.changeFocus = this.changeFocus.bind(this);

        this.buttons = [];
    }
    changeFocus(focusedStage, className) {
        this.setState({ focusedStage, className });
    }
    render() {
        const { focusedStage, className } = this.state;

        const tableClasses = focusedStage === null ? null : classNames({
            filtered: !!className,
            [className] : !!className,
        });

        return <div className="review">
            <h1>Tones</h1>

            <Hint {...this.props} title="Hint">
                <p>Consider learning mid-class rules first. They make a great foundation! The other classes essentially &quot;borrow&quot; something from mid-class rules.</p>
                <p>On the other hand, tone-leading low-class characters are more frequent than mid- and high-class characters (according to my studies: 42% vs. 35% &amp; 23%.)</p>
            </Hint>

            <h2>Rules for syllables with no tone markers</h2>
            <table className={ tableClasses }>
                <thead>
                    <tr>
                        <th></th>
                        <th colSpan="3">Live</th>
                        <th colSpan="3">Dead</th>
                    </tr>
                    <tr>
                        <th></th>
                        <th colSpan="3">Open + Long / Closed with Sonorant</th>
                        <th>Open + short</th>
                        <th>Closed + short</th>
                        <th>Closed + long</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th className="high">High</th>
                        <td colSpan="3" className="c-1 c-4 c-9">R</td>
                        <td colSpan="3" className="c-2 c-3 c-4 c-9">L</td>
                    </tr>
                    <tr>
                        <th className="mid">Mid</th>
                        <td colSpan="3" className="c-1 c-4 c-8"></td>
                        <td colSpan="3" className="c-2 c-3 c-4 c-8">L</td>
                    </tr>
                    <tr>
                        <th className="low">Low</th>
                        <td colSpan="3" className="c-1 c-4 c-7"></td>
                        <td colSpan="2" className="c-2 c-3 c-4 c-7">H</td>
                        <td className="c-3 c-4 c-7">F</td>
                    </tr>
                </tbody>
            </table>

            <h2>Rules for syllables with tone markers</h2>
            <table className={ tableClasses }>
                <thead>
                <tr>
                        <th></th>
                        <th>อ่</th>
                        <th>อ้</th>
                        <th>อ๊</th>
                    <th>อ๋</th>
                </tr>
                <tr>
                    <th></th>
                    <th>Mai ek</th>
                    <th>Mai tho</th>
                    <th>Mai tri</th>
                    <th>Mai chattawa</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th className="high">High</th>
                    <td className="c-5 c-6 c-9">L</td>
                    <td className="c-5 c-6 c-9">F</td>
                    <td><span role="img" aria-label="N/A">&#x1F6AB;</span></td>
                    <td><span role="img" aria-label="N/A">&#x1F6AB;</span></td>
                </tr>
                <tr>
                    <th className="mid">Mid</th>
                    <td className="c-5 c-6 c-8">L</td>
                    <td className="c-5 c-6 c-8">F</td>
                    <td className="c-6 c-8">H</td>
                    <td className="c-6 c-8">R</td>
                </tr>
                <tr>
                    <th className="low">Low</th>
                    <td className="c-5 c-6 c-7">F</td>
                    <td className="c-5 c-6 c-7">H</td>
                    <td><span role="img" aria-label="N/A">&#x1F6AB;</span></td>
                    <td><span role="img" aria-label="N/A">&#x1F6AB;</span></td>
                </tr>
            </tbody>
        </table>

        <DrillButtons onHover={ this.changeFocus } />
    </div>;
    }
}

export default Review;