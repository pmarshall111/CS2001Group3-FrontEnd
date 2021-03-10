import React, { Component } from "react";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import "./dashboard.css";

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

  const handleMedication = () => {
    history.push("/medication");
  };

  const handleCareWorker = () => {
    history.push("/careworker");
  };

  const handleDailyTasks = () => {
    history.push("/dailytask");
  };

  const handleAlerts = () => {
    history.push("/alerts");
  };

  return (
    <div className="home_page">
      <h1 className="welcome">Welcome to CareRUs</h1>
      <Container fluid="md">
        <Row md={3}>
          <Col style={{ marginTop: "20px" }}>
            <Card style={{ width: "15rem" }}>
              <Card.Img
                variant="top"
                src="https://rg-group.co.uk/wp-content/uploads/2019/08/CareHome1.jpg"
                style={{ height: 125 }}
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
            <Card style={{ width: "15rem" }}>
              <Card.Img
                variant="top"
                src="https://176g4u2eqkgm30b0371yje33-wpengine.netdna-ssl.com/wp-content/uploads/2018/04/image-11.png"
                style={{ height: 125 }}
              />
              <Card.Body>
                <Card.Text>Click to view information about Alerts</Card.Text>
                <Button variant="primary" onClick={handleAlerts}>
                  View Alerts
                </Button>
              </Card.Body>
            </Card>
          </Col>

          <Col style={{ marginTop: "20px" }}>
            <Card style={{ width: "15rem" }}>
              <Card.Img
                variant="top"
                src="https://cdn.mos.cms.futurecdn.net/MCTaifsDFHvU7pJ9uKmjzY.jpg"
                style={{ height: 125 }}
              />
              <Card.Body>
                <Card.Text>
                  Click to view more information about Emails
                </Card.Text>

                <Button variant="primary" onClick={handleEmail}>
                  View Emails
                </Button>
              </Card.Body>
            </Card>
          </Col>

          <Col style={{ marginTop: "10px" }}>
            <Card style={{ width: "15rem" }}>
              <Card.Img
                variant="top"
                src="https://helpr.org.uk/wp-content/uploads/2018/04/caring-staff.jpg"
                style={{ height: 125 }}
              />
              <Card.Body>
                <Card.Text>
                  Click to view information about CareWorkers
                </Card.Text>
                <Button variant="primary" onClick={handleCareWorker}>
                  View CareWorkers
                </Button>
              </Card.Body>
            </Card>
          </Col>

          <Col style={{ marginTop: "10px" }}>
            <Card style={{ width: "15rem" }}>
              <Card.Img
                variant="top"
                src="https://thumbs.dreamstime.com/b/task-list-icon-logo-illustration-summer-icons-set-outline-holiday-tour-travel-vector-simple-modern-graphic-flat-design-159161578.jpg"
                style={{ height: 125 }}
              />
              <Card.Body>
                <Card.Text>
                  Click to view more information about DailyTasks
                </Card.Text>
                <Button variant="primary" onClick={handleDailyTasks}>
                  View DailyTasks
                </Button>
              </Card.Body>
            </Card>
          </Col>

          <Col style={{ marginTop: "10px" }}>
            <Card style={{ width: "15rem" }}>
              <Card.Img
                variant="top"
                src="https://mmo.aiircdn.com/326/5e8b2443bb37b.jpg"
                style={{ height: 125 }}
              />
              <Card.Body>
                <Card.Text>
                  Click to view information about Pharmacies
                </Card.Text>
                <Button variant="primary" onClick={handlePharmacy}>
                  View Pharmacies
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Dashboard;
