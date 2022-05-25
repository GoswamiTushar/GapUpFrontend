import React, { useState, useEffect } from 'react';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (localStorage.getItem('token') !== null) {
            window.location.replace('http://localhost:3000/dashboard');
        } else {
            setLoading(false);
        }
    }, []);

    const onSubmit = e => {
        e.preventDefault();

        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Token a22dfffb9865ebfba2396fb70b8a2176c3c5b7152b69145bde82efcadd1ce01c ");

        var formdata = new FormData();
        formdata.append("username", username);
        formdata.append("password", password);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        fetch("http://127.0.0.1:8000/api/login/?username=froggy550&password=Tushar.1510", requestOptions)
            .then(response => response.json())
            .then(data => {
                if (data.token) {
                    localStorage.clear();
                    localStorage.setItem('token', data.token);
                    window.location.replace('http://localhost:3000/dashboard');
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