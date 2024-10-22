import tasksReducer, {
  addTask,
  editTask,
  deleteTask,
  completeTask,
} from "./tasksSlice";
import { Task } from "../types";

describe("tasks reducer", () => {
  const initialState: Task[] = [];

  it("should handle addTask", () => {
    const newState = tasksReducer(initialState, addTask("New task"));
    expect(newState).toEqual([
      { id: expect.any(Number), title: "New task", completed: false },
    ]);
    expect(localStorage.getItem("tasks")).toBe(JSON.stringify(newState));
  });

  it("should handle editTask", () => {
    const state = [{ id: 1, title: "Old task", completed: false }];
    const newState = tasksReducer(
      state,
      editTask({ id: 1, title: "Updated task" })
    );
    expect(newState).toEqual([
      { id: 1, title: "Updated task", completed: false },
    ]);
    expect(localStorage.getItem("tasks")).toBe(JSON.stringify(newState));
  });

  it("should handle deleteTask", () => {
    const state = [{ id: 1, title: "Task to delete", completed: false }];
    const newState = tasksReducer(state, deleteTask(1));
    expect(newState).toEqual([]);
    expect(localStorage.getItem("tasks")).toBe(JSON.stringify(newState));
  });

  it("should handle completeTask", () => {
    const state = [{ id: 1, title: "Task to complete", completed: false }];
    const newState = tasksReducer(state, completeTask(1));
    expect(newState).toEqual([
      { id: 1, title: "Task to complete", completed: true },
    ]);
    expect(localStorage.getItem("tasks")).toBe(JSON.stringify(newState));
  });

  it("should toggle task completion status", () => {
    const state = [{ id: 1, title: "Task", completed: true }];
    const newState = tasksReducer(state, completeTask(1));
    expect(newState).toEqual([{ id: 1, title: "Task", completed: false }]);
    expect(localStorage.getItem("tasks")).toBe(JSON.stringify(newState));
  });
});

describe("task action creators", () => {
  it("should create an action to add a task", () => {
    const expectedAction = {
      type: "tasks/addTask",
      payload: "New task",
    };
    expect(addTask("New task")).toEqual(expectedAction);
  });

  it("should create an action to edit a task", () => {
    const expectedAction = {
      type: "tasks/editTask",
      payload: { id: 1, title: "Updated task" },
    };
    expect(editTask({ id: 1, title: "Updated task" })).toEqual(expectedAction);
  });

  it("should create an action to delete a task", () => {
    const expectedAction = {
      type: "tasks/deleteTask",
      payload: 1,
    };
    expect(deleteTask(1)).toEqual(expectedAction);
  });

  it("should create an action to complete a task", () => {
    const expectedAction = {
      type: "tasks/completeTask",
      payload: 1,
    };
    expect(completeTask(1)).toEqual(expectedAction);
  });
});
