import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import SearchableList from "./SearchableList";
import { sampleData } from "../../../sampleData"; // Adjust the import path as necessary

describe("SearchableList Component", () => {
  const setup = () => {
    render(
      <SearchableList data={sampleData} onSearch={() => {}} listHeight={400} />
    );
  };

  test("renders the SearchableList component", () => {
    setup();
    expect(screen.getByPlaceholderText(/search/i)).toBeInTheDocument();
    expect(screen.getByText(/Attended/i)).toBeInTheDocument();
    // expect(screen.getByText(/Absent/i)).toBeInTheDocument();
  });

  test("displays items in the list", () => {
    setup();
    expect(screen.getByText(/Liam Garcia/i)).toBeInTheDocument();
    expect(screen.getByText(/Mia Rodriguez/i)).toBeInTheDocument();
  });

  test("searches for items", () => {
    setup();
    const searchInput = screen.getByPlaceholderText(/search/i);
    fireEvent.change(searchInput, { target: { value: "Liam" } });
    expect(screen.getByText(/Liam Garcia/i)).toBeInTheDocument();
    expect(screen.queryByText(/Mia Rodriguez/i)).not.toBeInTheDocument();
  });

  test("expands and collapses sections", async () => {
    setup();

    let attendedSection = screen.getByRole("button", { name: /attended/i });

    fireEvent.click(attendedSection); // Collapse
    expect(screen.queryByText(/Liam Garcia/i)).not.toBeInTheDocument();

    attendedSection = screen.getByRole("button", { name: /attended/i });

    fireEvent.click(attendedSection); // Expand
    const listItem = await screen.findByText(/Liam Garcia/i);
    expect(listItem).toBeInTheDocument();
  });

  test("Search while one section is collapsed", async () => {
    setup();

    let attendedSection = screen.getByRole("button", { name: /attended/i });

    fireEvent.click(attendedSection); // Collapse
    expect(screen.queryByText(/Liam Garcia/i)).not.toBeInTheDocument();

    const searchInput = screen.getByPlaceholderText(/search/i);
    fireEvent.change(searchInput, { target: { value: "Liam" } });
    expect(screen.queryByText(/Liam Garcia/i)).not.toBeInTheDocument();

    attendedSection = screen.getByRole("button", { name: /attended/i });

    fireEvent.click(attendedSection); // Expand
    expect(screen.queryByText(/Liam Garcia/i)).toBeInTheDocument();
  });

  test("handles search results", () => {
    setup();
    const searchInput = screen.getByPlaceholderText(/search/i);
    fireEvent.change(searchInput, { target: { value: "Liam" } });
    expect(screen.queryByText(/Liam Garcia/i)).toBeInTheDocument();
  });

  test("handles no search results", () => {
    setup();
    const searchInput = screen.getByPlaceholderText(/search/i);
    fireEvent.change(searchInput, { target: { value: "Nonexistent" } });
    expect(screen.queryByText(/Liam Garcia/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Mia Rodriguez/i)).not.toBeInTheDocument();
  });
});
