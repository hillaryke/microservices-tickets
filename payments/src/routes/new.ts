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
import { stripe } from "../stripe";
import { Order } from "../models/order";
import { Payment } from "../models/payment";
import { natsWrapper } from "../nats-wrapper";
import { PaymentCreatedPublisher } from "../events/publisher/payment-created-publisher";

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

      const charge = await stripe.charges.create({
         amount: order.price * 100,
         currency: 'usd',
         source: token
      });

      const payment = Payment.build({
         orderId,
         stripeId: charge.id
      });
      await payment.save();

      // publish event
      new PaymentCreatedPublisher(natsWrapper.client).publish({
         id: payment.id,
         orderId: payment.orderId,
         stripeId: payment.stripeId
      });

      res.status(201).send({ id: payment.id });
   });

export { router as createChargeRouter };