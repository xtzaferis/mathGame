var React = require('react');
var ReactDOM = require('react-dom');
require(".././styles/style.scss");

var Main = React.createClass({
    render: function() {
        return (
            <div>
                <QuestionFrame />
                <TimeScoreFrame />
                <AnswerFrame />
                <CheckFrame />
                <StartFrame />
            </div>
        )
    }
});

var QuestionFrame = React.createClass({
    render: function() {
        return (
            <div className="question">
                7 x 3 + ? = 28
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
        return (
            <div className="answer">
                <span className="elements">3</span>
                <span className="elements">4</span>
                <span className="elements">7</span>
                <span className="elements">1</span>
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