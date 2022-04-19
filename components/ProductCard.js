import Image from "next/image";
import Link from "next/link";
import classes from "./ProductCard.module.scss";

export default function ProductCard(props) {
  return (
    <Link href="/builder" passHref>
      <div className={classes.card + " " + classes.stacked}>
        {/* <Image
          src="https://p1.akcdn.net/full/399523594.gigabyte-geforce-gtx-1070-g1-gaming-8gb-gddr5-256bit-gv-n1070g1-gaming-8gd.jpg"
          alt="kep"
          width="400"
          height="300"
        /> */}
        <div className={classes.card_content}>
          <h2 className={classes.card_title}>{props.product.name}</h2>
          <p className={classes.card_p}>{props.product.price + " Ft"}</p>
        </div>
      </div>
    </Link>
  );
}
