import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState, Task } from "../../types";
import { completeTask, deleteTask } from "../../redux/tasksSlice";
import useAuthenticated from "../../hooks/useAuthenticated";
import Logout from "../logout/Logout";
import ConfirmPopup from "../confirmPopup/ConfirmPopup";
import TaskFilter from "../taskFilter/TaskFilter";
import styles from "./taskList.module.css";
import DeleteIcon from "../../assets/deleteIcon.svg";
import EditIcon from "../../assets/editIcon.svg";

function TaskList() {
  const isAuthenticated = useAuthenticated();
  const tasks = useSelector((state: RootState) => state.tasks);
  const dispatch = useDispatch();

  const [filteredTasks, setFilteredTasks] = useState<Task[]>(tasks);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showCompletePopup, setShowCompletePopup] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<number | null>(null);
  const [taskToComplete, setTaskToComplete] = useState<number | null>(null);
  const [deletingTaskId, setDeletingTaskId] = useState<number | null>(null);

  useEffect(() => {
    setFilteredTasks(tasks);
  }, [tasks]);

  const handleShowCompletePopup = (id: number) => {
    setShowCompletePopup(true);
    setTaskToComplete(id);
  };

  const handleComplete = () => {
    if (taskToComplete !== null) {
      dispatch(completeTask(taskToComplete));
      setShowCompletePopup(false);
      setTaskToComplete(null);
    }
  };

  const handleShowDeletePopup = (id: number) => {
    setShowDeletePopup(true);
    setTaskToDelete(id);
  };

  const handleDelete = () => {
    if (taskToDelete !== null) {
      setDeletingTaskId(taskToDelete);
      setTimeout(() => {
        dispatch(deleteTask(taskToDelete));
        setShowDeletePopup(false);
        setTaskToDelete(null);
        setDeletingTaskId(null);
      }, 300);
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className={styles.taskList}>
      <Logout />
      <div className={styles.container}>
        <h1 className={styles.title}>Todo list</h1>
        <div className={styles.controllers}>
          <Link to="/tasks/addTask" className={styles.addBtn}>
            Add Task
          </Link>
          <TaskFilter tasks={tasks} setFilteredTasks={setFilteredTasks} />
        </div>
        <ul className={styles.tasks}>
          {filteredTasks.length === 0 && (
            <li className={styles.task}>
              <span className={styles.text}>There are no tasks!</span>
            </li>
          )}
          {filteredTasks.map((task, index) => (
            <li
              className={`${styles.task} ${
                deletingTaskId === task.id ? styles.deleting : ""
              }`}
              key={task.id}
              style={{ animationDelay: `${index * 0.08}s` }}
            >
              <div className={styles.taskTitle}>
                <input
                  type="checkbox"
                  className={styles.checkbox}
                  checked={task.completed}
                  onChange={() => handleShowCompletePopup(task.id)}
                />
                <span className={styles.text}>{task.title}</span>
              </div>
              <div className={styles.taskBtns}>
                <Link
                  to={`/tasks/editTask/${task.id}`}
                  className={styles.editBtn}
                >
                  <img src={EditIcon} alt="edit" />
                </Link>
                <button
                  className={styles.deleteBtn}
                  onClick={() => handleShowDeletePopup(task.id)}
                >
                  <img src={DeleteIcon} alt="delete" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      {showDeletePopup && (
        <ConfirmPopup
          message="Are you sure you want to delete this task?"
          onConfirm={handleDelete}
          onCancel={() => setShowDeletePopup(false)}
        />
      )}
      {showCompletePopup && (
        <ConfirmPopup
          message="Do you want to change the status of this task?"
          onConfirm={handleComplete}
          onCancel={() => setShowCompletePopup(false)}
        />
      )}
    </div>
  );
}

export default TaskList;
