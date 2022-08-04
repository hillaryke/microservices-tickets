import { Form, Link, useActionData } from "@remix-run/react";
import { ActionFunction, json, redirect } from "@remix-run/node";

import { displayErrors } from "~/components/display-errors";
import https from "https";
import axios from "axios";

export const action: ActionFunction = async ({ request }) => {
   const formData = await request.formData();
   const email = formData.get("email");
   const password = formData.get("password");
   const body = { email, password };

   const cookies = request.headers.get("cookie") as string;

   try {
      const response = await axios.post(`${process.env.HOST_URL}/api/users/signup`,
         body,
         {
            httpsAgent: new https.Agent({
               rejectUnauthorized: false,
            }),
            headers: {
               'Content-Type': 'application/json',
               'cookie': cookies
            }
         });
      return json(response.data, {
         headers: response.headers
      })
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

export default function SignUp() {
   const actionData = useActionData();

   return (
      <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
         <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign Up</h2>
         </div>

         <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
               <Form className="space-y-6" action="#" method="post">
                  <div>
                     <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email address
                     </label>
                     <div className="mt-1">
                        <input
                           id="email"
                           name="email"
                           type="email"
                           autoComplete="email"
                           className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        {displayErrors(actionData?.errors, "email")}
                     </div>
                  </div>


                  <div>
                     <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Password
                     </label>
                     <div className="mt-1">
                        <input
                           id="password"
                           name="password"
                           type="password"
                           autoComplete="current-password"
                           className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        {displayErrors(actionData?.errors, "password")}
                     </div>
                  </div>

                  <div>
                     <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                     >
                        Sign Up
                     </button>
                  </div>
                  {displayErrors(actionData?.errors)}

                  <div className="text-center text-sm text-gray-500">
                     Already have an account?{" "}
                     <Link to="/auth/signin"> Sign in</Link>
                  </div>
               </Form>
            </div>
         </div>
      </div>
   );
};