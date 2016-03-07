var React = require('react');

var QuestionFrame = React.createClass({
    render: function() {
        var selectedNumber = this.props.selectedNumber;
        return (
            <div className="question">
                <span>{this.props.questionNumbers[0]}</span>
                <span>+</span>
                <span onClick={this.props.unselectNumber} className="elements no-margin-left">
                    {selectedNumber}        
                </span>
                <span>x</span>
                <span>{this.props.questionNumbers[2]}</span>
                <span>=</span>
                <span>{this.props.total}</span>
            </div>
        )
    }
});

module.exports = QuestionFrame;