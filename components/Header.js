import classes from "./Header.module.scss";
import {
  Navbar,
  Container,
  Nav,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";

import { useRouter } from "next/dist/client/router";

export default function Header(props) {
  const router = useRouter();

  const search = (val) => {
    if (val) router.push(`/search?value=${val}`, undefined, { shallow: true });
    else router.push("/search");
  };

  return (
    <Navbar
      className={"d-none d-lg-flex"}
      collapseOnSelect
      sticky="top"
      expand="lg"
      bg="dark"
      variant="dark"
    >
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
        </Nav>
        <Nav className="me-5">
          <Form className="d-flex">
            <FormControl
              autoFocus
              type="search"
              placeholder={props.lang === "hu" ? "Keresés..." : "Search..."}
              aria-label="Search"
              defaultValue={router.query.value}
              onChange={(e) => {
                search(e.target.value);
              }}
            />
          </Form>
        </Nav>
      </Container>
    </Navbar>
  );
}
