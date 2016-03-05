var React = require('react');
var ReactDOM = require('react-dom');
require(".././styles/file.scss");

var Main = React.createClass({
    render: function() {
        return (
            <div className="style">
                Testing the environment with some changes
            </div>
        )
    }
});

ReactDOM.render(<Main />, document.getElementById('app'));