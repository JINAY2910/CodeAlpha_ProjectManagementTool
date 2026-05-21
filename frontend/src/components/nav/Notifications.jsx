import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaBell, FaTimes } from 'react-icons/fa';
import classes from './Notifications.module.scss';

function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const fetchNotifications = async () => {
    try {
      const { data } = await axios.get('/api/notifications/my');
      setNotifications(data);
    } catch (err) {
      console.log('Failed to fetch notifications');
    }
  };

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 10000); // Poll every 10s
    return () => clearInterval(interval);
  }, []);

  const markAsRead = async (id) => {
    try {
      await axios.put(`/api/notifications/${id}/read`);
      setNotifications(notifications.map(n => 
        n._id === id ? { ...n, isRead: true } : n
      ));
    } catch (err) {
      console.log(err);
    }
  };

  const deleteNotification = async (e, id) => {
    e.stopPropagation();
    try {
      await axios.delete(`/api/notifications/${id}`);
      setNotifications(notifications.filter(n => n._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className={classes.container}>
      <div className={classes.bellWrapper} onClick={() => setIsOpen(!isOpen)}>
        <FaBell className={classes.icon} />
        {unreadCount > 0 && <span className={classes.badge}>{unreadCount}</span>}
      </div>

      {isOpen && (
        <div className={classes.dropdown}>
          <div className={classes.header}>
            <h4>Notifications</h4>
          </div>
          <div className={classes.list}>
            {notifications.length === 0 ? (
              <p className={classes.empty}>No notifications</p>
            ) : (
              notifications.map(notif => (
                <div 
                  key={notif._id} 
                  className={`${classes.item} ${!notif.isRead ? classes.unread : ''}`}
                  onClick={() => !notif.isRead && markAsRead(notif._id)}
                >
                  <div className={classes.itemContent}>
                    <p>{notif.message}</p>
                    <button 
                      className={classes.deleteBtn} 
                      onClick={(e) => deleteNotification(e, notif._id)}
                      title="Delete notification"
                    >
                      <FaTimes />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Notifications;
