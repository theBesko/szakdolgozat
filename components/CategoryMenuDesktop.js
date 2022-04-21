import classes from "./CategoryMenuDesktop.module.scss";
import Link from "next/link";
import { list } from "../global/global";

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
        <li
          className={
            props.category === list[i].category
              ? classes.listitemcurrent
              : classes.listitem
          }
        >
          {list[i][LANG]}
        </li>
      </Link>
    );
  }

  return (
    <div className={classes.listDiv}>
      <ul className={classes.list}>{renderList}</ul>
    </div>
  );
}
