import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import axios from "axios";
import { OrderStatus } from "@itickets/common";
import { Ticket } from "~/routes";

interface Order {
   id: string;
   userId: string;
   status: OrderStatus;
   expiresAt: Date;
   ticket: Ticket;
   version: number;
}

export const loader: LoaderFunction = async ({ request }) => {
   // fetch orders
   try {
      const res = await axios.get(`${process.env.HOST_URL}/api/orders`, {
         headers: { 'cookie': request.headers.get('cookie') as string }
      });
      return { orders: res.data };
   } catch (err) {
      console.log(err);
      return null;
   }
};

export default function OrdersIndex() {
   const { orders } = useLoaderData();

   return (
      <div className="flex justify-center">
         <div className="px-4 sm:px-6 lg:px-8 my-8 max-w-screen-lg w-screen">
            <div className="sm:flex sm:items-center">
               <div className="sm:flex-auto">
                  <h1 className="text-xl font-semibold text-gray-900">Tickets</h1>
                  <p className="mt-2 text-sm text-gray-700">
                     A list of all your orders
                  </p>
               </div>
            </div>
            <div
               className="-mx-4 mt-8 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:-mx-6 md:mx-0 md:rounded-lg">
               <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                  <tr>
                     <th scope="col"
                         className="py-3.5 pl-4 pr-3 text-left text-sm uppercase tracking-wide font-medium text-gray-800 sm:pl-6">
                        Title
                     </th>
                     <th scope="col"
                         className="px-3 py-3.5 text-left text-sm uppercase tracking-wide font-medium text-gray-600">
                        Status
                     </th>
                  </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                  {orders.map((order: Order) => (
                     <tr key={order.id}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                           {order.ticket.title}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{order.status}</td>
                     </tr>
                  ))}
                  </tbody>
               </table>
            </div>
         </div>
      </div>
   );
};