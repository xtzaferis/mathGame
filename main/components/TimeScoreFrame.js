var React = require('react');

// here we can handle time and score
var TimeScoreFrame = React.createClass({
    render: function() {
        var timeRemaining = this.props.timeRemaining,
            score = this.props.score;

        return (
            <div className="timeAndScore">
                <div className="time">
                    Time: <span>{timeRemaining}</span>
                </div>
                <div className="score">
                    Score: <span>{score}</span>
                </div>
            </div>
        )
    }
});

module.exports = TimeScoreFrame;