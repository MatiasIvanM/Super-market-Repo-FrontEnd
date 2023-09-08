import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import style from "./CardProduct.module.css";
import { Link } from "react-router-dom";

function CardProduct(props) {
  let {
    id,
    name,
    description,
    price,
    rating,
    stock,
    Existencias,
    image,
    brand,
    expirationdate,
    categories,
  } = props;

  return (
    <Card style={{ width: "16rem", height: "22rem" }} bg="white" className={style.container}>
      <Link to={`/product/${id}`}  className={style.link}>
        <Card.Img
          variant="top"
          src={image} className={style.img}
          // style={{ width: "70%", alignSelf: "center" } }
        />
        <Card.Subtitle className={style.rating}>★{rating}</Card.Subtitle>
        <Card.Body style={{ width: "98%" }}>
          <Card.Title style={{ fontSize: "1.12rem" }}>{name}</Card.Title>
          <Card.Text
            style={{ fontSize: "0.7rem", color: "gray", textAlign: "left" }}
          >
            {description}{" "}
          </Card.Text>
          <div className={style.containerPrice}>
            <Card.Title
              style={{ fontSize: "1.3rem", color: "blue", textAlign: "left" }}
            >
              ${price}
            </Card.Title>
            {/* {console.log(stock)} */}
            {stock > 0 ? (
              <Card.Text
                style={{
                  fontSize: "0.7rem",
                  fontWeight: "bold",
                  color: "green",
                }}
              >
                Disponible{" "}
              </Card.Text>
            ) : (
              <Card.Text
                style={{ fontSize: "0.7rem", fontWeight: "bold", color: "red" }}
              >
                Agotado{" "}
              </Card.Text>
            )}
          </div>
          <Button variant="primary" style={{ width: "98%" }}>
            Agregar
          </Button>
        </Card.Body>
      </Link>
    </Card>
    // </>
  );
}

export default CardProduct;