import { Navbar, Container, Nav, Offcanvas } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { list } from "../global/global";
import classes from "./ComponentListDropdown.module.scss";

export default function ComponentListDropdown(props) {
  const LANG = props.lang ?? "hu";

  const renderList = [];

  for (const i in list) {
    if (list[i].category === props.category) {
      renderList.push(
        <Nav.Item key={`category_${list[i].category}`}>
          <h2>
            <b>{`► ${list[i][LANG]}`}</b>
          </h2>
        </Nav.Item>
      );
    } else {
      renderList.push(
        <Nav.Link
          key={`category_${list[i].category}`}
          href={`/component/${list[i].category}`}
        >
          <h3>{list[i][LANG]}</h3>
        </Nav.Link>
      );
    }
  }

  return (
    <>
      <Navbar
        collapseOnSelect
        sticky="top"
        bg="dark"
        variant="dark"
        expand={false}
        className={"d-xs-flex d-lg-none"}
      >
        <Container fluid>
          <Navbar.Brand>Menu</Navbar.Brand>
          <Navbar.Toggle aria-controls="offcanvasNavbar" />
          <Navbar.Offcanvas
            variant="dark"
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
            placement="end"
            // className="bg-dark"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id="offcanvasNavbarLabel">Menu</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="me-auto bg-light justify-content-end flex-grow-1 pe-3">
                {renderList}
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
}
