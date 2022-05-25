import React, { useState, useEffect, Fragment } from 'react';

const Dashboard = () => {
    const [userEmail, setUserEmail] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (localStorage.getItem('token') === null) {
            window.location.replace('http://localhost:3000/login');
        } else {
            var myHeaders = new Headers();
            myHeaders.append("Authorization", `Token ${localStorage.getItem('token')}`);

            var requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };

            fetch("http://froggy550.pythonanywhere.com/api/user/", requestOptions)
                .then(response => response.json())
                .then(data => {
                    if (data.status === 200) {
                        setUserEmail(data.user_info.email);
                        setLoading(false);
                    }
                })
                .catch(error => console.log('error', error));
        }
    }, []);

    return (
        <div>
            {loading === false && (
                <Fragment>
                    <h1>Dashboard</h1>
                    <h2>Hello {userEmail}!</h2>
                </Fragment>
            )}
        </div>
    );
};

export default Dashboard;