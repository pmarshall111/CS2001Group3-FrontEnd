import React, { Component } from "react";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router";
import EmailPage from "../email/EmailPage";
import { useHistory } from "react-router-dom";
import {Envelope, EnvelopeOpen, ExclamationSquare} from "react-bootstrap-icons";

const Dashboard = () => {
  const history = useHistory();

  const handleResident = () => {
    history.push("/resident");
  };

  const handleEmail = () => {
    history.push("/email");
  };

  const handlePharmacy = () => {
    history.push("/pharmacy");
  };

  const handleAlerts = () => {
    history.push("/alerts");
  };

  const handleCareWorker = () => {
    history.push("/careWorker");
  }

  return (
    <div>
      <Container fluid="md">
        <Row md={3}>
          <Col style={{ marginTop: "20px" }}>
            <Card style={{ width: "18rem" }}>
              <Card.Img
                variant="top"
                src="https://rg-group.co.uk/wp-content/uploads/2019/08/CareHome1.jpg"
                style={{ height: 200 }}
              />
              <Card.Body>
                <Card.Text>
                  Click to view more information about Residents
                </Card.Text>
                <Button variant="primary" onClick={handleResident}>
                  View Residents
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col style={{ marginTop: "20px" }}>
            <Card style={{ width: "18rem" }}>
              <Card.Img
                variant="top"
                src="https://helpr.org.uk/wp-content/uploads/2018/04/caring-staff.jpg"
                style={{ height: 200 }}
              />
              <Card.Body>
                <Card.Text>
                  Click to view more information about CareWorkers
                </Card.Text>
                <Button variant="primary" onClick={handleCareWorker}>View CareWorkers</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col style={{ marginTop: "20px" }}>
            <Card style={{ width: "18rem" }}>
              <Card.Img
                variant="top"
                src="https://mmo.aiircdn.com/326/5e8b2443bb37b.jpg"
                style={{ height: 200 }}
              />
              <Card.Body>
                <Card.Text>
                  Click to view Pharmacies you send emails to
                </Card.Text>
                <Button variant="primary" onClick={handlePharmacy}>
                  View Pharmacies
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col style={{ marginTop: "20px" }}>
            <Card style={{ width: "18rem" }}>
              <div
                  style={{ height: 200, display: "grid", placeItems: "center" }}
              ><Envelope style={{height: "150px", width: "150px"}} /> </div>
              <Card.Body>
                <Card.Text>
                  Click to view Email status' with Pharmacies
                </Card.Text>

                <Button variant="primary" onClick={handleEmail}>
                  View Emails
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col style={{ marginTop: "20px" }}>
            <Card style={{ width: "18rem" }}>
              <div
                  style={{ height: 200, display: "grid", placeItems: "center" }}
              ><ExclamationSquare style={{height: "150px", width: "150px"}} /> </div>
              <Card.Body>
                <Card.Text>
                  Click to view alerts for medication that's running out
                </Card.Text>
                <Button variant="primary" onClick={handleAlerts}>View Alerts</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col style={{ marginTop: "20px" }}>
            <Card style={{ width: "18rem", padding: "0px 0" }}>
              <Card.Body>
                <div style={{display: "grid", placeItems: "center", paddingTop: "0px"}}>
                  <h4 style={{paddingBottom: "10px", fontWeight: "bold"}}>Created By:</h4>
                  <p>Peter Marshall</p>
                  <p>Zahid Ali</p>
                  <p>Stavros Koumpounis</p>
                  <p>Syntyche Mumbaya</p>
                  <p>Muhammad Abdullah Ali</p>
                  <p>Astan Campbell</p>
                  <p>Jonathan Wong</p>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Dashboard;
