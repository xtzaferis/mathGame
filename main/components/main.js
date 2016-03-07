var React = require('react');
var ReactDOM = require('react-dom');
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
            selectedNumber: "..."  
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
        answerNumbers.splice(num0_3, 0, spliceCorrect);
        
        return answerNumbers;
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

ReactDOM.render(<Main />, document.getElementById('app'));