import { createSlice } from "@reduxjs/toolkit";

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

const tasks = localStorage.getItem("tasks")
  ? JSON.parse(localStorage.getItem("tasks")!)
  : [];
const initialState: Task[] = tasks;

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action) => {
      const newTask: Task = {
        id: Date.now(),
        title: action.payload,
        completed: false,
      };

      state.push(newTask);
      localStorage.setItem("tasks", JSON.stringify(state));
    },

    editTask: (state, action) => {
      const { id, title } = action.payload;
      const task = state.find((task) => task.id === id);
      if (task) {
        task.title = title;
      }
      localStorage.setItem("tasks", JSON.stringify(state));
    },

    deleteTask: (state, action) => {
      const taskId = action.payload;
      const index = state.findIndex((task) => task.id === taskId);
      state.splice(index, 1);
      localStorage.setItem("tasks", JSON.stringify(state));
    },

    completeTask: (state, action) => {
      const task = state.find((task) => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
      localStorage.setItem("tasks", JSON.stringify(state));
    },
  },
});

export const { addTask, editTask, deleteTask, completeTask } =
  tasksSlice.actions;

export default tasksSlice.reducer;
