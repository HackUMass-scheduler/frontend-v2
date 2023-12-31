import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
// import logo from "../assets/logo.svg";
import 'animate.css';
import umass from '../assets/umass.png';
const id = ""
const Hero = () => {
  const { user, isAuthenticated } = useAuth0();
  return (
    <div className="text-center hero my-5">
      {!isAuthenticated && (
        <div>
          <img className="mb-3 app-logo animate__animated animate__jello animate__delay-1s" src={umass} alt="UMass logo" width="120" />
          <h1 className="mb-4 animate__animated animate__backInDown">UMass Badminton Portal</h1>
        </div>
      )}
      {isAuthenticated && (
        <div>
          <img className="mb-3 app-logo" src={umass} alt="UMass logo" width="120" />
          <h1 className="mb-4">UMass Badminton Portal</h1>
        </div>
      )}
      <div>{isAuthenticated ? addUser(user) : "No"}</div>
      {/* <div>{user.name}</div> */}
      {isAuthenticated && (
        <h1>
          {user.nickname}
        </h1>
      )}
      {!isAuthenticated && (
        <div>
          <p className="lead animate__animated animate__backInUp">
            Welcome to the official portal for badminton court bookings at UMass!
          </p>
        </div>
      )}
      {isAuthenticated && (
        <div>
          <p className="lead animate__animated animate__lightSpeedInLeft">
            Welcome to the official portal for badminton court bookings at UMass!
          </p>
        </div>
      )}

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