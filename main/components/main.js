var React = require('react');
var ReactDOM = require('react-dom');
import ReactInterval from 'react-interval';
require("../.././styles/style.scss");

import QuestionFrame  from './QuestionFrame';
import TimeScoreFrame  from './TimeScoreFrame'; 
import AnswerFrame  from './AnswerFrame';
import CheckFrame  from './CheckFrame';
import StartFrame  from './StartFrame';


var Main = React.createClass({
    getInitialState: function() {
        
        var questionNumbers = this.generateQuestionTable(3),
            answerNumbers = this.generateAnswersTable(4, questionNumbers),
            result = this.calculateResult(questionNumbers);
        
        return {
            questionNumbers: questionNumbers,
            answerNumbers: answerNumbers,
            result: result,
            correctAnswer: questionNumbers[1],
            checkClassName: "check",
            messageToUser: "Check",
            selectedNumber: "...",
            timeRemaining: 60,
            playing: false
        }
    },
    generateQuestionTable: function(size) {
        var table = [],
            num = Math.floor(Math.random()*9)+1;
        
        for (var i=0; i<size; i++) {
            while (table.indexOf(num) >= 0) {
                num = Math.floor(Math.random()*9) +1;
            } 
            table.push(num);
        }
        return table
    },
    calculateResult: function(table) {
        return table[0]+table[1]*table[2];
    },
    generateAnswersTable: function(size, questionTable) {
        var answerNumbers = [];
        var num1_9 = Math.floor(Math.random()*9)+1;
        var num0_3 = Math.floor(Math.random()*4);
        
        answerNumbers.push(questionTable[1]);
        
        for (var i=0; i<size-1; i++) {
            while (answerNumbers.indexOf(num1_9) >= 0) {
                num1_9 = Math.floor(Math.random()*9) +1;
            } 
            answerNumbers.push(num1_9);
        }
        var spliceCorrect = answerNumbers.splice(0, 1);
        answerNumbers.splice(num0_3, 0, spliceCorrect[0]);
        
        return answerNumbers;
    },
    selectNumber: function(clickedNumber) {
        var selectedNumber = this.state.selectedNumber;
        if (selectedNumber !== clickedNumber) {
            this.setState({
                selectedNumber: clickedNumber,
                checkClassName: "check",
                messageToUser: "Check"
            });
        }
    },
    unselectNumber: function(clickedNumber) {
        this.setState({
            selectedNumber: "...",
            checkClassName: "check",
            messageToUser: "Check"
        });
    },
    checkAnswer: function() {
        var correct = (this.state.selectedNumber === this.state.correctAnswer);
        var className;
        var messageToUser;
        
        switch (correct) {
            case true:
                className = "right";
                messageToUser = "Correct";
                break;
            case false:
                className = "fail";
                messageToUser = "Fail";
                break;
            default:
                className = "check";
                messageToUser = "Check";
        }
        
        this.setState({ 
                checkClassName: className,
                messageToUser: messageToUser,
        });
    },
    onStartClick: function() {
        this.setInterval(function() {
            this.setState({timeRemaining: this.state.timeRemaining -1 });
        }, 1000);
    },

    render: function() {
        return (
            <div>
                <QuestionFrame  selectedNumber={this.state.selectedNumber} 
                                unselectNumber={this.unselectNumber} 
                                questionNumbers={this.state.questionNumbers}
                                total={this.state.result} />
                <TimeScoreFrame timeRemaining={this.state.timeRemaining} />
                <AnswerFrame    selectedNumber={this.state.selectedNumber} 
                                selectNumber={this.selectNumber} 
                                answerNumbers={this.state.answerNumbers} />
                <CheckFrame     selectedNumber={this.state.selectedNumber} 
                                checkAnswer={this.checkAnswer}
                                messageToUser={this.state.messageToUser} 
                                checkClassName={this.state.checkClassName} />
                <StartFrame     startClick={this.onStartClick} />
            </div>
        )
    }
});

ReactDOM.render(<Main />, document.getElementById('app'));