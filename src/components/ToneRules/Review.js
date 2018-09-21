import React from 'react';
import { Link } from 'react-router-dom';
import Hint from '../common/Hint';

const Review = (props) => <div className="review">
    <h1>Tones</h1>

    <Hint {...props} title="Hint">
        <p>Consider learning mid-class rules first. They make a great foundation! The other classes essentially &quot;borrow&quot; something from mid-class rules.</p>
        <p>On the other hand, tone-leading low-class characters are more frequent than mid- and high-class characters (according to my studies: 42% vs. 35% &amp; 23%.)</p>
    </Hint>

    <h2>Rules for syllables with no tone markers</h2>
    <table>
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
                <td colSpan="3">R</td>
                <td colSpan="3">L</td>
            </tr>
            <tr>
                <th className="mid">Mid</th>
                <td colSpan="3"></td>
                <td colSpan="3">L</td>
            </tr>
            <tr>
                <th className="low">Low</th>
                <td colSpan="3"></td>
                <td colSpan="2">H</td>
                <td>F</td>
            </tr>
        </tbody>
    </table>

    <h2>Rules for syllables with tone markers</h2>
    <table>
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
                <td>L</td>
                <td>F</td>
                <td><span role="img" aria-label="N/A">&#x1F6AB;</span></td>
                <td><span role="img" aria-label="N/A">&#x1F6AB;</span></td>
            </tr>
            <tr>
                <th className="mid">Mid</th>
                <td>L</td>
                <td>F</td>
                <td>H</td>
                <td>R</td>
            </tr>
            <tr>
                <th className="low">Low</th>
                <td>F</td>
                <td>H</td>
                <td><span role="img" aria-label="N/A">&#x1F6AB;</span></td>
                <td><span role="img" aria-label="N/A">&#x1F6AB;</span></td>
            </tr>
        </tbody>
    </table>

    <div className="drill-buttons">
        <Link className="button" to="/basics/tones/rules/drill/low">Drill Low</Link>
        <Link className="button" to="/basics/tones/rules/drill/mid">Drill Mid</Link>
        <Link className="button" to="/basics/tones/rules/drill/high">Drill High</Link>
    </div>
    <div className="drill-buttons">
        <Link className="button" to="/basics/tones/rules/drill/all">Drill All</Link>
    </div>
</div>;

export default Review;