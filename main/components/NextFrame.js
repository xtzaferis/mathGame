var React = require('react');

// Next button with visibility and onClick
var NextFrame = React.createClass({
    render: function() {
        var visibility = this.props.visibility;
        return (
            <div className={visibility} onClick={this.props.nextClick}>
                Next
            </div>
        )
    }
});

module.exports = NextFrame;