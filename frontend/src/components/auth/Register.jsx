import axios from 'axios';
import React from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

import classes from './AuthForm.module.scss';

function Register({ toggleForm }) {
  const register = async (e) => {
    e.preventDefault();
    const user = {
      name: e.target.name.value,
      email: e.target.email.value,
      password: e.target.password.value,
    };
    try {
      await axios.post(`/api/auth/register`, user);
      toast.success('Registered successfully');
    } catch (err) {
      console.log(err);
      const errorMessage = err.response?.data?.message || 'Something went wrong';
      toast.error(errorMessage);
    }
  };

  return (
    <div className={classes.register}>
      <h1 className={classes.title}>Register</h1>
      <form className={classes.authForm} onSubmit={register}>
        <label htmlFor="name">
          Full Name:
          <input name="name" type="text" placeholder="Full Name" required />
        </label>
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
        <button type="submit">Register</button>
      </form>
      <p className={classes.toggleText}>
        Already have an account?{' '}
        <span className={classes.toggleLink} onClick={toggleForm}>
          Login here
        </span>
      </p>
      <div className={classes.adminAccessRow}>
        <Link to="/admin-login" className={classes.adminAccessLink}>Admin Access</Link>
      </div>
    </div>
  );
}

export default Register;
