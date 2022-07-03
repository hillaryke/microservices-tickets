import { Request, Response } from "express";

const { body, validationResult } = require('express-validator');
import jwt from 'jsonwebtoken';

import { User } from '../models/User';
import { RequestValidationError } from "../errors/request-validation-error";
import { BadRequestError } from "../errors/bad-request-error";

const express = require('express');
const router = express.Router();

// Get current user
router.post('/api/users/signup', [
    body('email')
        .isEmail()
        .withMessage('Email must be valid'),
    body('password')
        .trim()
        .isLength({ min: 4, max: 30 })
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
        throw new BadRequestError('Email already in use!!');
    }

    const user = User.build({ email, password });
    await user.save();

    // Generate JWT
    const userJwt = jwt.sign({
        id: user.id,
        email: user.email
    }, 'asdf');

    // store the JWT on session object
    req.session = {
        jwt: userJwt
    };

    res.status(201).send(user);
});

export { router as signupRouter };