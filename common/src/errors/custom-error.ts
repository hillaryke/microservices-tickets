export abstract class CustomError extends Error {
    abstract statusCode: number;

    constructor(message: string) {
        super(message);

        // Because we are extending built-in class
        Object.setPrototypeOf(this, CustomError.prototype);
    }

    // returns array of objects
    abstract serializeErrors(): { message: string, field?: string }[];
}