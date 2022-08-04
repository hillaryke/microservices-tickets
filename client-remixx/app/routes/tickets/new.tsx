import { useState } from "react";
import { Form, useActionData } from "@remix-run/react";
import { displayErrors } from "~/components/display-errors";
import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import axios from "axios";
import { reqAgent } from "~/configs/axios-instance";

export const action: ActionFunction = async ({ request }) => {
   const formData = await request.formData();
   const title = formData.get("title");
   const price = formData.get("price");
   const body = { title, price };

   try {
      // @ts-ignore
      const res = await axios.post('https://ticketing.dev/api/tickets', body, {
         httpsAgent: reqAgent(),
         // @ts-ignore
         headers: request.headers
            // {
            // 'cookie': request.headers.get("cookie") as string,
            // "Access-Control-Allow-Origin": "*",
            // 'Content-Type': 'application/json;charset=UTF-8',
            // 'Cache-Control': 'private, max-age=60',
            // 'Access-Control-Allow-Credentials': 'true'
   // }
      });
      // console.log(res)
      return redirect("/");

   } catch (err) {
      // console.log(err)
      // @ts-ignore
      const errors = err.response?.data.errors;
      if (errors) return { errors };
      // @ts-ignore
      console.log("Unexpected error:", err.message);
      return null;
   }
};

export default function NewTicket() {
   const actionData = useActionData();
   console.log(actionData);

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