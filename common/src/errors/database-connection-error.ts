import { CustomError } from "./custom-error";

export class DatabaseConnectionError extends CustomError {
    statusCode = 500;
    reason = 'Error connecting to database';

    constructor() {
        super('Error connecting to database');

        Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
    }

    // return array of formatted errors
    serializeErrors() {
        return [
            { message: this.reason }
        ];
    }

}