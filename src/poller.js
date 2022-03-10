
class Poller {
    constructor(callback, interval, options) {
        if (callback === undefined) {
            throw Error(`callback is required`);
        }

        if (interval === undefined) {
            throw Error(`interval is required`);
        }

        options = options || {};
        if (options.autoStart === undefined) {
            options.autoStart = true;
        }

        this._callback = callback;
        this._interval = interval;
        
        this._isPolling = false;
        this._lastResult = null;
        this._timeout;

        if (options.autoStart) {
            this.start();
        }
    }

    async stop() {
        this._isPolling = false;
        clearTimeout(this._timeout);
        this._timeout = undefined;
        await this._lastResult;
    }

    start() {
        if (this._isPolling) return;
        this._isPolling = true;

        this._timeout = setTimeout(async () => {
            this._lastResult = this._callback();
            await this._lastResult;
            if (this._isPolling) {
                this._timeout.refresh();
            }
        }, this._interval);
    }
}

module.exports = Poller;
