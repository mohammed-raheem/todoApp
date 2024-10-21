import { Routes, Route } from "react-router-dom";
import "./App.css";

import Login from "./components/login/Login";
import TaskList from "./components/taskList/TaskList";
import TaskForm from "./components/taskForm/TaskForm";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="tasks" element={<TaskList />} />
      <Route path="tasks/addTask" element={<TaskForm />} />
      <Route path="tasks/editTask/:taskId" element={<TaskForm />} />
      <Route path="*" element={<p>There's nothing here: 404!</p>} />
    </Routes>
  );
}

export default App;
