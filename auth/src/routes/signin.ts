import { Request, Response } from "express";
import { body } from 'express-validator';

import { validateRequest } from "../middlewares/validate-request";

const express = require('express');
const router = express.Router();

// Get current user
router.post('/api/users/signin',
    [
        body('email')
            .isEmail()
            .withMessage('Email must be valid!'),
        body('password')
            .trim()
            .notEmpty()
            .withMessage('Field must not be empty!')
    ], validateRequest,
    (req: Request, res: Response) => {


    });

export { router as signinRouter };