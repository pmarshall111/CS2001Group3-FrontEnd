import React from "react";
import { Component } from "react";
import { Button, Container, Row, Col, Card } from "react-bootstrap";

class Dashboard extends Component {
  render() {
    return (
      <div>
        <Container className="gap">
          <Row>
            <Col md={3}>
              <Card style={{ width: "17rem" }}>
                <Card.Img variant="top" src="holder.js/100px180" />
                <Card.Body>
                  <Card.Title>Card Title</Card.Title>
                  <Card.Text>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </Card.Text>
                  <Button variant="primary">Go somewhere</Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
export default Dashboard;
