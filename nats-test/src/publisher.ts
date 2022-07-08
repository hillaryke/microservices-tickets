import nats from 'node-nats-streaming';
import { TicketCreatePublisher } from "./events/ticket-create-publisher";
import { TicketCreatedEvent } from "./events/ticket-created-event";

const stan = nats.connect('ticketing', 'abc', {
   url: 'http://localhost:4222',
});

stan.on('connect', async () => {
   console.log('Publisher connected to NATS');

   const publisher = new TicketCreatePublisher(stan);
   await publisher.publish({
      id: '123',
      title: 'concert',
      price: 20
   });
});