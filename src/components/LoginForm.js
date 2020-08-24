import React from 'react';
import propTypes from 'prop-types';

const LoginForm = ({ handleLogin, username, handleUsernameChange, password, handlePasswordChange, }) => {

    return (
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