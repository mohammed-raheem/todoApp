import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import TaskForm from "./TaskForm";

const mockStore = configureStore([]);

let mockParams: { taskId: string | undefined } = { taskId: undefined };

jest.mock("../../hooks/useAuthenticated", () => ({
  __esModule: true,
  default: () => true,
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => mockParams,
  useNavigate: () => jest.fn(),
}));

describe("TaskForm", () => {
  const initialState = {
    tasks: [{ id: 1, title: "Task 1", completed: false }],
  };

  it("renders add task form when no taskId is provided", () => {
    const store = mockStore(initialState);
    render(
      <Provider store={store}>
        <BrowserRouter>
          <TaskForm />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText("Add new task")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Task name")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Add" })).toBeInTheDocument();
  });

  it("handles adding a new task", () => {
    const store = mockStore(initialState);
    render(
      <Provider store={store}>
        <BrowserRouter>
          <TaskForm />
        </BrowserRouter>
      </Provider>
    );

    fireEvent.change(screen.getByPlaceholderText("Task name"), {
      target: { value: "New Task" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Add" }));

    const actions = store.getActions();
    expect(actions[0]).toEqual({ type: "tasks/addTask", payload: "New Task" });
  });

  it("renders edit task form when taskId is provided", () => {
    mockParams = { taskId: "1" };

    const store = mockStore(initialState);
    render(
      <Provider store={store}>
        <BrowserRouter>
          <TaskForm />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText("Edit Task")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Task 1")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Edit" })).toBeInTheDocument();
  });

  it("handles editing a task", () => {
    mockParams = { taskId: "1" };

    const store = mockStore(initialState);
    render(
      <Provider store={store}>
        <BrowserRouter>
          <TaskForm />
        </BrowserRouter>
      </Provider>
    );

    fireEvent.change(screen.getByDisplayValue("Task 1"), {
      target: { value: "Updated Task" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Edit" }));

    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: "tasks/editTask",
      payload: { id: 1, title: "Updated Task" },
    });
  });
});
