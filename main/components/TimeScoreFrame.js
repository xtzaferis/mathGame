var React = require('react');

var TimeScoreFrame = React.createClass({
    render: function() {
        return (
            <div className="timeAndScore">
                <div className="time">
                    Time: 60
                </div>
                <div className="score">
                    Score: 0
                </div>
            </div>
        )
    }
});

module.exports = TimeScoreFrame;