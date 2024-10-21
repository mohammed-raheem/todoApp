import { render, screen } from "@testing-library/react";
import NotificationPopup from "./NotificationPopup";

describe("NotificationPopup", () => {
  const message = "Test notification";

  it("renders notification when visible", () => {
    render(<NotificationPopup message={message} isVisible={true} />);
    expect(screen.getByText(message)).toBeInTheDocument();
    expect(screen.getByText(message)).toHaveClass("show");
  });

  it("does not show notification when not visible", () => {
    render(<NotificationPopup message={message} isVisible={false} />);
    expect(screen.getByText(message)).not.toHaveClass("show");
  });
});
