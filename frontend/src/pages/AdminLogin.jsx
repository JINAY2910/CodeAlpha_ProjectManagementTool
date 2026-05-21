import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import useAuth from '../hooks/useAuth';
import Layout from '../components/Layout';
import classes from './AdminLogin.module.scss';

function AdminLogin() {
  const { verifyAuth, auth } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (auth?.isAdmin) {
      navigate('/admin');
    } else if (auth?.isLoggedIn) {
      toast.error('You are not an admin');
      navigate('/');
    }
  }, [auth]);

  const login = async (e) => {
    e.preventDefault();
    setLoading(true);
    const email = e.target.email.value;
    const password = e.target.password.value;
    
    try {
      const res = await axios.post('/api/auth/login', {
        email,
        password,
      });
      
      const authData = await verifyAuth();
      if (authData?.isAdmin) {
        toast.success('Admin login successful');
        navigate('/admin');
      } else {
        toast.error('Account does not have admin privileges');
        await axios.get('/api/auth/logout');
        verifyAuth();
      }
    } catch (err) {
      console.log(err);
      const errorMessage = err.response?.data?.message || 'Login failed. Invalid credentials.';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className={classes.portalContainer}>
        <div className={classes.loginBox}>
          <div className={classes.demoBanner}>
            Demo: admin123@gmail.com / admin123
          </div>
          <div className={classes.header}>
            <h2>Admin Portal</h2>
            <p>Authorized personnel only.</p>
          </div>
          
          <form className={classes.form} onSubmit={login}>
            <div className={classes.inputGroup}>
              <label htmlFor="email">Admin ID (Email)</label>
              <input name="email" type="email" placeholder="admin@domain.com" required />
            </div>
            
            <div className={classes.inputGroup}>
              <label htmlFor="password">Password</label>
              <input name="password" type="password" placeholder="••••••••" required />
            </div>
            
            <button type="submit" disabled={loading} className={classes.submitBtn}>
              {loading ? 'Authenticating...' : 'Access Portal'}
            </button>
          </form>
          
          <p className={classes.backLink} onClick={() => navigate('/')}>
            ← Back to User Site
          </p>
        </div>
      </div>
    </Layout>
  );
}

export default AdminLogin;
