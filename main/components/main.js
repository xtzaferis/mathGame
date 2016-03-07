var React = require('react');
var ReactDOM = require('react-dom');
require("../.././styles/style.scss");

var Main = React.createClass({
    getInitialState: function() {
        var questionNum = [],
            answerNum = [],
            num = Math.floor(Math.random()*9) +1;
        
        for (var i=0; i<3; i++) {
            while (questionNum.indexOf(num) >= 0) {
                num = Math.floor(Math.random()*9) +1;
            } 
            questionNum.push(num);
        }
        var total = questionNum[0]+questionNum[1]*questionNum[2];
        var correctPosition = Math.floor(Math.random()*4);
        answerNum[correctPosition] = total;
        
        for (var i=0; i<4; i++) {
            
            answerNum.push(num);
            while (answerNum.indexOf(num) >= 0) {
                num = Math.floor(Math.random()*9) +1;
            } 
            answerNum.push(num);
        }
        return {
            questionNumbers: questionNum,
            answerNumbers: answerNum,
            result: total,
            selectedNumber: "..."  
        }
    },
    selectNumber: function(clickedNumber) {
        var selectedNumber = this.state.selectedNumber;
        if (selectedNumber !== clickedNumber) {
            this.setState({selectedNumber: clickedNumber});
        }
    },
    unselectNumber: function(clickedNumber) {
        this.setState({selectedNumber: "..."});
    },
    render: function() {
        return (
            <div>
                <QuestionFrame  selectedNumber={this.state.selectedNumber} 
                                unselectNumber={this.unselectNumber} 
                                questionNumbers={this.state.questionNumbers}
                                total={this.state.result} />
                <TimeScoreFrame />
                <AnswerFrame    selectedNumber={this.state.selectedNumber} 
                                selectNumber={this.selectNumber} 
                                answerNumbers={this.state.answerNumbers} />
                <CheckFrame />
                <StartFrame />
            </div>
        )
    }
});

var QuestionFrame = React.createClass({
    render: function() {
        var selectedNumber = this.props.selectedNumber;
        return (
            <div className="question">
                <span>{this.props.questionNumbers[0]}</span>
                <span>+</span>
                <span onClick={this.props.unselectNumber} className="elements no-margin-left">
                    {this.props.questionNumbers[1], selectedNumber}        
                </span>
                <span>x</span>
                <span>{this.props.questionNumbers[2]}</span>
                <span>=</span>
                <span>{this.props.total}</span>
            </div>
        )
    }
});

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

var AnswerFrame = React.createClass({
    render: function() {
        var numbers = [],
            className,
            selectNumber = this.props.selectNumber,
            selectedNumber = this.props.selectedNumber;
        for (var i=0; i<=3; i++) {
            className = 'elements selected-' +(selectedNumber === i);
            numbers.push(
                <div className={className} onClick={selectNumber.bind(null, i)}>
                    {i}
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

var CheckFrame = React.createClass({
    render: function() {
        return (
            <div className="check">
                Check
            </div>
        )
    }
});

var StartFrame = React.createClass({
    render: function() {
        return (
            <div className="start">
                Start
            </div>
        )
    }
});



ReactDOM.render(<Main />, document.getElementById('app'));