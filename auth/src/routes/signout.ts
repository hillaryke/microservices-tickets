import { Request, Response } from "express";

const express = require('express');
const router = express.Router();

router.post('/api/users/signout', (req: Request, res: Response) => {

});

export { router as signoutRouter };