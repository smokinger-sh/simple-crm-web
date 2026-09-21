import { render, screen, fireEvent } from "@testing-library/react";
import SearchBar from "./SearchBar";

describe("SearchBar", () => {
  it("renders the current searchTerm as the input value", () => {
    // Arrange + Act: render with searchTerm already set to "Ada";
    // setSearchTerm is unused in this test, so a no-op function is enough
    render(<SearchBar searchTerm="Ada" setSearchTerm={() => {}} />);
    // Assert: the input's value reflects the searchTerm prop
    expect(
      screen.getByPlaceholderText("Search by name or email..."),
    ).toHaveValue("Ada");
  });

  it("calls setSearchTerm with the new value when the user types", () => {
    // Arrange: a mock function so the test can inspect how it was called
    const setSearchTerm = vi.fn();
    render(<SearchBar searchTerm="" setSearchTerm={setSearchTerm} />);

    // Act: simulate typing "Turing" into the input
    const input = screen.getByPlaceholderText("Search by name or email...");
    fireEvent.change(input, { target: { value: "Turing" } });

    // Assert: SearchBar called setSearchTerm with the new text,
    // not whether the input's value changed on screen (it doesn't own that state)
    expect(setSearchTerm).toHaveBeenCalledWith("Turing");
  });
});