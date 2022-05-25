import React, { useState, useEffect } from 'react';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
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

        // fetch('http://127.0.0.1:8000/api/register/', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(user)
        // })
        //     .then(res => res.json())
        //     .then(data => {
        //         if (data.key) {
        //             localStorage.clear();
        //             localStorage.setItem('token', data.key);
        //             window.location.replace('http://localhost:3000/dashboard');
        //         } else {
        //             setEmail('');
        //             setPassword1('');
        //             setPassword2('');
        //             localStorage.clear();
        //             setErrors(true);
        //         }
        //     });

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
                    window.location.replace('https://frontend--gap-up.netlify.app/dashboard');
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