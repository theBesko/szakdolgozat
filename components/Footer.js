import { Nav, Navbar } from "react-bootstrap";
import { lang, theme } from "../global/global";

export default function Footer(props) {
  return (
    <Navbar
      className={"d-none d-lg-flex"}
      fixed="bottom"
      expand="lg"
      bg="dark"
      variant="dark"
    >
      <Nav className="me-auto">
        <Navbar.Brand href="/">Build-a-PC.com</Navbar.Brand>
      </Nav>
      <Nav>
        <Nav.Link onClick={theme}>
          {props.lang === "hu" ? "Témaváltás" : "Change theme"}
        </Nav.Link>
        <Nav.Link onClick={lang}>
          {props.lang === "hu" ? "Change to English" : "Magyar nyelv"}
        </Nav.Link>
      </Nav>
    </Navbar>
  );
}
