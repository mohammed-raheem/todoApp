import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./tasksSlice";
import { RootState } from "../types";

const store = configureStore<RootState>({
  reducer: {
    tasks: tasksReducer,
  },
});

export default store;
