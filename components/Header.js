import classes from "./Header.module.scss";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { lang } from "../global/global";

export default function Header(props) {
  return (
    <div>
      <div className={classes.jumbotron}>
        <h1>BUILD-A-PC.com</h1>
        <p>szia</p>
      </div>
      <Navbar
        collapseOnSelect
        sticky="top"
        expand="lg"
        bg="dark"
        variant="dark"
      >
        <Container>
          <Navbar.Brand>Build-a-PC.com</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link>Features</Nav.Link>
              <Nav.Link>Pricing</Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link onClick={lang("en")}>EN</Nav.Link>
              <Nav.Link onClick={lang("hu")}>HU</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
