import classes from "./CategoryMenuDesktop.module.scss";
import Link from "next/link";
import { list } from "../global/global";
import { Card, ListGroup } from "react-bootstrap";

export default function CategoryMenuDesktop(props) {
  const LANG = props.lang ?? "hu";

  const renderList = [];

  for (const i in list) {
    renderList.push(
      <Link
        key={
          list[i].category === "home" ? "home" : `category_${list[i].category}`
        }
        href={
          list[i].category === "home" ? "/" : `/category/${list[i].category}`
        }
        passHref
      >
        <ListGroup.Item
          className={classes.item}
          active={props.category === list[i].category}
        >
          <h3>{list[i][LANG]}</h3>
        </ListGroup.Item>
      </Link>
    );
  }

  return (
    <Card style={{ width: "18rem" }}>
      <ListGroup variant="flush">{renderList}</ListGroup>
    </Card>
  );
}
