// @ts-ignore
import React from 'react';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';

import SearchableList from '../SearchableList';
import { sampleData } from '../sampleData';

describe('SearchableList Component', () => {
  // Helper function to render the SearchableList component with sample data
  const setup = () => {
    render(
      <SearchableList data={sampleData} onSearch={() => {}} listHeight={400} />,
    );
  };

  // Test to check if the SearchableList component renders correctly
  test('renders the SearchableList component', () => {
    setup();
    expect(screen.getByPlaceholderText(/search/i)).toBeInTheDocument(); // Check if the search input is present
    expect(screen.getByText(/Attended/i)).toBeInTheDocument(); // Check if the "Attended" section is present
  });

  // Test to verify that items are displayed in the list
  test('displays items in the list', () => {
    setup();
    expect(screen.getByText(/Liam Garcia/i)).toBeInTheDocument(); // Check if "Liam Garcia" is displayed
    expect(screen.getByText(/Mia Rodriguez/i)).toBeInTheDocument(); // Check if "Mia Rodriguez" is displayed
  });

  // Test to check the search functionality
  test('searches for items', () => {
    setup();
    const searchInput = screen.getByPlaceholderText(/search/i); // Get the search input
    fireEvent.change(searchInput, { target: { value: 'Liam' } }); // Simulate typing "Liam" into the search input
    expect(screen.getByText(/Liam Garcia/i)).toBeInTheDocument(); // Check if "Liam Garcia" is still displayed
    expect(screen.queryByText(/Mia Rodriguez/i)).not.toBeInTheDocument(); // Check if "Mia Rodriguez" is not displayed
  });

  // Test to verify that sections can be expanded and collapsed
  test('expands and collapses sections', async () => {
    setup();

    let attendedSection = screen.getByRole('button', { name: /attended/i }); // Get the "Attended" section header

    fireEvent.click(attendedSection); // Collapse the section
    expect(screen.queryByText(/Liam Garcia/i)).not.toBeInTheDocument(); // Check if "Liam Garcia" is not displayed

    attendedSection = screen.getByRole('button', { name: /attended/i }); // Get the section header again

    fireEvent.click(attendedSection); // Expand the section
    const listItem = await screen.findByText(/Liam Garcia/i); // Check if "Liam Garcia" is displayed again
    expect(listItem).toBeInTheDocument();
  });

  // Test to check search functionality while one section is collapsed
  test('Search while one section is collapsed', async () => {
    setup();

    let attendedSection = screen.getByRole('button', { name: /attended/i }); // Get the "Attended" section header

    fireEvent.click(attendedSection); // Collapse the section
    expect(screen.queryByText(/Liam Garcia/i)).not.toBeInTheDocument(); // Check if "Liam Garcia" is not displayed

    const searchInput = screen.getByPlaceholderText(/search/i); // Get the search input
    fireEvent.change(searchInput, { target: { value: 'Liam' } }); // Simulate typing "Liam" into the search input
    expect(screen.queryByText(/Liam Garcia/i)).not.toBeInTheDocument(); // Check if "Liam Garcia" is not displayed

    attendedSection = screen.getByRole('button', { name: /attended/i }); // Get the section header again

    fireEvent.click(attendedSection); // Expand the section
    expect(screen.queryByText(/Liam Garcia/i)).toBeInTheDocument(); // Check if "Liam Garcia" is displayed
  });

  // Test to verify that search results are handled correctly
  test('handles search results', () => {
    setup();
    const searchInput = screen.getByPlaceholderText(/search/i); // Get the search input
    fireEvent.change(searchInput, { target: { value: 'Liam' } }); // Simulate typing "Liam" into the search input
    expect(screen.queryByText(/Liam Garcia/i)).toBeInTheDocument(); // Check if "Liam Garcia" is displayed
  });

  // Test to verify that no search results are handled correctly
  test('handles no search results', () => {
    setup();
    const searchInput = screen.getByPlaceholderText(/search/i); // Get the search input
    fireEvent.change(searchInput, { target: { value: 'Nonexistent' } }); // Simulate typing a non-existent name
    expect(screen.queryByText(/Liam Garcia/i)).not.toBeInTheDocument(); // Check if "Liam Garcia" is not displayed
    expect(screen.queryByText(/Mia Rodriguez/i)).not.toBeInTheDocument(); // Check if "Mia Rodriguez" is not displayed
  });
});
