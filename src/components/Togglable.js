import React, { useState, useImperativeHandle } from 'react';
import propTypes from 'prop-types';
import './Togglable.css'

const Togglable = React.forwardRef((props, ref) => {

    const [visible, setVisible] = useState(false);

    const hideWhenVisible = { display: visible ? "none" : "" };
    const showWhenVisible = { display: visible ? "" : "none" };

    const toggleVisibility = () => {
        setVisible(!visible);
    }

    useImperativeHandle(ref, () => {
        return {
            toggleVisibility
        }
    });

    return (
        <div className='togglable-container' >
            <div style={hideWhenVisible}>
                <button onClick={toggleVisibility} id='togglable-show-button' > {props.buttonLabel} </button>
            </div>
            <div style={showWhenVisible} className='togglableComponent'>
                {props.children}
                <button onClick={toggleVisibility} id='togglable-cancel-button' > cancel </button>
            </div>
        </div>
    );
})

Togglable.displayName = "Togglable";

Togglable.propTypes = {
    buttonLabel: propTypes.string.isRequired
}

export default Togglable;