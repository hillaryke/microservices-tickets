export class DatabaseConnectionError extends Error {
    statusCode = 500;
    reason = 'Error connecting to database';

    constructor() {
        super();

        Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
    }

    // return array of formatted errors
    serializeErrors() {
        return [
            { message: this.reason }
        ];
    }

}