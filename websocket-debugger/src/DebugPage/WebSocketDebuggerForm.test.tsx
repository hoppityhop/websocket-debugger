import {error, info} from './WebSocketDebuggerForm';

describe('info function', () => {

    it('should log the message correctly', () => {

        //Mock console.log
        const logSpy = jest.spyOn(console, 'log').mockImplementation();

        const testMessage = "Test message";
        info(testMessage);

        //Assert that console.log was called with the correct message
        expect(logSpy).toHaveBeenCalledWith("_INFO_: " + testMessage);

        logSpy.mockRestore();


    });

    it('should log nothing if the message is empty', () => {

            //Mock console.log
            const logSpy = jest.spyOn(console, 'log').mockImplementation();

            const testMessage = "";
            info(testMessage);

            //Assert that console.log was not called
            expect(logSpy).toHaveBeenCalled();
            expect(logSpy).toHaveBeenCalledTimes(1);
            expect(logSpy).toHaveBeenCalledWith("_INFO_: ");

            logSpy.mockRestore();
    })


})

describe('error logging function', () => {

    it('should log the error correctly', () => {
        const logSpy = jest.spyOn(console, 'log').mockImplementation();

        const testError = "Test error";
        error(testError);

        expect(logSpy).toHaveBeenCalledWith("_ERROR_: " + testError);

        logSpy.mockRestore();
    });
})
