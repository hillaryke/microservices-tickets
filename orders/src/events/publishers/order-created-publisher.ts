import { OrderCreatedEvent, Publisher, Subjects } from "@itickets/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
   subject: Subjects.OrderCreated = Subjects.OrderCreated;
}