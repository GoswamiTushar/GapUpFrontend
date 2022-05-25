import React, { useState, useEffect, Fragment } from 'react';
import { useNavigate } from 'react-router-dom'


const Logout = ({ isAuth, setIsAuth }) => {
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();


    useEffect(() => {
        if (localStorage.getItem('token') == null) {
            setIsAuth(false)
            navigate("/login")
        } else {
            setLoading(false);
        }
    }, []);

    const handleLogout = e => {
        e.preventDefault();

        fetch('//froggy550.pythonanywhere.com/api/logout/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${localStorage.getItem('token')}`
            }
        })
            .then(data => {
                console.log(data);
                localStorage.clear();
                setIsAuth(false)
                navigate("/login")
            })
    };

    return (
        <div>
            {loading === false && (
                <Fragment>
                    <h1>Are you sure you want to logout?</h1>
                    <input type='button' value='Logout' onClick={handleLogout} />
                </Fragment>
            )}
        </div>
    );
};

export default Logout;