import { displayErrors } from "~/components/display-errors";
import { Form, useActionData, useLoaderData, useTransition } from "@remix-run/react";
import { ActionFunction, LoaderFunction, redirect } from "@remix-run/node";
import axios from "axios";
import { doRequest } from "~/utils/do-request";

export const loader: LoaderFunction = async ({ params }) => {
   const ticketId = params.ticketId;
   try {
      const res = await axios.get(`${process.env.HOST_URL}/api/tickets/${ticketId}`);
      return { ticket: res.data };
   } catch (err) {
      console.log(err);
   }
};

export const action: ActionFunction = async ({ request, params }) => {
   return doRequest({
      request,
      method: 'post',
      url: '/api/orders',
      body: {
         ticketId: params.ticketId
      },
      onSuccess: (order) => redirect(`/orders/${order.id}`)
   });
};

export default function TicketShow() {
   const { ticket } = useLoaderData();
   const actionData = useActionData();
   const transition = useTransition();

   return (
      <div className="bg-gray-600 flex flex-col items-center">
         <div className="py-7">
            <div className="text-center">
               <h2 className="text-lg leading-6 font-semibold text-gray-100 uppercase tracking-wider">Pricing</h2>
            </div>
         </div>

         <div
            className="h-full w-1/2 flex flex-col rounded-lg shadow-lg overflow-hidden lg:rounded-none lg:rounded-l-lg">
            <div className="flex-1 flex flex-col">
               <div className="bg-white px-6 py-10">
                  <div>
                     <h3 className="text-center text-2xl font-medium text-gray-900" id="tier-hobby">
                        {ticket.title}
                     </h3>
                     <div className="mt-4 flex items-center justify-center">
                          <span className="px-3 flex items-start text-5xl tracking-tight text-gray-900">
                            <span className="mt-2 mr-2 text-4xl font-medium">$</span>
                            <span className="font-extrabold">{ticket.price}</span>
                          </span>
                     </div>
                  </div>
               </div>
               <div
                  className="flex-1 flex flex-col justify-between border-t-2 border-gray-100 p-6 bg-gray-50 sm:p-8 lg:p-6 xl:p-10">
                  <div>
                     <Form method="post" className="rounded-lg flex justify-center">
                        <button
                           // @ts-ignore
                           disabled={transition.submission}
                           className="block w-11/12 md:w-full text-center rounded-lg border
                                    border-transparent bg-indigo-600 px-6 py-3 text-lg leading-4
                                    font-medium text-white hover:bg-indigo-700"
                           aria-describedby="tier-hobby"
                        >Purchase
                        </button>
                     </Form>
                  </div>
                  {displayErrors(actionData?.errors)}
               </div>
            </div>
         </div>
      </div>
   );
};