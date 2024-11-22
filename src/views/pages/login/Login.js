import React from 'react';
import { Link } from 'react-router-dom';
import './Login.css';
import bgImage from '.././../../assets/images/vue.jpg';
import { CIcon } from '@coreui/icons-react';
import { cilUser } from '@coreui/icons';

const Login = () => {
  return (
    <div
      className="login-page-container d-flex align-items-center justify-content-end "
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="card-container">
        <div className="card shadow-lg">
          <div className="card-body">
            <form>
              <h1 className="text-white">Login</h1>
              <p className="text-muted">Sign in to your account</p>

              {/* Username Field */}
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text text-white">
                    <CIcon icon={cilUser} size={20} />
                  </span>
                </div>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Username"
                  autoComplete="username"
                  required
                />
              </div>

              {/* Password Field */}
              <div className="input-group mb-4">
                <div className="input-group-prepend">
                  <span className="input-group-text text-white">
                    <CIcon icon={cilUser} size={20} />
                  </span>
                </div>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  autoComplete="current-password"
                  required
                />
              </div>

              {/* Login Button */}
              <div className="row">
                <div className="col-12">
                  <button type="submit" className="btn btn-primary w-100">
                    Login
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Optional Sign-up Card */}
        {/* <div className="card bg-primary text-white py-5">
          <div className="card-body text-center">
            <h2>Sign up</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            </p>
            <Link to="/register">
              <button className="btn btn-light">
                Register Now!
              </button>
            </Link>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Login;
