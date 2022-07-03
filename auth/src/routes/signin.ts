import { Request, Response } from "express";
import { body } from 'express-validator';
import jwt from "jsonwebtoken";

import { User } from '../models/User';
import { PasswordManager } from '../services/password-manager';
import { validateRequest } from "../middlewares/validate-request";
import { BadRequestError } from "../errors/bad-request-error";

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
    async (req: Request, res: Response) => {

        const { email, password } = req.body;

        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            throw new BadRequestError('Invalid login credentials!');
        }

        const isPasswordMatch = await PasswordManager.compare(existingUser.password, password);

        if (!isPasswordMatch) {
            throw new BadRequestError('Invalid login credentials');
        }

        // Generate JWT
        const userJwt = jwt.sign({
            id: existingUser.id,
            email: existingUser.email
        }, process.env.JWT_KEY!);

        // Store JWT on session object
        req.session = {
            jwt: userJwt
        };

        return res.status(200).send(existingUser);

    });

export { router as signinRouter };