import { render, screen, fireEvent } from "@testing-library/react";
import ConfirmPopup from "./ConfirmPopup";

describe("ConfirmPopup", () => {
  const mockOnConfirm = jest.fn();
  const mockOnCancel = jest.fn();
  const message = "Are you sure?";

  beforeEach(() => {
    render(
      <ConfirmPopup
        message={message}
        onConfirm={mockOnConfirm}
        onCancel={mockOnCancel}
      />
    );
  });

  it("renders confirm popup", () => {
    expect(screen.getByText(message)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Cancel" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Confirm" })).toBeInTheDocument();
  });

  it("handles confirm action", () => {
    fireEvent.click(screen.getByRole("button", { name: "Confirm" }));
    expect(mockOnConfirm).toHaveBeenCalled();
  });

  it("handles cancel action", () => {
    fireEvent.click(screen.getByRole("button", { name: "Cancel" }));
    expect(mockOnCancel).toHaveBeenCalled();
  });
});
