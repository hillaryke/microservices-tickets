import {Request, Response} from "express";

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
        return res.status(400).send(errors.array());
    }

    const { email, password } = req.body;

    console.log('Creating a user ...');

    res.send({});
});

export {router as signupRouter};