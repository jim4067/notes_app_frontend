import React from 'react';

const LoginForm = ({handleLogin, username, handleUsernameChange, password, handlePasswordChange,}) => {

    return (
        <form onSubmit={handleLogin} >
            <div>
                username <input
                    name='username'
                    onChange={handleUsernameChange}
                    type='name'
                    value={username} />
            </div>
            <div>
                password <input
                    name='password'
                    onChange={handlePasswordChange}
                    type='password'
                    value={password} />
            </div>
            <button type='submit'>login</button>
        </form>

    );
}
