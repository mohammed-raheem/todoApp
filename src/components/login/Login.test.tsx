import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Login from "./Login";

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("Login", () => {
  beforeEach(() => {
    localStorage.clear();
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
  });

  it("renders login form", () => {
    expect(screen.getByText("Login")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Submit" })).toBeInTheDocument();
  });

  it("handles successful login", () => {
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "m@gmail.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "123" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Submit" }));

    expect(mockNavigate).toHaveBeenCalledWith("tasks");
    expect(localStorage.getItem("isAuthenticated")).toBe("true");
  });

  it("handles failed login", () => {
    const alertMock = jest.spyOn(window, "alert").mockImplementation(() => {});

    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "wrong@email.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "wrongpassword" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Submit" }));

    expect(alertMock).toHaveBeenCalledWith(
      "Login failed! Please check your email and password."
    );
    expect(localStorage.getItem("isAuthenticated")).toBeNull();

    alertMock.mockRestore();
  });
});
