import { useState } from 'react';

export default () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onFormSubmit = (event) => {
        event.preventDefault();
        console.log(email, password);
    };

    return (<div className="container">
            <div className="row">
                <div className="col-lg-10 col-xl-9 mx-auto">
                    <div className="card flex-row my-5 border-0 shadow rounded-3 overflow-hidden">
                        <div className="card-img-left d-none d-md-flex">
                        </div>
                        <div className="card-body p-4 p-sm-5">
                            <h5 className="card-title text-center mb-5 fw-light fs-5">Sign Up</h5>

                            <form>
                                <div className="form-floating mb-3">
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="inputEmail"
                                        placeholder="name@example.com"
                                    />
                                    <label htmlFor="inputEmail">Email address</label>
                                </div>

                                <div className="form-floating mb-3">
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="inputPassword"
                                        placeholder="Password"
                                    />
                                    <label htmlFor="inputPassword">Password</label>
                                </div>

                                <div className="d-grid mb-2">
                                    <button className="btn btn-lg btn-primary btn-login fw-bold text-uppercase"
                                            type="submit">Sign Up
                                    </button>
                                </div>

                                <a className="d-block text-center mt-2 small" href="#">Have an account? Sign In</a>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}