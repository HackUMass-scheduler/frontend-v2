import React, { useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";

const SchedulingComponent = ({ courtNumber, bookedTimes, onBooking }) => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState('');
    const [userdata, setuserdata] = useState("")
    const [bookingdata, setBookingData] = useState("")
    const url1 = "https://fastapi-backend-fl6pmqzvxq-uc.a.run.app"
    const url2 = "http://127.0.0.1:8000"
    const { user } = useAuth0();
    const user_email = user.email
    let currentDate = new Date()
    const handleDateChange = (date) => {
        setSelectedDate(date);
        // You may want to implement logic for fetching available time slots for the selected date
    };

    const handleTimeSelection = (time) => {
        setSelectedTime(time);
        // You can add further logic here based on the selected time
    };

    const handleScheduleAppointment = async () => {
        try {
            const response = await fetch(`${url2}/matches/bookings/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    day: selectedDate.getDate(),
                    month: selectedDate.getMonth(),
                    year: selectedDate.getFullYear(),
                    start: parseInt(selectedTime),
                    end: parseInt(selectedTime) + 1,
                    court: courtNumber,
                }),
            });

            if (response.ok) {

                // Request was successful
                console.log('Appointment scheduled successfully');
                console.log(selectedTime)
                // await getBookingID(response)
                await getUser()
                // Notify parent component about the booking
                onBooking(courtNumber, `${selectedDate.toISOString().split('T')[0]} ${selectedTime}`);
                // console.log(bookingdata)
                console.log(userdata)

            } else {
                // Handle errors
                console.error('Error scheduling appointment');
            }
        } catch (error) {
            console.error('Error:', error);
        }

        // Reset state after scheduling
        setSelectedDate(new Date());
        setSelectedTime('');
    };

    const getBookingID = async (p) => {
        const data = await p.json()
        setBookingData(data)
    }

    const getUser = async () => {
        const response = await fetch(`${url2}/matches/users/${user_email}`)
        if (response.ok) {
            const data = await response.json()
            setuserdata(data)
        } else {
            console.log(response.json)
        }
    }

    const handleUpdateUser = async (booking_id) => {

        try {
            const response = await fetch(`${url2}/matches/users/${userdata.id}/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    booking_id: booking_id
                }),
            });

            if (response.ok) {
                // Request was successful
                console.log('User updated successfully');
            } else {
                console.error('Error updating user');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handlePostRequest = async () => {
        try {
            const response = await fetch('https://fastapi-backend-fl6pmqzvxq-uc.a.run.app/matches/users/');
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const finalfunc = async () => {
        await handleScheduleAppointment()
        // await handleUpdateUser()
    }

    return (
        <div>
            <h1>Schedule an Appointment for Court Number {courtNumber}</h1>
            <div>
                <label>Select Date:</label>
                <input
                    type="date"
                    value={selectedDate.toISOString().split('T')[0]}
                    onChange={(e) => handleDateChange(new Date(e.target.value))}
                />
            </div>

            {/* Display available time slots (you may fetch this dynamically) */}
            <div>
                <label>Select Time:</label>
                <select value={selectedTime} onChange={(e) => handleTimeSelection(e.target.value)}>
                    <option value="">Select Time</option>
                    {/* ... (time options) */}
                    <option value="8">08:00 AM</option>
                    <option value="9">09:00 AM</option>
                    <option value="10">10:00 AM</option>
                    <option value="11">11:00 AM</option>
                    <option value="12">12:00 PM</option>
                    <option value="13">01:00 PM</option>
                    <option value="14">02:00 PM</option>
                    <option value="15">03:00 PM</option>
                    <option value="16">04:00 PM</option>
                    <option value="17">05:00 PM</option>
                    <option value="18">06:00 PM</option>
                    <option value="19">07:00 PM</option>
                    <option value="20">08:00 PM</option>
                    <option value="21">09:00 PM</option>
                    <option value="22">10:00 PM</option>
                </select>
            </div>

            <button onClick={finalfunc} disabled={!selectedDate || !selectedTime || bookedTimes.includes(`${selectedDate.toISOString().split('T')[0]} ${selectedTime}`)}>
                Schedule Appointment
            </button>
        </div>
    );
};

export default SchedulingComponent;
