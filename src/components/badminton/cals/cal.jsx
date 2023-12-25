import React, { useState, useEffect } from 'react';
import Alert from '@mui/material/Alert';
import { AlertTitle } from '@mui/material';
import Button from '@mui/material/Button';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useAuth0 } from "@auth0/auth0-react";
import Stack from '@mui/material/Stack';

const SchedulingComponent = ({ courtNumber, bookedTimes, onBooking }) => {
    const history = useHistory();
    const [showAlert, setShowAlert] = useState(false);
    const { user } = useAuth0() || {};
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState('');
    const [userdata, setuserdata] = useState("")
    const [bookingdata, setBookingData] = useState("")
    const [bookings, setBookings] = useState([]);
    const url1 = "https://fastapi-backend-fl6pmqzvxq-uc.a.run.app"
    const url2 = "http://127.0.0.1:8000"
    const user_email = user.email
    const alreadyBooked = useState([])
    const [bookedTime, setBookedTime] = useState(0)
    const [availableTimes, setAvailableTimes] = useState([]);
    const currentDate = new Date()


    useEffect(() => {
        const currentHour = new Date().getHours();
        const currentMinute = new Date().getMinutes();

        const timeOptions = [
            { value: '08:00 AM', hour: 8 },
            { value: '09:00 AM', hour: 9 },
            { value: '10:00 AM', hour: 10 },
            { value: '11:00 AM', hour: 11 },
            { value: '12:00 PM', hour: 12 },
            { value: '01:00 PM', hour: 13 },
            { value: '02:00 PM', hour: 14 },
            { value: '03:00 PM', hour: 15 },
            { value: '04:00 PM', hour: 16 },
            { value: '05:00 PM', hour: 17 },
            { value: '06:00 PM', hour: 18 },
            { value: '07:00 PM', hour: 19 },
            { value: '08:00 PM', hour: 20 },
            { value: '09:00 PM', hour: 21 },
            { value: '10:00 PM', hour: 22 },
        ];

        getTodaysBookings(
            (selectedDate.getDate() + 1),
            (selectedDate.getMonth() + 1),
            (selectedDate.getFullYear()),
            parseInt(courtNumber)
        );

        let filteredTimes = timeOptions.filter(option => {
            if (selectedDate.getDate() + 1 === new Date().getDate()) {
                // If it's the current date, only include times after the current time
                return option.hour > currentHour || (option.hour === currentHour && option.minute > currentMinute);
            } else {
                // If it's a future date, include all times
                return true;
            }
        });

        //Set the available times
        console.log(bookings)

        //Filters out the times that have already been booked
        const newFilteredTimes = filteredTimes.filter(time =>
            bookings.bookings?.length === 0 ? true : !bookings.bookings?.some(x => x.start === time.hour)
        )
        console.log(newFilteredTimes)
        setAvailableTimes(newFilteredTimes);
    }, [selectedDate, bookings, courtNumber]);

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleTimeSelection = (time) => {
        setSelectedTime(time);
    };




    useEffect(() => {
        const getUser = async () => {
            const response = await fetch(`${url2}/matches/users/${user_email}/`)
            if (response.ok) {
                const data = await response.json()
                setuserdata(data)
            } else {
                console.log(response.json)
            }
        }

        getUser()
    }, [user_email])

    const handleScheduleAppointment = async () => {
        try {
            const response = await fetch(`${url2}/matches/bookings/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    day: selectedDate.getDate() + 1,
                    month: selectedDate.getMonth() + 1,
                    year: selectedDate.getFullYear(),
                    start: parseInt(selectedTime),
                    end: parseInt(selectedTime) + 1,
                    court: courtNumber,
                    user: user_email,
                }),
            });
            if (response.ok) {
                console.log('Appointment scheduled successfully');
                setBookedTime(selectedTime)
                onBooking(courtNumber, `${selectedDate.toISOString().split('T')[0]} ${selectedTime}`);
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
        setShowAlert(true)

    };


    const getTodaysBookings = async (day, month, year, courtNumber) => {
        await fetch(`${url2}/matches/bookings/daily?day=${day}&month=${month}&year=${year}&court=${courtNumber}`).then(response => {
            if (!response.ok) {
                throw new Error('Getting todays booking was NOT okay');
            }
            return response.json();
        }).then(data => setBookings(data))
    };

    return (
        <div className=' animate__animated animate__lightSpeedInLeft'>
            <h1>Schedule an Appointment for Court Number {courtNumber}</h1>
            <div>
                <label>Select Date:</label>
                <input
                    type="date"
                    value={selectedDate.toISOString().split('T')[0]}
                    onChange={(e) => handleDateChange(new Date(e.target.value))}
                />
            </div>

            <div>
                <label>Select Time:</label>
                <select value={selectedTime} onChange={(e) => {
                    console.log(e.target);
                    handleTimeSelection(e.target.value)
                }}>
                    <option value="">Select Time</option>
                    {availableTimes.map((option, index) => (
                        <option key={index} value={option.hour}>
                            {option.value}
                        </option>
                    ))}
                </select>
            </div>
            {showAlert && (
                <div>
                    <Stack sx={{ width: '100%' }} spacing={2}>
                        <Alert
                            action={
                                <Button onClick={() => { setShowAlert(false); history.push("/manage-bookings") }} color="inherit" size="small">
                                    MANAGE BOOKINGS
                                </Button>
                            }
                        >
                            You have successfully booked Court {courtNumber} for {bookedTime >= 12 ? `${bookedTime - 12} PM` : `${bookedTime} AM`}
                        </Alert>
                    </Stack>
                </div>
            )}

            <button onClick={handleScheduleAppointment} disabled={!selectedDate || !selectedTime || bookedTimes.includes(`${selectedDate.toISOString().split('T')[0]} ${selectedTime}`)}>
                Schedule Appointment
            </button>
        </div>
    );
};

export default SchedulingComponent;

