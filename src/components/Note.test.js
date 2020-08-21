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

    component.debug();

    /*
    //the different ways of investigating the contetns of the components being investigated
    //method 1
    expect(component.container).toHaveTextContent(
        "Component testing is done with react-tesing-library"
    );

    //method 2
    const element = component.getByText(
        "Component testing is done with react-tesing-library"
    );
    expect(element).toBeDefined();

    //method 3
    const div = component.container.querySelector('.note');
    expect(div).toHaveTextContent(
        "Component testing is done with react-tesing-library"
    );
    */
});
