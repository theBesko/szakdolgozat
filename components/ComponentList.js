import classes from "./ComponentList.module.scss";
import Link from "next/link";
import { list } from "../global/global";

export default function ComponentList(props) {
  const LANG = props.lang;

  const renderList = [];

  for (const i in list) {
    renderList.push(
      <Link
        key={`category_${list[i].component}`}
        href={`/component/${list[i].component}`}
        passHref
      >
        <li
          className={
            props.component === list[i].component
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
