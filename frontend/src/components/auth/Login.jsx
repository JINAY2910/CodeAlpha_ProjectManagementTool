import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import useAuth from '../../hooks/useAuth';

import classes from './AuthForm.module.scss';

function Login({ toggleForm }) {
  const { verifyAuth, auth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth?.isLoggedIn) {
      navigate('/');
    }
  }, [auth]);

  const login = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    try {
      await axios.post('/api/auth/login', {
        email,
        password,
      });
      toast.success('Login successful');
      await verifyAuth();
      navigate('/');
    } catch (err) {
      console.log(err);
      const errorMessage = err.response?.data?.message || 'Login failed. Please check your credentials.';
      toast.error(errorMessage);
      verifyAuth();
    }
  };
  return (
    <div className={classes.register}>
      <h1 className={classes.title}>Login</h1>
      <form className={classes.authForm} onSubmit={login}>
        <label htmlFor="email">
          Email:
          <input name="email" type="email" placeholder="Email" required />
        </label>
        <label htmlFor="password">
          Password:
          <input
            name="password"
            type="password"
            placeholder="Password"
            required
          />
        </label>
        <button type="submit">Login</button>
      </form>
      <p className={classes.toggleText}>
        Don't have an account?{' '}
        <span className={classes.toggleLink} onClick={toggleForm}>
          Register here
        </span>
      </p>
      <div className={classes.adminAccessRow}>
        <Link to="/admin-login" className={classes.adminAccessLink}>Admin Access</Link>
      </div>
    </div>
  );
}

export default Login;
