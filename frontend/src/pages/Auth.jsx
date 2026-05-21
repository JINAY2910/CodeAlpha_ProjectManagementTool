import React, { useState } from 'react';
import Login from '../components/auth/Login';
import Register from '../components/auth/Register';
import Layout from '../components/Layout';
import classes from './Auth.module.scss';

function Auth() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <Layout>
      <div className={classes.form_container}>
        {isLogin ? (
          <Login toggleForm={() => setIsLogin(false)} />
        ) : (
          <Register toggleForm={() => setIsLogin(true)} />
        )}
      </div>
    </Layout>
  );
}

export default Auth;
