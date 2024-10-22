import { TaskFilterProps } from "../../types";
import styles from "./taskFilter.module.css";

function TaskFilter({ tasks, setFilteredTasks }: TaskFilterProps) {
  const handleFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;

    if (value === "completed") {
      setFilteredTasks(tasks.filter((task) => task.completed));
    } else if (value === "pending") {
      setFilteredTasks(tasks.filter((task) => !task.completed));
    } else {
      setFilteredTasks(tasks);
    }
  };

  return (
    <select className={styles.filters} onChange={handleFilter}>
      <option value="all">All</option>
      <option value="completed">Completed</option>
      <option value="pending">Pending</option>
    </select>
  );
}

export default TaskFilter;
