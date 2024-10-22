import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Task } from "../types";

const getInitialState = (): Task[] => {
  const storedTasks = localStorage.getItem("tasks");
  return storedTasks ? JSON.parse(storedTasks) : [];
};

const saveTasksToLocalStorage = (tasks: Task[]) => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

export const tasksSlice = createSlice({
  name: "tasks",
  initialState: getInitialState(),
  reducers: {
    addTask: (state, action: PayloadAction<string>) => {
      const newTask: Task = {
        id: Date.now(),
        title: action.payload,
        completed: false,
      };
      state.push(newTask);
      saveTasksToLocalStorage(state);
    },
    editTask: (state, action: PayloadAction<{ id: number; title: string }>) => {
      const { id, title } = action.payload;
      const task = state.find((task) => task.id === id);
      if (task) {
        task.title = title;
        saveTasksToLocalStorage(state);
      }
    },
    deleteTask: (state, action: PayloadAction<number>) => {
      const index = state.findIndex((task) => task.id === action.payload);
      if (index !== -1) {
        state.splice(index, 1);
        saveTasksToLocalStorage(state);
      }
    },
    completeTask: (state, action: PayloadAction<number>) => {
      const task = state.find((task) => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
        saveTasksToLocalStorage(state);
      }
    },
  },
});

export const { addTask, editTask, deleteTask, completeTask } =
  tasksSlice.actions;

export default tasksSlice.reducer;
