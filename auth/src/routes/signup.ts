import {Request, Response} from "express";
import { User } from '../models/User';
import {RequestValidationError} from "../errors/request-validation-error";

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
], async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        throw new RequestValidationError(errors.array());
    }

    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        console.log('Email in use');
        return res.send({ })
    }

    const user = User.build({ email, password})
    await user.save();

    res.status(201).send(user);
});

export {router as signupRouter};