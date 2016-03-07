var React = require('react');

var AnswerFrame = React.createClass({
    render: function() {
        var numbers = [],
            answers = this.props.answerNumbers,
            className,
            selectNumber = this.props.selectNumber,
            selectedNumber = this.props.selectedNumber;
        for (var i=0; i<=3; i++) {
            className = 'elements selected-' +(selectedNumber == answers[i]);
            numbers.push(
                <div    className={className} 
                        onClick={selectNumber.bind(null, answers[i])}>
                    {answers[i]}
                </div>
            );
        }
        return (
            <div className="answer">
                {numbers}
            </div>
        )
    }
});

module.exports = AnswerFrame;
