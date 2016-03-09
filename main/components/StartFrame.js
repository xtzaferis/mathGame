var React = require('react');

// Start button with onClick function and text depending to the playing state
var StartFrame = React.createClass({
    render: function() {
        var startResetText = this.props.startResetText;
        return (
            <div className="start" onClick={this.props.startClick}>
                {startResetText}
            </div>
        )
    }
});

module.exports = StartFrame;