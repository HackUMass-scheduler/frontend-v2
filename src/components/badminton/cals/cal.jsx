// import React, { useState } from 'react';

// const SchedulingComponent = () => {
//     const [selectedDate, setSelectedDate] = useState(new Date());
//     const [selectedTime, setSelectedTime] = useState('');

//     const handleDateChange = (date) => {
//         setSelectedDate(date);
//         // You may want to implement logic for fetching available time slots for the selected date
//     };

//     const handleTimeSelection = (time) => {
//         setSelectedTime(time);
//         // You can add further logic here based on the selected time
//     };

//     const handleScheduleAppointment = () => {
//         // Implement logic for scheduling the appointment, e.g., send data to a server
//         console.log('Appointment scheduled:', {
//             date: selectedDate.toDateString(),
//             time: selectedTime,
//         });

//         // Reset state after scheduling
//         setSelectedDate(new Date());
//         setSelectedTime('');
//     };

//     const handlePostRequest = () => {
//         fetch('https://fastapi-backend-fl6pmqzvxq-uc.a.run.app/matches/users')
//             .then(response => response.json())
//             .then(data => console.log(data));

//     }
//     return (
//         <div>
//             <h1>Schedule an Appointment</h1>

//             <div>
//                 <label>Select Date:</label>
//                 <input
//                     type="date"
//                     value={selectedDate.toISOString().split('T')[0]}
//                     onChange={(e) => handleDateChange(new Date(e.target.value))}
//                 />
//             </div>

//             {/* Display available time slots (you may fetch this dynamically) */}
//             <div>
//                 <label>Select Time:</label>
//                 <select value={selectedTime} onChange={(e) => handleTimeSelection(e.target.value)}>
//                     <option value="">Select Time</option>
// <option value="08:00 AM">08:00 AM</option>
// <option value="09:00 AM">09:00 AM</option>
// <option value="10:00 AM">10:00 AM</option>
// <option value="11:00 AM">11:00 AM</option>
// <option value="12:00 PM">12:00 PM</option>
// <option value="01:00 PM">01:00 PM</option>
// <option value="02:00 PM">02:00 PM</option>
// <option value="03:00 PM">03:00 PM</option>
// <option value="04:00 PM">04:00 PM</option>
// <option value="05:00 PM">05:00 PM</option>
// <option value="06:00 PM">06:00 PM</option>
// <option value="07:00 PM">07:00 PM</option>
// <option value="08:00 PM">08:00 PM</option>
// <option value="09:00 PM">09:00 PM</option>
// <option value="10:00 PM">10:00 PM</option>
//                 </select>
//             </div>

//             <button onClick={handleScheduleAppointment} disabled={!selectedDate || !selectedTime}>
//                 Schedule Appointment
//             </button>
//             <button onClick={handlePostRequest}>
//                 Fetch
//             </button>
//         </div>
//     );
// };

// export default SchedulingComponent;


import React, { useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";

let currentDate = new Date()
const SchedulingComponent = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState('');
    const { user } = useAuth0();

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
            const response = await fetch('https://fastapi-backend-fl6pmqzvxq-uc.a.run.app/matches/users/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({

                    "booked": false,
                    "email": user.email,
                    "name": user.name

                }),
            });

            if (response.ok) {
                // Request was successful
                console.log('Appointment scheduled successfully');
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

    const handlePostRequest = async () => {
        try {
            const response = await fetch('https://fastapi-backend-fl6pmqzvxq-uc.a.run.app/matches/users');
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleBooking = async () => {
        try {
            const response = await fetch('https://fastapi-backend-fl6pmqzvxq-uc.a.run.app/matches/bookings/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "court": 1,
                    "end": 8,
                    "start": 7,
                    "day": currentDate.getDay(),
                    "month": currentDate.getMonth(),
                    "year": currentDate.getFullYear(),
                }),
            });

            if (response.ok) {
                // Request was successful
                console.log('Appointment scheduled successfully');
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



    return (
        <div>
            <h1>Schedule an Appointment</h1>
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
                    <option value="08:00 AM">08:00 AM</option>
                    <option value="09:00 AM">09:00 AM</option>
                    <option value="10:00 AM">10:00 AM</option>
                    <option value="11:00 AM">11:00 AM</option>
                    <option value="12:00 PM">12:00 PM</option>
                    <option value="01:00 PM">01:00 PM</option>
                    <option value="02:00 PM">02:00 PM</option>
                    <option value="03:00 PM">03:00 PM</option>
                    <option value="04:00 PM">04:00 PM</option>
                    <option value="05:00 PM">05:00 PM</option>
                    <option value="06:00 PM">06:00 PM</option>
                    <option value="07:00 PM">07:00 PM</option>
                    <option value="08:00 PM">08:00 PM</option>
                    <option value="09:00 PM">09:00 PM</option>
                    <option value="10:00 PM">10:00 PM</option>
                </select>
            </div>

            <button onClick={handleScheduleAppointment} disabled={!selectedDate || !selectedTime}>
                Schedule Appointment
            </button>
            <button onClick={handlePostRequest}>Fetch</button>
        </div>
    );
};

export default SchedulingComponent;
