import { useState } from 'react';
import Router from 'next/router';
import Link from "next/link";
import useRequest from "../../hooks/use-request";

const SignUp = () => {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const { doRequest, errors } = useRequest({
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
       <div>
          <div>
             <h5>Sign Up</h5>

             <form onSubmit={onFormSubmit}>
                <div>
                   <input
                       value={email}
                       onChange={e => setEmail(e.target.value)}
                       type="email"
                       id="inputEmail"
                       placeholder="name@example.com"
                   />
                   <label htmlFor="inputEmail">Email address</label>
                </div>

                <div>
                   <input
                       value={password}
                       onChange={e => setPassword(e.target.value)}
                       type="password"
                       id="inputPassword"
                       placeholder="Password"
                   />
                   <label htmlFor="inputPassword">Password</label>
                </div>

                {errors}

                <div>
                   <button
                       type="submit">Sign Up
                   </button>
                </div>

                <Link href="/auth/signin">
                   <a>Have an account? Sign In</a>
                </Link>
             </form>
          </div>
       </div>
   );
};

export default SignUp;