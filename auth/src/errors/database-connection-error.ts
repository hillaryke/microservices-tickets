export class DatabaseConnectionError extends Error {
    reason = 'Error connecting to database';

    constructor() {
        super();

        // Because we are extending built-in class
        Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
    }

}