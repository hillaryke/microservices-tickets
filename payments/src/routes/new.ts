import mongoose from "mongoose";
import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import {
   requireAuth,
   validateRequest,
   BadRequestError,
   NotFoundError,
   NotAuthorizedError,
   OrderStatus
} from "@itickets/common";
import { Order } from "../models/order";

const router = express.Router();

router.post('/api/payments',
   requireAuth,
   [
      body('token').not().isEmpty(),
      body('orderId')
         .not()
         .isEmpty()
         .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
         .withMessage('orderId must be provided')
   ],
   validateRequest,
   async (req: Request, res: Response) => {
      const { token, orderId } = req.body;

      // Find order associated with the charge
      const order = await Order.findById(orderId);

      if (!order) {
         throw new NotFoundError();
      }

      // check if user requesting payment matches the user assocaited with order
      if (order.userId !== req.currentUser!.id) {
         throw new NotAuthorizedError();
      }

      // make sure order is not cancelled
      if (order.status === OrderStatus.Cancelled) {
         throw new BadRequestError('Cannot process payments for cancelled order!');
      }

      res.send({ success: true });
   });

export { router as createChargeRouter };