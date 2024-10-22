import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../types";
import { addTask, editTask } from "../../redux/tasksSlice";
import Logout from "../logout/Logout";
import NotificationPopup from "../notificationPopup/NotificationPopup";
import useAuthenticated from "../../hooks/useAuthenticated";
import styles from "./taskForm.module.css";

function TaskForm() {
  const isAuthenticated = useAuthenticated();
  const { taskId } = useParams<{ taskId: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.tasks);

  const [task, setTask] = useState("");
  const [isNotificationVisible, setNotificationVisible] = useState(false);

  const isEdit = taskId !== undefined;

  useEffect(() => {
    if (isEdit) {
      const existingTask = tasks.find((t) => t.id === Number(taskId));
      if (existingTask) {
        setTask(existingTask.title);
      } else {
        navigate("/tasks");
      }
    }
  }, [isEdit, taskId, tasks, navigate]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isEdit) {
      dispatch(editTask({ id: Number(taskId), title: task }));
    } else {
      dispatch(addTask(task));
      setTask("");
    }

    setNotificationVisible(true);
    setTimeout(() => {
      setNotificationVisible(false);
    }, 2000);
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
