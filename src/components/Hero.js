import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

// import logo from "../assets/logo.svg";
import umass from '../assets/umass.png';
const id = ""
const Hero = () => {
  const { user, isAuthenticated } = useAuth0();
  return (
    <div className="text-center hero my-5">
      <img className="mb-3 app-logo" src={umass} alt="UMass logo" width="120" />
      <h1 className="mb-4">UMass Badminton Portal</h1>

      <div>{isAuthenticated ? addUser(user) : "No"}</div>
      <div></div>
      {/* <div>{user.name}</div> */}
      {isAuthenticated && (
        <h1>
          {user.nickname}
        </h1>
      )}
      <p className="lead">
        Welcome to the official portal for badminton court bookings at UMass!
      </p>
    </div>
  )
}
export default Hero;

const addUser = (user) => {
  try {
    const response = fetch('https://fastapi-backend-fl6pmqzvxq-uc.a.run.app/matches/users/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: user.name,
        email: user.email,
      }),
    });

    if (response.ok) {
      // Request was successful
      console.log('Human created successfully');
      console.log(response.json.name)
    } else {
      // Handle errors
      console.error('Error scheduling appointment');
    }
  } catch (error) {
    console.error('Error:', error);
  }
}