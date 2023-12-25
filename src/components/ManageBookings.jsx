import React, { useState, useEffect } from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const BookingCard = ({ day, month, year, time, court }) => {
    const bull = (
        <Box
            component="span"
            sx={{ display: 'inline-block', mx: '3px', transform: 'scale(0.8)' }}
        >
            •
        </Box>
    );
    return (
        <Box sx={{ maxWidth: 275 }}>
            <Card variant="outlined">
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        Word of the Day
                    </Typography>
                    <Typography variant="h5" component="div">
                        be{bull}nev{bull}o{bull}lent
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        adjective
                    </Typography>
                    <Typography variant="body">
                        well meaning and kindly.
                        <br />
                        {'"a benevolent smile"'}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">Learn More</Button>
                </CardActions>
            </Card>
        </Box >
    );
}


const ManageBookings = () => {
    const { user } = useAuth0() || {};
    const url2 = "http://127.0.0.1:8000"
    const user_email = user.email
    const [bookings, setBookings] = useState([]);
    useEffect(() => {
        fetch(`${url2}/matches/bookings/users?user=${user_email}`, {
            method: 'GET'
        }).then(response => {
            if (!response.ok) {
                throw new Error('Getting todays booking was NOT okay');
            }
            return response.json();
        }).then(data => setBookings(data))
    })
    console.log(bookings)
    return (
        <div>
            {bookings.bookings?.map(obj => (<BookingCard day={obj.day} month={obj.month} year={obj.year} time={obj.start} court={obj.court} />))}
        </div>
    )

}

export default ManageBookings