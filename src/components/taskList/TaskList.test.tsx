import { render, screen, fireEvent, act } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import TaskList from "./TaskList";

const mockStore = configureStore([]);

jest.mock("../../assets/deleteIcon.svg", () => "DeleteIcon");
jest.mock("../../assets/editIcon.svg", () => "EditIcon");
jest.mock("../../hooks/useAuthenticated", () => ({
  __esModule: true,
  default: () => true,
}));

describe("TaskList", () => {
  const initialState = {
    tasks: [
      { id: 1, title: "Task 1", completed: false },
      { id: 2, title: "Task 2", completed: true },
    ],
  };

  it("renders task list", () => {
    const store = mockStore(initialState);
    render(
      <Provider store={store}>
        <BrowserRouter>
          <TaskList />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText("Todo list")).toBeInTheDocument();
    expect(screen.getByText("Task 1")).toBeInTheDocument();
    expect(screen.getByText("Task 2")).toBeInTheDocument();
  });

  it("handles task completion", async () => {
    const store = mockStore(initialState);
    render(
      <Provider store={store}>
        <BrowserRouter>
          <TaskList />
        </BrowserRouter>
      </Provider>
    );

    await act(async () => {
      fireEvent.click(screen.getAllByRole("checkbox")[0]);
    });

    expect(
      screen.getByText("Do you want to change the status of this task?")
    ).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(screen.getByText("Confirm"));
    });

    const actions = store.getActions();
    expect(actions[0]).toEqual({ type: "tasks/completeTask", payload: 1 });
  });

  it("handles task deletion", async () => {
    jest.useFakeTimers();
    const store = mockStore(initialState);
    render(
      <Provider store={store}>
        <BrowserRouter>
          <TaskList />
        </BrowserRouter>
      </Provider>
    );

    await act(async () => {
      fireEvent.click(screen.getAllByAltText("delete")[0]);
    });

    expect(
      screen.getByText("Are you sure you want to delete this task?")
    ).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(screen.getByText("Confirm"));
      jest.advanceTimersByTime(300);
    });

    const actions = store.getActions();
    expect(actions[0]).toEqual({ type: "tasks/deleteTask", payload: 1 });

    jest.useRealTimers();
  });
});
