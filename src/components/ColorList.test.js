import React from 'react';
import MutationObserver from 'mutationobserver-shim';

import { render, screen} from "@testing-library/react";
import ColorList from './ColorList';

const testColors = [
    {
        color: "blue",
        code: { hex: "#7fffd4" },
        id: 1
    },
    {
      color: "limegreen",
      code: { hex: "#99ddbc" },
      id: 2,
    }
]

test("Renders an empty list of colors without errors", () => {
    render(<ColorList colors={[]}/>)
});

test("Renders a list of colors without errors", () => {
    render(<ColorList colors={testColors} />)
});

test("Renders the EditForm when editing = true and does not render EditForm when editing = false", () => {
    const { rerender } = render(<ColorList colors={testColors} editing={true}/>)
    let editForm = screen.queryByTestId(/edit_menu/i)
    expect(editForm).toBeInTheDocument()
    rerender(<ColorList colors={testColors} editing={false}/>)
    editForm = screen.queryByTestId(/edit_menu/i)
    expect(editForm).not.toBeInTheDocument()
});
