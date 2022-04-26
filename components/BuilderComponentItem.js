import { Card, Col } from "react-bootstrap";

export default function BuilderComponentItem({ component, chosen }) {
  return (
    <Card border="dark">
      <Card.Body>
        <Card.Title>{component}</Card.Title>
        <Card.Text>
          {chosen === "" ? `Click here to choose ${component}` : `${chosen}`}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
