import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'


const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('token') !== null) {
            navigate('/dashboard')
        } else {
            setLoading(false);
        }
    }, []);

    const onSubmit = e => {
        e.preventDefault();

        var formdata = new FormData();
        formdata.append("username", username);
        formdata.append("password", password);
        formdata.append("email", email);
        formdata.append("first_name", firstName);
        formdata.append("last_name", lastName);

        var requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow'
        };

        fetch("//froggy550.pythonanywhere.com/api/register/", requestOptions)
            .then(response => response.json())
            .then(data => {
                if (data.token) {
                    localStorage.clear();
                    localStorage.setItem('token', data.token);
                    navigate('/dashboard')
                } else {
                    setEmail('');
                    setPassword('');
                    setUsername('');
                    setLastName('');
                    setFirstName('');
                    localStorage.clear();
                    setErrors(true);
                }
            })
            .catch(error => console.log('error', error));
    };

    return (
        <div>
            {loading === false && <h1>Signup</h1>}
            {errors === true && <h2>Cannot signup with provided credentials</h2>}
            <form onSubmit={onSubmit}>
                <label htmlFor='username'>Username:</label> <br />
                <input
                    name='username'
                    type='username'
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    required
                />{' '}
                <br />
                <label htmlFor='email'>Email:</label> <br />
                <input
                    name='email'
                    type='email'
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                />{' '}
                <br />
                <label htmlFor='first_name'>First Name:</label> <br />
                <input
                    name='first_name'
                    type='text'
                    value={firstName}
                    onChange={e => setFirstName(e.target.value)}
                    required
                />{' '}
                <br />
                <label htmlFor='last_name'>Last Name:</label> <br />
                <input
                    name='last_name'
                    type='text'
                    value={lastName}
                    onChange={e => setLastName(e.target.value)}
                    required
                />{' '}
                <br />
                <label htmlFor='password'>Password:</label> <br />
                <input
                    name='password'
                    type='password'
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                />{' '}
                <br />
                <input type='submit' value='Signup' />
            </form>
        </div>
    );
};

export default Signup;