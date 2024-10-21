import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import useAuthenticated from "../../hooks/useAuthenticated";
import Logout from "../logout/Logout";
import ConfirmPopup from "../confirmPopup/ConfirmPopup";
import styles from "./taskList.module.css";
import DeleteIcon from "../../assets/deleteIcon.svg";
import EditIcon from "../../assets/editIcon.svg";
import TaskFilter from "../taskFilter/TaskFilter";

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

function TaskList() {
  const isAuthenticated = useAuthenticated();
  const tasks = useSelector((state: { tasks: Task[] }) => state.tasks);
  const dispatch = useDispatch();

  const [fillteredTasks, setFilteredTasks] = useState([...tasks]);
  const [showDeletePopup, setShowDeletePopup] = useState<boolean>(false);
  const [showCompletePopup, setShowCompletePopup] = useState<boolean>(false);
  const [taskToDelete, setTaskToDelete] = useState<number>(0);
  const [taskToComplete, setTaskToComplete] = useState<number>(0);

  useEffect(() => {
    setFilteredTasks([...tasks]);
  }, [tasks]);

  const handleShowCompletePopup = (id: number) => {
    setShowCompletePopup(true);
    setTaskToComplete(id);
  };

  const handleComplete = (id: number) => {
    setShowCompletePopup(false);
    dispatch({ type: "tasks/completeTask", payload: id });
  };

  const handleShowDeletePopup = (id: number) => {
    setShowDeletePopup(true);
    setTaskToDelete(id);
  };

  const handleDelete = (id: number) => {
    setShowDeletePopup(false);
    dispatch({ type: "tasks/deleteTask", payload: id });
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
          <Link to={"/tasks/addTask"} className={styles.addBtn}>
            Add Task
          </Link>
          <TaskFilter tasks={tasks} setFilteredTasks={setFilteredTasks} />
        </div>
        <ul className={styles.tasks}>
          {fillteredTasks.length === 0 && (
            <li className={styles.task}>
              <span className={styles.text}>There are no tasks!</span>
            </li>
          )}
          {fillteredTasks.map((task) => (
            <li className={styles.task} key={task.id}>
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
          onConfirm={() => handleDelete(taskToDelete)}
          onCancel={() => setShowDeletePopup(false)}
        />
      )}

      {showCompletePopup && (
        <ConfirmPopup
          message="Do you want to change the status of this task?"
          onConfirm={() => handleComplete(taskToComplete)}
          onCancel={() => setShowCompletePopup(false)}
        />
      )}
    </div>
  );
}

export default TaskList;
