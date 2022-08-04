import { useState } from "react";
import { Form, useActionData } from "@remix-run/react";
import { displayErrors } from "~/components/display-errors";
import type { ActionFunction } from "@remix-run/node";
import { doRequest } from "~/utils/do-request";

export const action: ActionFunction = async ({ request }) => {
   const formData = await request.formData();
   const title = formData.get("title");
   const price = formData.get("price");
   const body = { title, price };

   return doRequest({
      request,
      method: 'post',
      url: '/api/tickets',
      body,
      redirectTo: '/'
   });
};

export default function NewTicket() {
   const actionData = useActionData();

   const [price, setPrice] = useState('');

   const onBlur = () => {
      const value = parseFloat(price);
      if (isNaN(value)) {
         return;
      }
      setPrice(value.toFixed(2));
   };

   return (
      <div className="flex min-h-full flex-col justify-center my-14">
         <div className="mx-auto w-full max-w-md px-8">
            <div className="mb-7">
               <h1 className="text-3xl font-bold">Create a Ticket</h1>
            </div>
            <Form method="post" className="space-y-6">
               <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                     Title
                  </label>
                  <div className="mt-1">
                     <input
                        id="title"
                        autoFocus={true}
                        type="text"
                        name="title"
                        className="w-full rounded border border-gray-500 px-2 py-1 text-lg"
                     />
                     {displayErrors(actionData?.errors, "title")}
                  </div>
               </div>

               <div>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                     Price
                  </label>
                  <div className="mt-1">
                     <input
                        value={price}
                        onChange={e => setPrice(e.target.value)}
                        onBlur={onBlur}
                        id="price"
                        name="price"
                        className="w-full rounded border border-gray-500 px-2 py-1 text-lg"
                     />
                     {displayErrors(actionData?.errors, "price")}
                  </div>
               </div>
               {displayErrors(actionData?.errors)}

               <button
                  type="submit"
                  //  @TODO add padding top
                  className="w-full rounded bg-blue-500  py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400"
               >
                  Create Ticket
               </button>
               <div className="flex items-center justify-between">
               </div>
            </Form>
         </div>
      </div>
   );
};