import {Response, Request, NextFunction} from "express";
import {RequestValidationError} from "../errors/request-validation-error";
import {DatabaseConnectionError} from "../errors/database-connection-error";

export const errorHandler = (err: Error, req: Request, res: Request, next: NextFunction) => {
    if (err instanceof RequestValidationError) {
        console.log('Handler for Request validation error');
    }

    if (err instanceof DatabaseConnectionError) {
        console.log('handling database connection Error');
    }

    // res.status(400).send({
    //     message: err.message
    // })
}

