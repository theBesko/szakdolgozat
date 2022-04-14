import { DropdownButton, Dropdown } from "react-bootstrap";
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
      <Dropdown.Item
        key={`category_${list[i].component}`}
        href={`/component/${list[i].component}`}
      >
        {list[i][LANG]}
      </Dropdown.Item>
    );
  }

  return (
    <DropdownButton
      className={classes.penisz}
      id="dropdown-basic-button"
      title={current}
    >
      {renderList}
    </DropdownButton>
  );
}
