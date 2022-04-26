import Image from "next/image";
import Link from "next/link";
import { Card, Col } from "react-bootstrap";
import classes from "./ProductCard.module.scss";

export default function ProductCard(props) {
  const { id, name, price, sale } = props.product;
  return (
    <Link href={`/product/${id}`} passHref>
      <Col>
        <Card className={classes.item} border="dark">
          <Card.Body>
            <Card.Title>{name}</Card.Title>
            <Card.Text>
              {parseFloat(sale) === 1
                ? `${price} Ft`
                : `${price} Ft --> ${Math.ceil(
                    parseFloat(sale) * parseInt(price)
                  )} Ft`}
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </Link>
  );
}
