import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Logout from "./Logout";

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("Logout", () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <Logout />
      </BrowserRouter>
    );
  });

  it("renders logout button", () => {
    expect(screen.getByRole("button", { name: "Logout" })).toBeInTheDocument();
  });

  it("handles logout", () => {
    fireEvent.click(screen.getByRole("button", { name: "Logout" }));

    expect(localStorage.getItem("tasks")).toBe(null);
    expect(localStorage.getItem("isAuthenticated")).toBe(null);
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });
});
