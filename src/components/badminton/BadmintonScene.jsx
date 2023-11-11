import React, { useState } from 'react'
import 'react-calendar/dist/Calendar.css';
import './index.css'
import bad from '../badminton/badminton.jpg'
// import Calendly from './calendly.jsx';
import SchedulingComponent from './cals/cal';

const BadmintonScene = () => {
    const [showCalendar1, setShowCalendar1] = useState(false);
    const [showCalendar2, setShowCalendar2] = useState(false);
    const [showCalendar3, setShowCalendar3] = useState(false);

    const [bookedTimes1, setBookedTimes1] = useState([]);
    const [bookedTimes2, setBookedTimes2] = useState([]);
    const [bookedTimes3, setBookedTimes3] = useState([]);

    const handleClick = (calendarNumber) => {
        setShowCalendar1(false);
        setShowCalendar2(false);
        setShowCalendar3(false);

        if (calendarNumber === 1) {
            setShowCalendar1(true);
        } else if (calendarNumber === 2) {
            setShowCalendar2(true);
        } else if (calendarNumber === 3) {
            setShowCalendar3(true);
        }
    };
    const handleBooking = (courtNumber, bookedTime) => {
        // Update the booked times for the specific court
        if (courtNumber === 1) {
            setBookedTimes1([...bookedTimes1, bookedTime]);
        } else if (courtNumber === 2) {
            setBookedTimes2([...bookedTimes2, bookedTime]);
        } else if (courtNumber === 3) {
            setBookedTimes3([...bookedTimes3, bookedTime]);
        }
    };

    return (
        <div>
            <h1>Badminton Courts</h1>
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            </div>
            <div className="court" style={{ display: 'flex', justifyContent: 'space-around', marginTop: '20px' }}>
                <div className="courts" onClick={() => handleClick(1)}>
                    <img
                        src={bad}
                        alt="Badminton Court"
                        width="150px"
                        height="250px"
                    />
                    <div>Court 1</div>
                </div>

                <div className="courts" onClick={() => handleClick(2)}>
                    <img
                        src={bad}
                        alt="Badminton Court"
                        width="150px"
                        height="250px"
                    />
                    <div>Court 2</div>
                </div>

                <div className="courts" onClick={() => handleClick(3)}>
                    <img
                        src={bad}
                        alt="Badminton Court"
                        width="150px"
                        height="250px"
                    />
                    <div>Court 3</div>
                </div>

                {/* {showCalendar && (
                    <div>
                        <Calendar />
                    </div>
                )} */}
                {showCalendar1 && <SchedulingComponent courtNumber={1} onBooking={handleBooking} bookedTimes={bookedTimes1} />}
                {showCalendar2 && <SchedulingComponent courtNumber={2} onBooking={handleBooking} bookedTimes={bookedTimes2} />}
                {showCalendar3 && <SchedulingComponent courtNumber={3} onBooking={handleBooking} bookedTimes={bookedTimes3} />}
            </div>
        </div>
    )
}

export default BadmintonScene