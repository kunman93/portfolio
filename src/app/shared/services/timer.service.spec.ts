import { TimerService } from "./timer.service";

describe('TimerService', () => {
    let timerService: TimerService;
    let mockFn: jasmine.Spy;

    beforeEach(() => {
        // mock setInterval and clearInterval
        spyOn(window, 'setInterval').and.callThrough();
        spyOn(window, 'clearInterval');

        // mock function to be called by the timerService
        mockFn = jasmine.createSpy('mockFn');
        timerService = new TimerService(mockFn, 1000);
    });

    describe('start', () => {
        it('should start the timer when start() is called', () => {
            timerService.start();
            expect(window.setInterval).toHaveBeenCalledWith(mockFn, 1000);
        });

        it('should not start a new timer if one is already running', () => {
            timerService.start();
            timerService.start(); // attempt to start again
            expect(window.setInterval).toHaveBeenCalledTimes(1); // only one timer
        });
    });

    describe('stop', () => {
        it('should stop the timer when stop() is called', () => {
            timerService.start();
            timerService.stop();
            expect(window.clearInterval).toHaveBeenCalled();
        });
    });

    describe('reset', () => {
        it('should reset the timer with the original time if no argument is passed', () => {
            timerService.start();
            timerService.reset();
            expect(window.clearInterval).toHaveBeenCalled();
            expect(window.setInterval).toHaveBeenCalledWith(mockFn, 1000);
        });

        it('should reset the timer with a new interval time if an argument is passed', () => {
            timerService.start();
            timerService.reset(500); // set new time
            expect(window.clearInterval).toHaveBeenCalled();
            expect(window.setInterval).toHaveBeenCalledWith(mockFn, 500);
        });
    });
});
