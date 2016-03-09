// A module that helps for Countdown-setInterval
// We can use componentDidMount and componentWillUnmount 
// for setInterval and clearInterval

var SetIntervalMixin = {
  componentWillMount: function() {
    this.intervals = [];
  },
  setInterval: function() {
    this.intervals.push(setInterval.apply(null, arguments));
  },
  componentWillUnmount: function() {
    this.intervals.forEach(clearInterval);
  }
};

module.exports = SetIntervalMixin;