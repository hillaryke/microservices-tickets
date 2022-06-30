import {Request, Response} from "express";

const express = require('express');
const router = express.Router();

// Get current user
router.post('/api/users/signin', (req: Request, res: Response) => {
    res.send('SIGN IN');
});

export { router as signinRouter };