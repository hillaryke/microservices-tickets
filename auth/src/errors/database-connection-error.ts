export class DatabaseConnectionError extends Error {
    statusCode = 500;
    reason = 'Error connecting to database';

    constructor() {
        super();

        // Because we are extending built-in class
        Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
    }

    // return array of formatted errors
    serializeErrors() {
        return [
            { message: this.reason }
        ];
    }

}