import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./App.css";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
class WelcomeComponent extends Component {
  render() {
    return (
      <>
        <div className="welcome-text">
          <div className="container">
            <Container fluid="md">
              <h1>Welcome to CareRUs</h1>
              <Row md={3}>
                <Col>
                  <Card style={{ width: "18rem" }}>
                    <Card.Img
                      variant="top"
                      src="https://rg-group.co.uk/wp-content/uploads/2019/08/CareHome1.jpg"
                      style={{ height: 150 }}
                    />
                    <Card.Body>
                      <Card.Text>
                        Click to view more information about Residents
                      </Card.Text>
                      <Button variant="primary">View Residents</Button>
                    </Card.Body>
                  </Card>
                </Col>

                <Col>
                  <Card style={{ width: "18rem" }}>
                    <Card.Img
                      variant="top"
                      src="https://www.practicalpainmanagement.com/sites/default/files/imagecache/lightbox-large/images/2016/07/18/14253266_M.jpg"
                      style={{ height: 150 }}
                    />
                    <Card.Body>
                      <Card.Text>
                        Click to view more information about Medications
                      </Card.Text>
                      <Button variant="primary">View Medications</Button>
                    </Card.Body>
                  </Card>
                </Col>
                <Col>
                  <Card style={{ width: "18rem" }}>
                    <Card.Img
                      variant="top"
                      src="https://cdn.mos.cms.futurecdn.net/MCTaifsDFHvU7pJ9uKmjzY.jpg"
                      style={{ height: 150 }}
                    />
                    <Card.Body>
                      <Card.Text>
                        Click to view more information about Emails
                      </Card.Text>
                      <Button variant="primary">View Emails</Button>
                    </Card.Body>
                  </Card>
                </Col>
                <Col style={{ marginTop: "20px" }}>
                  <Card style={{ width: "18rem" }}>
                    <Card.Img
                      variant="top"
                      src="https://helpr.org.uk/wp-content/uploads/2018/04/caring-staff.jpg"
                      style={{ height: 150 }}
                    />
                    <Card.Body>
                      <Card.Text>
                        Click to view more information about CareWorkers
                      </Card.Text>
                      <Button variant="primary">View CareWorkers</Button>
                    </Card.Body>
                  </Card>
                </Col>
                <Col style={{ marginTop: "20px" }}>
                  <Card style={{ width: "18rem" }}>
                    <Card.Img
                      variant="top"
                      src="https://thumbs.dreamstime.com/b/task-list-icon-logo-illustration-summer-icons-set-outline-holiday-tour-travel-vector-simple-modern-graphic-flat-design-159161578.jpg"
                      style={{ height: 150 }}
                    />
                    <Card.Body>
                      <Card.Text>
                        Click to view more information about DailyTasks
                      </Card.Text>
                      <Button variant="primary">View DailyTasks</Button>
                    </Card.Body>
                  </Card>
                </Col>
                <Col style={{ marginTop: "20px" }}>
                  <Card style={{ width: "18rem" }}>
                    <Card.Img
                      variant="top"
                      src="https://mmo.aiircdn.com/326/5e8b2443bb37b.jpg"
                      style={{ height: 150 }}
                    />
                    <Card.Body>
                      <Card.Text>
                        Click to view more information about Pharmacies
                      </Card.Text>
                      <Button variant="primary">View Pharmacies</Button>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Container>

            {/*<Link to="/todos">here</Link> */}
          </div>
        </div>
      </>
    );
  }
}

export default WelcomeComponent;
