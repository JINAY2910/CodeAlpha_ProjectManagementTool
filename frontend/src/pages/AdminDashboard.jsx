import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import Navbar from '../components/nav/Navbar';
import classes from './AdminDashboard.module.scss';

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [broadcastTaskTitle, setBroadcastTaskTitle] = useState('');
  const [broadcastMessage, setBroadcastMessage] = useState('');
  const [individualMessages, setIndividualMessages] = useState({});

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get('/api/admin/users');
      setUsers(data);
    } catch (err) {
      console.log(err);
      toast.error('Failed to fetch users');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleBroadcastTask = async (e) => {
    e.preventDefault();
    if (!broadcastTaskTitle) return toast.error('Task title is required');
    try {
      await axios.post('/api/admin/tasks/broadcast', { title: broadcastTaskTitle });
      toast.success('Task broadcasted to all users!');
      setBroadcastTaskTitle('');
    } catch (err) {
      console.log(err);
      toast.error('Failed to broadcast task');
    }
  };

  const handleBroadcastMessage = async (e) => {
    e.preventDefault();
    if (!broadcastMessage) return toast.error('Message is required');
    try {
      await axios.post('/api/admin/notifications/broadcast', { message: broadcastMessage });
      toast.success('Message broadcasted to all users!');
      setBroadcastMessage('');
    } catch (err) {
      console.log(err);
      toast.error('Failed to broadcast message');
    }
  };

  const handleSendIndividualMessage = async (e, userId) => {
    e.preventDefault();
    const message = individualMessages[userId];
    if (!message) return toast.error('Message cannot be empty');
    
    try {
      await axios.post('/api/admin/notifications/send', { userId, message });
      toast.success('Message sent to user!');
      setIndividualMessages({ ...individualMessages, [userId]: '' });
    } catch (err) {
      console.log(err);
      toast.error('Failed to send message');
    }
  };

  return (
    <Layout>
      <Navbar />
      <div className={classes.adminContainer}>
        <div className={classes.headerRow}>
          <h1 className={classes.title}>Admin Dashboard</h1>
          <Link to="/" className={classes.backLink}>← Back to Home</Link>
        </div>

        <div className={classes.broadcastSection}>
          <form className={classes.broadcastForm} onSubmit={handleBroadcastTask}>
            <h3>Broadcast Task</h3>
            <div className={classes.inputGroup}>
              <input
                type="text"
                placeholder="Task title..."
                value={broadcastTaskTitle}
                onChange={(e) => setBroadcastTaskTitle(e.target.value)}
              />
              <button type="submit">Assign to All</button>
            </div>
          </form>

          <form className={classes.broadcastForm} onSubmit={handleBroadcastMessage}>
            <h3>Broadcast Message</h3>
            <div className={classes.inputGroup}>
              <input
                type="text"
                placeholder="Message content..."
                value={broadcastMessage}
                onChange={(e) => setBroadcastMessage(e.target.value)}
              />
              <button type="submit">Send to All</button>
            </div>
          </form>
        </div>

        <div className={classes.usersSection}>
          <h3>Registered Users ({users.length})</h3>
          <div className={classes.userList}>
            {users.map(user => (
              <div key={user._id} className={classes.userCard}>
                <div className={classes.userInfo}>
                  <strong>{user.name}</strong>
                  <span>{user.email}</span>
                  {user.isAdmin && <span className={classes.badge}>Admin</span>}
                </div>
                {!user.isAdmin && (
                  <form 
                    className={classes.individualMessageForm} 
                    onSubmit={(e) => handleSendIndividualMessage(e, user._id)}
                  >
                    <input
                      type="text"
                      placeholder="Send direct message..."
                      value={individualMessages[user._id] || ''}
                      onChange={(e) => setIndividualMessages({ ...individualMessages, [user._id]: e.target.value })}
                    />
                    <button type="submit">Send</button>
                  </form>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default AdminDashboard;
