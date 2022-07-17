import { Publisher, Subjects, TicketUpdatedEvent } from '@itickets/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
   subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}

