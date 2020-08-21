import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import Render from '@testing-library/react';
import Note from './Note';

test("renders content", () => {
    const note = {
        content : "Component testing is done with react-tesing-library",
        important : true
    }
});