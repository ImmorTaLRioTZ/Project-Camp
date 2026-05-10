class APIError extends Error {
    constructor(message = "Something went wrong", statusCode, errors = [], stack = "") {
        super(message);
        this.message = message;
        this.data = null;
        this.statusCode = statusCode;
        this.success = false;
        this.errors = errors;

        if(stack) {
            this.stack = stack;
        }
        else{
            Error.captureStackTrace(this, this.constructor)
        }
    }
}

export { APIError };