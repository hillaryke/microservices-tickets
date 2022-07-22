import mongoose from 'mongoose';
import { OrderStatus } from "@itickets/common";

interface OrderAttrs {
   id: string;
   version: number;
   userId: string;
   price: number;
   status: OrderStatus;
}

interface OrderDoc extends mongoose.Document {
   version: number;
   userId: string;
   price: number;
   status: OrderStatus;
}

interface OrderModel extends mongoose.Model<OrderDoc> {
   build(attrs: OrderAttrs): OrderDoc;
}

const orderSchema = new mongoose.Schema({
   userId: {
      type: String,
      required: true
   },
   price: {
      type: Number,
      required: true
   },
   status: {
      type: String,
      required: true
   }
}, {
   toJSON: {
      transform(doc, ret) {
         ret.id = ret._id;
         delete ret._id;
      }
   },
   optimisticConcurrency: true,
   versionKey: 'version'
});

orderSchema.statics.build = (attrs: OrderAttrs): OrderDoc => {
   return new Order({
      _id: attrs.id,
      userId: attrs.userId,
      price: attrs.price,
      status: attrs.status
   });
};

const Order = mongoose.model<OrderDoc, OrderModel>('Order', orderSchema);

export { Order };