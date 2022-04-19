import { Nav, Navbar } from "react-bootstrap";
import { lang } from "../global/global";

export default function Footer() {
  return (
    <Navbar fixed="bottom" expand="lg" bg="dark" variant="dark">
      <Nav className="me-auto">
        <Navbar.Brand href="/">Build-a-PC.com</Navbar.Brand>
      </Nav>
      <Nav>
        <Nav.Link onClick={lang("en")}>EN</Nav.Link>
        <Nav.Link onClick={lang("hu")}>HU</Nav.Link>
      </Nav>
    </Navbar>
  );
}
