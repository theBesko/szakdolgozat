import classes from "./Header.module.scss";
import {
  Navbar,
  Container,
  Nav,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";

export default function Header(props) {
  return (
    <Navbar collapseOnSelect fixed="top" expand="lg" bg="dark" variant="dark">
      <Container fluid>
        <Nav>
          <Navbar.Brand href="/">Build-a-PC.com</Navbar.Brand>
          <Nav.Link href="/builder">
            {props.lang === "hu" ? "PC Építő" : "PC Builder"}
          </Nav.Link>
          <Nav.Link href="/account">
            {props.lang === "hu" ? "Fiók" : "Account"}
          </Nav.Link>
          <Nav.Link href="/cart">
            {props.lang === "hu" ? "Kosár" : "Cart"}
          </Nav.Link>
          <Nav.Link href="/builder">
            {props.lang === "hu" ? "PC Építő" : "PC Builder"}
          </Nav.Link>
        </Nav>
        <Nav className="me-5">
          <Form className="d-flex">
            <FormControl
              type="search"
              placeholder={props.lang === "hu" ? "Keresés..." : "Search..."}
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">
              {props.lang === "hu" ? "Keresés" : "Search"}
            </Button>
          </Form>
        </Nav>
      </Container>
    </Navbar>
  );
}
