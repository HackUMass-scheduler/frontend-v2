import React from "react";
import { Container, Row, Col } from "reactstrap";
import 'animate.css';
import Highlight from "../components/Highlight";
import Loading from "../components/Loading";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";

export const ProfileComponent = () => {
  const { user } = useAuth0();
  const str = (user.name).toString()
  const userName = str.substring(0, str.indexOf("@"));

  return (
    <Container className="mb-5">
      {/* <Row className="align-items-center profile-header mb-5 text-center text-md-left">
        <Col md={2}>
          <img
            src={user.picture}
            alt="Profile"
            className="rounded-circle img-fluid profile-picture mb-3 mb-md-0"
          />
        </Col>
        <Col md>
          <h2>{user.name}</h2>
          <p className="lead text-muted">{user.email}</p>
        </Col>
      </Row>
      <Row>
        <Highlight>{JSON.stringify(user, null, 2)}</Highlight>
      </Row> */}
      <>
        <div className="profile animate__animated animate__fadeInUp">
          Name: {userName}<br />
          Nickname: {user.nickname}<br />
          Email: {user.email}
        </div>
      </>
    </Container>
  );
};

export default withAuthenticationRequired(ProfileComponent, {
  onRedirecting: () => <Loading />,
});
