import {Request, Response} from "express";
import {RequestValidationError} from "../errors/request-validation-error";
import {DatabaseConnectionError} from "../errors/database-connection-error";

const express = require('express');
const router = express.Router();
const {body, validationResult} = require('express-validator');

// Get current user
router.post('/api/users/signup', [
    body('email')
        .isEmail()
        .withMessage('Email must be valid'),
    body('password')
        .trim()
        .isLength({min: 4, max: 30})
        .withMessage('Password must be between 4 and 20 characters')
], (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        throw new RequestValidationError(errors.array());
    }


    console.log('Creating a user ...');
    throw new DatabaseConnectionError();

    res.send({});
});

export {router as signupRouter};