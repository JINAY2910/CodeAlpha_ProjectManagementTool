import React, { useState } from 'react';
import moment from 'moment';
import axios from 'axios';
import toast from 'react-hot-toast';
import classes from './TaskItem.module.scss';

function TaskItem({ task, deleteTask }) {
  const [isCompleted, setIsCompleted] = useState(task.completed);
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckboxClick = async () => {
    try {
      setIsLoading(true);
      await axios.put(`/api/tasks/${task._id}`, {
        completed: !isCompleted,
      });
      setIsCompleted(!isCompleted);
      toast.success('Task updated successfully');
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`${classes.task_item} ${isCompleted ? classes.completed : ''}`}>
      <div className={classes.task_info}>
        <div className={classes.checkbox} onClick={handleCheckboxClick}>
          <input type="checkbox" checked={isCompleted} readOnly disabled={isLoading} />
          <div className={classes.customCheck}></div>
        </div>
        <p className={classes.task_title}>{task.title}</p>
      </div>
      <div className={classes.task_meta}>
        <span className={classes.date}>{moment(task.createdAt).format('MMM Do YY')}</span>
        <button
          type="button"
          className={classes.deleteBtn}
          onClick={() => deleteTask(task._id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default TaskItem;
