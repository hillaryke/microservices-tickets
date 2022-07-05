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
       <div className="container">
          <div className="row">
             <div className="col-lg-10 col-xl-9 mx-auto">
                <div className="card flex-row my-5 border-0 shadow rounded-3 overflow-hidden">
                   <div className="card-img-left d-none d-md-flex">
                   </div>
                   <div className="card-body p-4 p-sm-5">
                      <h5 className="card-title text-center mb-5 fw-light fs-5">Sign Up</h5>

                      <form onSubmit={onFormSubmit}>
                         <div className="form-floating mb-3">
                            <input
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                type="email"
                                className="form-control"
                                id="inputEmail"
                                placeholder="name@example.com"
                            />
                            <label htmlFor="inputEmail">Email address</label>
                         </div>

                         <div className="form-floating mb-3">
                            <input
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                type="password"
                                className="form-control"
                                id="inputPassword"
                                placeholder="Password"
                            />
                            <label htmlFor="inputPassword">Password</label>
                         </div>

                         {errors}

                         <div className="d-grid mb-2">
                            <button className="btn btn-lg btn-primary btn-login fw-bold text-uppercase"
                                    type="submit">Sign Up
                            </button>
                         </div>

                         <Link
                             className="d-block text-center mt-2 small"
                             href="/auth/signin"
                         >Have an account? Sign In
                         </Link>

                      </form>
                   </div>
                </div>
             </div>
          </div>
       </div>
   );
};

export default SignUp;