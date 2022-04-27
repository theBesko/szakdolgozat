import { Card, Col } from "react-bootstrap";
import classes from "./BuilderComponentItem.module.scss";

export default function BuilderComponentItem({ component, chosen, forbidden }) {
  return (
    <Card
      border="dark"
      className={forbidden ? classes.forbidden : classes.available}
    >
      <Card.Body>
        <Card.Title>{component}</Card.Title>
        <Card.Text>
          {forbidden
            ? "Select the previous components first"
            : chosen === ""
            ? `Click here to choose ${component}`
            : `${chosen} 
            Ft`}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
