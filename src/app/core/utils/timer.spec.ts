import { Timer } from "./timer";

describe('Timer', () => {
    let timer: Timer;
    let mockFn: jasmine.Spy;

    beforeEach(() => {
        // mock setInterval and clearInterval
        spyOn(window, 'setInterval').and.callThrough();
        spyOn(window, 'clearInterval');

        // mock function to be called by the timer
        mockFn = jasmine.createSpy('mockFn');
        timer = new Timer(mockFn, 1000);
    });

    describe('start', () => {
        it('should start the timer when start() is called', () => {
            timer.start();
            expect(window.setInterval).toHaveBeenCalledWith(mockFn, 1000);
        });

        it('should not start a new timer if one is already running', () => {
            timer.start();
            timer.start(); // attempt to start again
            expect(window.setInterval).toHaveBeenCalledTimes(1); // only one timer
        });
    });

    describe('stop', () => {
        it('should stop the timer when stop() is called', () => {
            timer.start();
            timer.stop();
            expect(window.clearInterval).toHaveBeenCalled();
        });
    });

    describe('reset', () => {
        it('should reset the timer with the original time if no argument is passed', () => {
            timer.start();
            timer.reset();
            expect(window.clearInterval).toHaveBeenCalled();
            expect(window.setInterval).toHaveBeenCalledWith(mockFn, 1000);
        });

        it('should reset the timer with a new interval time if an argument is passed', () => {
            timer.start();
            timer.reset(500); // set new time
            expect(window.clearInterval).toHaveBeenCalled();
            expect(window.setInterval).toHaveBeenCalledWith(mockFn, 500);
        });
    });
});
