import { useState } from 'react';
import Router from 'next/router';
import Link from "next/link";
import useRequest from "../../hooks/use-request";

const SignUp = () => {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const { doRequest, errors, displayFieldError } = useRequest({
      url: '/api/users/signup',
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
       <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
             <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign Up</h2>
          </div>

          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
             <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                <form onSubmit={onFormSubmit} className="space-y-6" action="#" method="POST">
                   <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                         Email address
                      </label>
                      <div className="mt-1">
                         <input
                             value={email}
                             onChange={e => setEmail(e.target.value)}
                             id="email"
                             name="email"
                             type="email"
                             autoComplete="email"
                             className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                         />
                         {displayFieldError('email')}
                      </div>
                   </div>

                   <div>
                      <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                         Password
                      </label>
                      <div className="mt-1">
                         <input
                             value={password}
                             onChange={e => setPassword(e.target.value)}
                             id="password"
                             name="password"
                             type="password"
                             autoComplete="current-password"
                             className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                         />
                         {displayFieldError('password')}
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

                   <div className="text-center text-sm text-gray-500">
                      Already have an account?{" "}
                      <Link href="/auth/signup">
                         <a className="text-blue-500 underline"> Sign in</a>
                      </Link>
                   </div>
                </form>
             </div>
          </div>
       </div>
   );
};

export default SignUp;