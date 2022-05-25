import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'


const Login = ({ isAuth, setIsAuth }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem('token') !== null) {
            isAuth = true
            navigate("/dashboard")
        } else {
            setLoading(false);
        }
    }, []);

    const onSubmit = e => {
        e.preventDefault();

        var formdata = new FormData();
        formdata.append("username", username);
        formdata.append("password", password);

        var requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow'
        };

        fetch("http://froggy550.pythonanywhere.com/api/login/", requestOptions)
            .then(response => response.json())
            .then(data => {
                if (data.token) {
                    localStorage.clear();
                    localStorage.setItem('token', data.token);
                    setIsAuth(true);
                    navigate("/dashboard")
                } else {
                    setUsername('');
                    setPassword('');
                    localStorage.clear();
                    setErrors(true);
                }
            }
            )
            .catch(error => console.log('error', error));
    };

    return (
        <div>
            {loading === false && <h1>Login</h1>}
            {errors === true && <h2>Cannot log in with provided credentials</h2>}
            {loading === false && (
                <form onSubmit={onSubmit}>
                    <label htmlFor='username'>Username:</label> <br />
                    <input
                        name='username'
                        type='username'
                        value={username}
                        required
                        onChange={e => setUsername(e.target.value)}
                    />{' '}
                    <br />
                    <label htmlFor='password'>Password:</label> <br />
                    <input
                        name='password'
                        type='password'
                        value={password}
                        required
                        onChange={e => setPassword(e.target.value)}
                    />{' '}
                    <br />
                    <input type='submit' value='Login' />
                </form>
            )}
        </div>
    );
};

export default Login;