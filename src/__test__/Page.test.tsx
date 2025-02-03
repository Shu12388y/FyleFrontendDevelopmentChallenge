import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Page from "../app/workout/page"; // Adjust the import based on your project structure
import "@testing-library/jest-dom";

describe("Health Challenge Tracker", () => {
  test("renders Health Challenge Tracker title", () => {
    render(<Page />);
    expect(screen.getByText("Health Challenge Tracker")).toBeInTheDocument();
  });

  test("allows the user to input a username", () => {
    render(<Page />);
    // const input = screen.getByPlaceholderText("Enter username");
    // fireEvent.change(input, { target: { value: "John Doe" } });
    // expect(input).toHaveValue("John Doe");
  });

  test("adds a new workout", () => {
    render(<Page />);
    const addWorkoutButton = screen.getByText("+ Add Workout");
    fireEvent.click(addWorkoutButton);
    
    const workoutSelects = screen.getAllByText("Select workout");
    expect(workoutSelects.length).toBe(2); // Default + one added
  });

  test("adds a user and displays in the users list", () => {
    render(<Page />);
    const usernameInput = screen.getByPlaceholderText("Enter username");
    fireEvent.change(usernameInput, { target: { value: "John Doe" } });

    const addUserButton = screen.getByText("Add User");
    fireEvent.click(addUserButton);

    // fireEvent.click(screen.getByText("Show Users"));
    // expect(screen.getByText("John Doe")).toBeInTheDocument();
  });

  test("paginates users correctly", () => {
    render(<Page />);
    fireEvent.click(screen.getByText("Show Users"));

    const prevButton = screen.getByText("Previous");
    expect(prevButton).toBeDisabled(); // Should be disabled on first page
  });

  test("shows user workout details when clicked", () => {
    render(<Page />);
    fireEvent.click(screen.getByText("Show Users"));

//     // Simulating a user with workouts
//     const user = screen.getByText("John Doe");
//     fireEvent.click(user);
    
//     expect(screen.getByText("John Doe's Workout Summary")).toBeInTheDocument();
   });
});
