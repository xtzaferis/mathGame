var React = require('react');
// Formating the question to the user using the question table
var QuestionFrame = React.createClass({
    render: function() {
        var selectedNumber = this.props.selectedNumber;
        var display = this.props.display; // visible or not
        return (
            <div className="question">
               <div className={display}> 
                    <span >{this.props.questionNumbers[0]}</span>
                    <span>+</span>
                    <span className="elements centerTheContent" onClick={this.props.unselectNumber} >
                        {selectedNumber}        
                    </span>
                    <span>x</span>
                    <span>{this.props.questionNumbers[2]}</span> 
                    <span>=</span>
                    <span>{this.props.total}</span>
                </div>
            </div>
        )
    }
});

module.exports = QuestionFrame;