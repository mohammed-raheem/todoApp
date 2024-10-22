import { TaskFilterProps, FilterValue } from "../../types";
import styles from "./taskFilter.module.css";

function TaskFilter({
  tasks,
  setFilteredTasks,
  setCurrentFilter,
}: TaskFilterProps) {
  const handleFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as FilterValue;

    setCurrentFilter(value);
    setFilteredTasks(
      tasks.filter((task) => {
        if (value === "completed") return task.completed;
        if (value === "pending") return !task.completed;
        return true;
      })
    );
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
