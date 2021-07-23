import React from 'react';
import MutationObserver from 'mutationobserver-shim';

import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Color from './Color';


const testColor = {
    color: "blue",
    code: { hex: "#7fffd4" },
    id: 1
}

const blankColor = {
    color: "",
    code: {hex: ""},
    id: null,
  }

test("Renders without errors with blank color passed into component", () => {
    render(<Color color={blankColor}/>)
});
  
test("Renders the color passed into component", () => {
    render(<Color color={testColor}/>)
    const color = screen.getByText(testColor.color)
    expect(color).toBeInTheDocument()
    expect(color).toHaveTextContent(/blue/i)
});

test("Executes handleDelete and toggleEdit property when the 'x' icon is clicked", () => {
    const mockDelete = jest.fn();
	const mockToggleEdit = jest.fn();

	render(<Color color={testColor} deleteColor={mockDelete} toggleEdit={mockToggleEdit} />);

	const deleteBtn = screen.getByTestId(/delete/i);
	userEvent.click(deleteBtn);

	expect(mockToggleEdit).toHaveBeenCalled();
	expect(mockDelete).toHaveBeenCalled();
});

test("Executes setEditColor and toggleEdit property when color div is clicked", () => {
    const mockSetEditColor =  jest.fn()
    const mockToggleEdit = jest.fn()
    render(<Color color={testColor} setEditColor={mockSetEditColor} toggleEdit={mockToggleEdit}/>)
    const colorDiv = screen.getByTestId(/color/i)
    userEvent.click(colorDiv)
    const editMenu = screen.findByTestId(/edit_menu/i)
    expect(editMenu).toBeTruthy()
    expect(mockToggleEdit).toHaveBeenCalled()
    expect(mockSetEditColor).toHaveBeenCalled()
});