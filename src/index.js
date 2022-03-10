const Poller = require('./poller');

function createPoller(callback, interval, options) {
    return new Poller(callback, interval, options);
}

module.exports = {createPoller, Poller};
