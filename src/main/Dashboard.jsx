import React, { useState, useEffect, Fragment } from 'react';

const Dashboard = () => {
    const [userEmail, setUserEmail] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (localStorage.getItem('token') === null) {
            window.location.replace('http://localhost:3000/login');
        } else {
            // fetch('http://127.0.0.1:8000/api/user/', {
            //     method: 'GET',
            //     headers: {
            //         'Content-Type': 'application/json',
            //         Authorization: `Token ${localStorage.getItem('token')}`
            //     }
            // })
            //     .then(res => res.json())
            //     .then(data => {
            //         setUserEmail(data.email);
            //         setLoading(false);
            //     });

            var myHeaders = new Headers();
            myHeaders.append("Authorization", `Token ${localStorage.getItem('token')}`);

            var formdata = new FormData();

            var requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };

            fetch("http://127.0.0.1:8000/api/user/", requestOptions)
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