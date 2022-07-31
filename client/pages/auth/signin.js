import { useState } from 'react';
import Router from 'next/router';
import useRequest from "../../hooks/use-request";
import Link from "next/link";

const SignUp = () => {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const { doRequest, errors } = useRequest({
      url: '/api/users/signin',
      method: 'post',
      body: {
         email, password
      },
      onSuccess: () => Router.push('/')
   });

   const onFormSubmit = async (event) => {
      event.preventDefault();

      doRequest();
   };

   return (
       <div className="flex min-h-full flex-col justify-center">
          <div className="mx-auto w-full max-w-md px-8">
             <form onSubmit={onFormSubmit} method="post" className="space-y-6">
                <div>
                   <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email address
                   </label>
                   <div className="mt-1">
                      <input
                          value={email}
                          onChange={e => setEmail(e.target.value)}
                          id="inputEmail"
                          required
                          autoFocus={true}
                          type="email"
                          autoComplete="email"
                          placeholder="name@example.com"
                          className="w-full rounded border border-gray-500 px-2 py-1 text-lg"
                      />
                   </div>
                </div>

                <div>
                   <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                      Password
                   </label>
                   <div className="mt-1">
                      <input
                          id="inputPassword"
                          type="password"
                          className="w-full rounded border border-gray-500 px-2 py-1 text-lg"
                      />
                   </div>
                </div>

                <button
                    type="submit"
                    className="w-full rounded bg-blue-500  py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400"
                >
                   Log in
                </button>
                <div className="flex items-center justify-between">
                   <div className="flex items-center">
                      <input
                          id="remember"
                          name="remember"
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <label
                          htmlFor="remember"
                          className="ml-2 block text-sm text-gray-900"
                      >
                         Remember me
                      </label>
                   </div>
                   <div className="text-center text-sm text-gray-500">
                      Don't have an account?{" "}
                      <Link
                          className="text-blue-500 underline"
                          href="/auth/signup"
                      >
                         Sign up
                      </Link>
                   </div>
                </div>
             </form>
          </div>
       </div>
   );
};

export default SignUp;