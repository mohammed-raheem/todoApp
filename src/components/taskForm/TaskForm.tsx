import { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Logout from "../logout/Logout";
import NotificationPopup from "../notificationPopup/NotificationPopup";
import useAuthenticated from "../../hooks/useAuthenticated";
import styles from "./taskForm.module.css";

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

function TaskForm() {
  const isAuthenticated = useAuthenticated();
  const { taskId } = useParams();
  const tasks = useSelector((state: { tasks: Task[] }) => state.tasks);
  const taskTitle = tasks.find(
    (task: Task) => task.id === Number(taskId)
  )?.title;
  const dispatch = useDispatch();
  const isEdit = taskId !== undefined;
  const currentTask = taskId ? taskTitle : "";
  const [task, setTask] = useState(currentTask);
  const [isNotificationVisible, setNotificationVisible] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setNotificationVisible(true);
    setTimeout(() => {
      setNotificationVisible(false);
    }, 2000);

    if (isEdit) {
      dispatch({
        type: "tasks/editTask",
        payload: { id: Number(taskId), title: task },
      });
    } else {
      dispatch({ type: "tasks/addTask", payload: task });
      setTask("");
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className={styles.taskForm}>
      <Logout />
      <div className={styles.container}>
        <h1 className={styles.title}>
          {isEdit ? "Edit Task" : "Add new task"}
        </h1>
        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            type="text"
            className={styles.task}
            placeholder="Task name"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            autoFocus
            required
          />
          <button className={styles.addBtn}>{isEdit ? "Edit" : "Add"}</button>
        </form>
      </div>

      <NotificationPopup
        message={
          isEdit ? "Task updated successfully" : "Task added successfully"
        }
        isVisible={isNotificationVisible}
      />
    </div>
  );
}

export default TaskForm;
