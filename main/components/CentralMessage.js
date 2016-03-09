var React = require('react');

var CentralMessage = React.createClass({
    render: function() {
        var playing = this.props.playing;
        var score = this.props.score;
        
        if (playing) { // if the user was playing and the time is over
           return (
                <div className="central">
                    <div>Game Over</div>
                    <div>Correct answers:<span>&nbsp;{score}</span></div>
                    <div>Play again?</div>
                </div>
            ) 
        } else { // loading for the first time
            return (
                <div className="central">
                    <div>Welcome</div>
                    <div>Are you ready?</div>
                </div>
            ) 
        }
        
    }
});

module.exports = CentralMessage;