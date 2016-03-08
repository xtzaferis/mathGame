var React = require('react');

var StartFrame = React.createClass({
    render: function() {
        return (
            <div className="start" onClick={this.props.startClick}>
                Start
            </div>
        )
    }
});

module.exports = StartFrame;