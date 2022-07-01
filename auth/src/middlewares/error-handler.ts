import { Request, NextFunction } from "express";
import { Response } from "express/ts4.0";
import { CustomError } from "../errors/custom-error";

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {

    if (err instanceof CustomError) {
        return res.status(err.statusCode).send({ errors: err.serializeErrors() });
    }

    return res.status(400).send({
        errors: [{ message: 'Something went wrong' }]
    });
};

