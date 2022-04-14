import classes from "./ComponentList.module.scss";
import Link from "next/link";
import { LANG, list } from "../global/global";

list.sort((a, b) => (a[LANG] > b[LANG] ? 1 : b[LANG] > a[LANG] ? -1 : 0));

export default function ComponentList(props) {
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
    <div>
      <ul className={classes.list}>{renderList}</ul>
    </div>
  );
}
