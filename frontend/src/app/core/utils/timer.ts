export class Timer {
    private timerObj: any;

    constructor(
        private fn: () => void, 
        private timeInMilliseconds: number
    ) {
        this.timerObj = null;
    }

    // start timer using current settings (if it's not already running)
    public start(): Timer {
        if (!this.timerObj) {
            this.stop();
            this.timerObj = setInterval(this.fn, this.timeInMilliseconds);
        }
        return this;
    }

    public stop(): Timer {
        if (!!this.timerObj) {
            clearInterval(this.timerObj);
            this.timerObj = null;
        }
        return this;
    }

    // start with new or original interval, stop current interval
    public reset (newTime = this.timeInMilliseconds) {
        this.timeInMilliseconds = newTime;
        return this.stop().start();
    }
}
