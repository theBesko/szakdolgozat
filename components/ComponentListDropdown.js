import {
  DropdownButton,
  Dropdown,
  Navbar,
  Container,
  Nav,
  NavDropdown,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { LANG, list } from "../global/global";
import classes from "./ComponentListDropdown.module.scss";

list.sort((a, b) => (a[LANG] > b[LANG] ? 1 : b[LANG] > a[LANG] ? -1 : 0));

export default function ComponentListDropdown(props) {
  const renderList = [];
  let current;

  for (const i in list) {
    if (list[i].component === props.component) current = list[i][LANG];

    renderList.push(
      <NavDropdown.Item
        key={`category_${list[i].component}`}
        href={`/component/${list[i].component}`}
      >
        {list[i][LANG]}
      </NavDropdown.Item>
    );
  }

  return (
    <>
      <Navbar
        collapseOnSelect
        bg="dark"
        variant="dark"
        className={classes.penisz}
      >
        <Container>
          <Navbar.Brand>Category</Navbar.Brand>
          <Navbar.Toggle variant="dark" aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <NavDropdown expand="lg" title={current} id="basic-nav-dropdown">
              {renderList}
            </NavDropdown>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
