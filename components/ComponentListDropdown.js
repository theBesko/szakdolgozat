import { Navbar, Container, Nav, Offcanvas } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { list } from "../global/global";
import classes from "./ComponentListDropdown.module.scss";

export default function ComponentListDropdown(props) {
  const LANG = props.lang ?? "hu";

  const renderList = [];

  for (const i in list) {
    if (list[i].component === props.component) {
      renderList.push(
        <Nav.Item key={`category_${list[i].component}`}>
          <h1>
            <b>{`► ${list[i][LANG]}`}</b>
          </h1>
        </Nav.Item>
      );
    } else {
      renderList.push(
        <Nav.Link
          key={`category_${list[i].component}`}
          href={`/component/${list[i].component}`}
        >
          <h2>{list[i][LANG]}</h2>
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
        className={classes.nav}
      >
        <Container fluid>
          <Navbar.Brand>Menu</Navbar.Brand>
          <Navbar.Toggle aria-controls="offcanvasNavbar" />
          <Navbar.Offcanvas
            variant="dark"
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
            placement="top"
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
