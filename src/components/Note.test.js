import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import Note from './Note';

test("renders content", () => {
    const note = {
        content: "Component testing is done with react-tesing-library",
        important: true
    }

    const component = render(
        <Note note={note} />
    );

    //the different ways of investigating the contetns of the components being investigated
    expect(component.container).toHaveTextContent(
        "Component testing is done with react-tesing-library"
    );

    const element = component.getByText(
        "Component testing is done with react-tesing-library"
    );
    expect(element).toBeDefined();

    const div = component.container.querySelector('.note');
    expect(div).toHaveTextContent(
        "Component testing is done with react-tesing-library"
    );
});
