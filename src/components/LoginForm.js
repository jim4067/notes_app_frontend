import React from 'react';
import propTypes from 'prop-types';
import './LoginForm.css';

const LoginForm = ({ handleLogin, username, handleUsernameChange, password, handlePasswordChange, }) => {

    return (
        <div className='login-form-container'>
        <form onSubmit={handleLogin} >
            <div>
                username <input
                    id='username'
                    name='username'
                    onChange={handleUsernameChange}
                    type='name'
                    value={username} />
            </div>
            <div>
                password <input
                    id='password'
                    name='password'
                    onChange={handlePasswordChange}
                    type='password'
                    value={password} />
            </div>
            <button id='login-button' type='submit'>login</button>
        </form>
        </div>
    );
}

LoginForm.propTypes = {
    handleLogin: propTypes.func.isRequired,
    username: propTypes.string.isRequired,
    handleUsernameChange: propTypes.func.isRequired,
    password: propTypes.string.isRequired,
    handlePasswordChange: propTypes.func.isRequired
}

export default LoginForm;