import { Request, Response } from "express";

const express = require('express');
const router = express.Router();

router.post('/api/users/signout', (req: Request, res: Response) => {
    req.session = null;

    res.send({ })
});

export { router as signoutRouter };