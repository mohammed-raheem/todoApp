import { render, screen, fireEvent } from "@testing-library/react";
import TaskFilter from "./TaskFilter";

describe("TaskFilter", () => {
  const mockTasks = [
    { id: 1, title: "Task 1", completed: false },
    { id: 2, title: "Task 2", completed: true },
  ];
  const mockSetFilteredTasks = jest.fn();

  beforeEach(() => {
    render(
      <TaskFilter
        tasks={mockTasks}
        setFilteredTasks={mockSetFilteredTasks}
        setCurrentFilter={jest.fn()}
      />
    );
  });

  it("renders filter options", () => {
    expect(screen.getByRole("combobox")).toBeInTheDocument();
    expect(screen.getByText("All")).toBeInTheDocument();
    expect(screen.getByText("Completed")).toBeInTheDocument();
    expect(screen.getByText("Pending")).toBeInTheDocument();
  });

  it("filters completed tasks", () => {
    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: "completed" },
    });
    expect(mockSetFilteredTasks).toHaveBeenCalledWith([mockTasks[1]]);
  });

  it("filters pending tasks", () => {
    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: "pending" },
    });
    expect(mockSetFilteredTasks).toHaveBeenCalledWith([mockTasks[0]]);
  });

  it("shows all tasks", () => {
    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: "all" },
    });
    expect(mockSetFilteredTasks).toHaveBeenCalledWith(mockTasks);
  });
});
