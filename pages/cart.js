import { Card, Col, Container, Row } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";

export default function CartPage() {
  return (
    <div>
      <Container fluid>
        <Row>
          <Col md={3}></Col>
          <Col md={9}>
            <Row xs={1} md={1} xl={4} className="g-2 d-none d-lg-flex">
              <Col>
                <Card border="dark">
                  <Card.Body>
                    <Card.Title>Card title</Card.Title>
                    <Card.Text>
                      This is a longer card with supporting text below as a
                      natural lead-in to additional content. <br /> This content
                      is a little bit longer.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col>
                <Card>
                  <Card.Body>
                    <Card.Title>Card title</Card.Title>
                    <Card.Text>
                      This is a longer card with supporting text below as a
                      natural lead-in to additional content. This content is a
                      little bit longer.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col>
                <Card>
                  <Card.Body>
                    <Card.Title>Card title</Card.Title>
                    <Card.Text>
                      This is a longer card with supporting text below as a
                      natural lead-in to additional content. This content is a
                      little bit longer.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col>
                <Card>
                  <Card.Body>
                    <Card.Title>Card title</Card.Title>
                    <Card.Text>
                      This is a longer card with supporting text below as a
                      natural lead-in to additional content. This content is a
                      little bit longer.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
