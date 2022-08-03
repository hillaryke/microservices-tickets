import { Form, Link, useActionData } from "@remix-run/react";
import type { ActionFunction, LoaderFunction, } from "@remix-run/node";

import { displayErrors } from "~/components/display-errors";

interface ActionError {
   field?: string;
   message: string;
}

export const action: ActionFunction = async ({ request }) => {
   const formData = await request.formData();
   const email = formData.get("email");
   const password = formData.get("password");

   // return doRequest({
   //    request,
   //    method: "post",
   //    url: "/api/users/signin",
   //    body: { email, password },
   //    redirectTo: "/",
   // });
   return {};
}

const SignUp = () => {
   const actionData = useActionData();

   return (
       <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
             <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                Sign in to your account
             </h2>
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

                   <div className="flex items-center justify-between">
                      <div className="flex items-center">
                         <input
                             id="remember-me"
                             name="remember-me"
                             type="checkbox"
                             className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                         />
                         <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                            Remember me
                         </label>
                      </div>

                      <div className="text-sm">
                         <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                            Forgot your password?
                         </a>
                      </div>
                   </div>

                   <div>
                      <button
                          type="submit"
                          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                         Sign in
                      </button>
                   </div>
                   {displayErrors(actionData?.errors)}

                   <div className="text-center text-sm text-gray-500">
                      Don't have an account?{" "}
                      <Link to="/auth/signup"> Sign Up</Link>
                   </div>
                </Form>
             </div>
          </div>
       </div>
   );
};

export default SignUp;