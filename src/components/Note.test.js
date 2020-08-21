import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { prettyDOM } from '@testing-library/dom';
import Note from './Note';

test("renders content", () => {
    const note = {
        content: "Component testing is done with react-tesing-library",
        important: true
    }

    const component = render(
        <Note note={note} />
    );

    const li = component.container.querySelector('li');

    console.log(prettyDOM(li));

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
