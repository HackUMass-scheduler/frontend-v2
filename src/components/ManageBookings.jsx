import React, { useState, useEffect } from 'react'
import { useAuth0 } from "@auth0/auth0-react";


const ManageBookings = () => {
    const { user } = useAuth0() || {};
    const url2 = "http://127.0.0.1:8000"
    const user_email = user.email
    const [bookings, setBookings] = useState([]);
    useEffect(() => {
        fetch(`${url2}/matches/bookings/`, {
            method: 'GET'
        }).then(response => {
            if (!response.ok) {
                throw new Error('Getting todays booking was NOT okay');
            }
            return response.json();
        }).then(data => setBookings(data))
        console.log(bookings)
    })

    return (
        <div>
            <h1>Your Data</h1>
            <ul>
                {bookings.bookings?.map(item => (
                    <li>{item.start}</li>
                ))}
            </ul>
        </div>
    );
}

export default ManageBookings