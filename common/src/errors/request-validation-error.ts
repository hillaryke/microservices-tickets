import { CustomError } from "./custom-error";
import { ValidationError } from "express-validator";

export class RequestValidationError extends CustomError {
    statusCode = 400;

    constructor(public errors: ValidationError[]) {
        super('Invalid request parameters');

        // Only because we are extending a build in class
        Object.setPrototypeOf(this, RequestValidationError.prototype);
    }

    // return array of formatted error objects
    serializeErrors() {
        return this.errors.map((err: ValidationError) => {
            return { message: err.msg, field: err.param };
        });
    }
}