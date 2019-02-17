class ErrorHelper {
    setError(message, stack = null) {
        return {
            message,
            stack
        };
    }

    printError(error) {
        /* eslint-disable */
        console.error(error);
        /* eslint-enable */
    }
}

export default ErrorHelper;
