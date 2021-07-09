"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const main_1 = require("../src/main");
describe('greeter function', () => {
    const name = 'John';
    let hello;
    let timeoutSpy;
    // Act before assertions
    beforeAll(() => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        // Read more about fake timers
        // http://facebook.github.io/jest/docs/en/timer-mocks.html#content
        // Jest 27 now uses "modern" implementation of fake timers
        // https://jestjs.io/blog/2021/05/25/jest-27#flipping-defaults
        // https://github.com/facebook/jest/pull/5171
        jest.useFakeTimers();
        timeoutSpy = jest.spyOn(global, 'setTimeout');
        const p = main_1.greeter(name);
        jest.runOnlyPendingTimers();
        hello = yield p;
    }));
    // Teardown (cleanup) after assertions
    afterAll(() => {
        timeoutSpy.mockRestore();
    });
    // Assert if setTimeout was called properly
    it('delays the greeting by 2 seconds', () => {
        expect(setTimeout).toHaveBeenCalledTimes(1);
        expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), main_1.Delays.Long);
    });
    // Assert greeter result
    it('greets a user with `Hello, {name}` message', () => {
        expect(hello).toBe(`Hello, ${name}`);
    });
});
//# sourceMappingURL=main.test.js.map