var React = require('react');

var TimeScoreFrame = React.createClass({
    render: function() {
        var time = this.props.timeRemaining;
        return (
            <div className="timeAndScore">
                <div className="time">
                    Time: <span>{time}</span>
                </div>
                <div className="score">
                    Score: <span>0</span>
                </div>
            </div>
        )
    }
});

module.exports = TimeScoreFrame;