var React = require('react');
var ReactDOM = require('react-dom');
import ReactInterval from 'react-interval';
require("../.././styles/style.scss");

import QuestionFrame  from './QuestionFrame';
import TimeScoreFrame  from './TimeScoreFrame'; 
import AnswerFrame  from './AnswerFrame';
import CheckFrame  from './CheckFrame';
import StartFrame  from './StartFrame';
import NextFrame  from './NextFrame';  
import CentralMessage  from './CentralMessage';
import SetIntervalMixin  from './SetIntervalMixin';


var Main = React.createClass({
    mixins: [SetIntervalMixin],
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
            score: 0,
            selectedNumber: "...",
            timeRemaining: 60,
            startResetText: "Start",
            nextButtonVisibility: "next invisible",
            windowsDisplay: " visible",
            playing: false
        }
    },
    // Here is where I put the interval for the game countdown.........
    // test test
    componentDidMount: function() {
        this.timing = setInterval(this.countDown, 1000);
    },
    countDown: function() {
        this.setState({timeRemaining: this.state.timeRemaining - 1});   
        // If the time expires then the interval are cleared
        if (this.state.timeRemaining == 0) {
            this.componentWillUnmount();
        }
            
    },
    componentWillUnmount: function(){
        clearInterval(this.timing);
        // When the time is over the button must be set to Start
        this.setState({startResetText: "Start"});
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
        
        //First element in the table is the correct answer
        answerNumbers.push(questionTable[1]);
        // Pushing in the table 3 different numbers from 1 to 9
        for (var i=0; i<size-1; i++) {
            while (answerNumbers.indexOf(num1_9) >= 0) {
                num1_9 = Math.floor(Math.random()*9) +1;
            } 
            answerNumbers.push(num1_9);
        }
        // Taking the correct answer out of the table 
        //the result is also a table with one element
        // setting back the correct answer, transforming it
        // first to an integer, in a random index from 0 to 3
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
        var usersChoice = this.state.selectedNumber,
            correct,
            className,
            messageToUser,
            score = this.state.score,
            nextButtonVisibility = this.state.nextButtonVisibility,
            windowsDisplay = this.state.windowsDisplay;
        
        //Checking for true or false answer
        if (usersChoice !== "...") {
           correct = (usersChoice === this.state.correctAnswer); 
        } else {
            correct = "notSelected";
        }
        
        if (correct !=="notSelected" && correct == true) {
            score++;
        }
        switch (correct) {
            case true:
                className = "right";
                messageToUser = "Correct";
                this.setState({selectedNumber: "..."});
                nextButtonVisibility = "next visible";
                windowsDisplay = " invisible";
                break;
            case false:
                className = "fail";
                messageToUser = "Try Again";
                break;
            case "notSelected":
                className = "check";
                messageToUser = "Check";
                break;
            default:
                className = "check";
                messageToUser = "Check";
        }
        
        this.setState({ 
                checkClassName: className,
                messageToUser: messageToUser,
                nextButtonVisibility: nextButtonVisibility,
                windowsDisplay: windowsDisplay,
                score: score
        });
    },
    onStartClick: function() {
        //starts the countdown - interval
        this.componentWillUnmount();
        this.resetTimeAndScore();
        this.resetComponents();
        this.componentDidMount();  // clear the interval
    },
    resetTimeAndScore: function() {
        this.setState(
            {
                score: 0,
                timeRemaining: 60
            }
        );
    },
    // Generating new question and answer and resets the components
    resetComponents: function() {
        var questionNumbers = this.generateQuestionTable(3),
            answerNumbers = this.generateAnswersTable(4, questionNumbers),
            result = this.calculateResult(questionNumbers);
        
        this.setState(
            {
                questionNumbers: questionNumbers,
                answerNumbers: answerNumbers,
                result: result,
                correctAnswer: questionNumbers[1],
                selectedNumber: "...",
                nextButtonVisibility: "next invisible",
                checkClassName: "check",
                windowsDisplay: " visible",
                startResetText: "Reset",
                playing: true,
                messageToUser: "Check"
            }
        );
    },
    onNextClick: function() {
        var visibility = "next invisible";
        this.resetComponents(); // except score and time
        this.setState({
            nextButtonVisibility: visibility,
            windowsDisplay: " visible"   // makes the question and answer frames visible
        });
    },
    
    render: function() {
        var st = this.state;
        
        // if the user is playing and the time is not over
        if (st.playing == true && st.timeRemaining != 0) {
            return (
                <div>
                    <QuestionFrame  selectedNumber={st.selectedNumber} 
                                    unselectNumber={this.unselectNumber} 
                                    questionNumbers={st.questionNumbers}
                                    display={st.windowsDisplay}
                                    total={st.result} />
                    <TimeScoreFrame timeRemaining={st.timeRemaining} 
                                    score={st.score} />
                    <AnswerFrame    selectedNumber={st.selectedNumber} 
                                    selectNumber={this.selectNumber} 
                                    answerNumbers={st.answerNumbers} 
                                    visibility={st.windowsDisplay} />
                    <CheckFrame     selectedNumber={st.selectedNumber} 
                                    checkAnswer={this.checkAnswer}
                                    messageToUser={st.messageToUser} 
                                    checkClassName={st.checkClassName} />
                    <StartFrame     startClick={this.onStartClick} 
                                    startResetText={st.startResetText} />
                    <NextFrame      nextClick={this.onNextClick} 
                                    visibility={st.nextButtonVisibility} />
                </div>
            )
        } else { // time is over or the user is not playing, loading for first time
            return (
                <div>
                    <CentralMessage centralMessageDisplay={st.centralMessageDisplay}
                                    score={this.state.score} 
                                    playing={this.state.playing}/>
                    <StartFrame     startClick={this.onStartClick} 
                                    startResetText={st.startResetText} />
                </div>
            )
        }
        
    }
});

ReactDOM.render(<Main />, document.getElementById('app'));