var React = require('react');

var AnswerFrame = React.createClass({
    render: function() {
        var numbers = [],
            answers = this.props.answerNumbers,
            className,
            selectNumber = this.props.selectNumber,
            visibility = this.props.visibility,
            selectedNumber = this.props.selectedNumber;
        
        // filling a table with the possible answers binding individual properties
        // used when closures
        for (var i=0; i<=3; i++) {
            className = 'elements selected-' +(selectedNumber == answers[i]) +visibility;
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
