var React = require('react');

var CheckFrame = React.createClass({
    render: function() {
        var messageToUser = this.props.messageToUser;
        var className = this.props.checkClassName;

        return (
            <div className={className} onClick={this.props.checkAnswer}>
                {messageToUser}
            </div>
        )
    }
});

module.exports = CheckFrame;
