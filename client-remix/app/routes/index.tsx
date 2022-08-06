import type { LoaderFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import axios from "axios";

export interface Ticket {
   id: string;
   title: string;
   price: number;
   userId: string;
   version: number;
   orderId?: string;
}

export const loader: LoaderFunction = async () => {
   // fetch tickets
   try {
      const res = await axios.get(`${process.env.HOST_URL}/api/tickets`);
      return { tickets: res.data };
   } catch (err) {
      console.log(err);
      return null;
   }
};

export default function IndexRoute() {
   const { tickets } = useLoaderData();

   return (
      <div className="flex justify-center">
         <div className="px-4 sm:px-6 lg:px-8 my-8 max-w-screen-lg w-screen">
            <div className="sm:flex sm:items-center">
               <div className="sm:flex-auto">
                  <h1 className="text-xl font-semibold text-gray-900">Tickets</h1>
                  <p className="mt-2 text-sm text-gray-700">
                     A list of all the tickets available
                  </p>
               </div>
            </div>
            <div
               className="-mx-4 mt-8 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:-mx-6 md:mx-0 md:rounded-lg">
               <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                  <tr>
                     <th scope="col"
                         className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                        Title
                     </th>
                     <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Price
                     </th>
                     <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                        <span className="sr-only">Link</span>
                     </th>
                  </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                  {tickets.map((ticket: Ticket) => (
                     <tr key={ticket.title}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                           {ticket.title}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{ticket.price}</td>
                        <td className="whitespace-nowrap py-4 pl-3 pr-4 text-center text-sm font-medium sm:pr-6">
                           <Link to={`/tickets/${ticket.id}`} className="text-indigo-600 hover:text-indigo-900">
                              View<span className="sr-only">, {ticket.title}</span>
                           </Link>
                        </td>
                     </tr>
                  ))}
                  </tbody>
               </table>
            </div>
         </div>
      </div>
   );
}
