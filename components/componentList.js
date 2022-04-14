import Link from "next/link";
import { LANG } from "../global/global";
import classes from "./ComponentList.module.scss";

const list = [
  { component: "CPU_Cooler", hu: "Processzor hűtő", en: "CPU Cooler" },
  { component: "Case", hu: "Gépház", en: "Case" },
  { component: "GPU", hu: "Videókártya", en: "Graphics Card" },
  { component: "HDD", hu: "Merevlemez", en: "HDD" },
  { component: "RAM", hu: "Memória", en: "Memory" },
  { component: "Monitor", hu: "Monitor", en: "Monitor" },
  { component: "Motherboard", hu: "Alaplap", en: "Motherboard" },
  { component: "PSU", hu: "Tápegység", en: "Powersupply Unit" },
  { component: "CPU", hu: "Processzor", en: "Processor" },
  { component: "SSD", hu: "SSD", en: "SSD" },
];

list.sort((a, b) => (a[LANG] > b[LANG] ? 1 : b[LANG] > a[LANG] ? -1 : 0));

const renderList = [];
for (const i in list) {
  renderList.push(
    <Link href={`/component/${list[i].component}`}>
      <li className={classes.listitem} key={`category${list[i].component}`}>
        {list[i][LANG]}
      </li>
    </Link>
  );
}

export default function ComponentList() {
  return (
    <div>
      <ul className={classes.list}>{renderList}</ul>
    </div>
  );
}
