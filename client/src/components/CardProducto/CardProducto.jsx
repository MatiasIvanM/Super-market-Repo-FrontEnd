import { Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import style from "./CardProduct.module.css";
import { useState, useEffect } from "react";
import Detail from "../../View/Detail/Detail";

function CardProduct(props) {
  const [showDetailModal, setShowDetailModal] = useState(false);

  const [discountPrice, setDiscountPrice] = useState(0);

  let { id, name, description, price, rating, stock, image, discount } = props;
  const test =()=>{
    console.log(props);
  }

  const calculateDiscountPrice = () => {
    if (discount > 0) {
      const discountedPrice = Math.abs(price * discount / 100 - price);
      return discountedPrice
    } else {
      return price;
    }
  };
  
  useEffect(() => {
    const newDiscountPrice = calculateDiscountPrice();
    setDiscountPrice(newDiscountPrice);
  }, [discount]);

  return (
    <>
      <Card
        onClick={() => setShowDetailModal(true)}
        className={style.container}
        style={{ width: "16rem" }}
        bg="white"
      >
        <Card.Img
          variant="top"
          src={image}
          style={{ width: "70%", alignSelf: "center" }}
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
        {discount > 0 ? (
          <>
            <Card.Title style={{ fontSize: "1.3rem", textAlign: "left" }}>
              <span className={style.oldPrice}>${price}</span>
              <span className={style.newPrice}>${discountPrice}</span>
              </Card.Title>
          </>
        ) : (
          <Card.Title className={style.priceStyle}>${price}</Card.Title>
        )}
      </div>
          {/* <div className={style.containerPrice}>
            <Card.Title
              style={{ fontSize: "1.3rem", color: "blue", textAlign: "left" }}
            >
              ${price}
            </Card.Title>
            {stock > 0 && stock < 10 ? (
              <Card.Text
                style={{
                  fontSize: "0.7rem",
                  fontWeight: "bold",
                  color: "pink",
                }}
              >
                {" "}
                Ultimas Existencias!{" "}
              </Card.Text>
            ) : stock > 10 ? (
              <Card.Text
                style={{ fontSize: "0.7rem", fontWeight: "bold", color: "green" }}
              >
                {" "}
                Disponible{" "}
              </Card.Text>
            ) : (
              <Card.Text
                style={{ fontSize: "0.7rem", fontWeight: "bold", color: "red" }}
              >
                {" "}
                Agotado{" "}
              </Card.Text>
            )} */}

            {/* {stock > 0 ? (
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
            )} */}

          {/* </div> */}
          <Button variant="primary" style={{ width: "98%" }} onClick={test}>
            Agregar
          </Button>         
        </Card.Body>
      </Card>
      <Detail
        id={id}
        discountPrice={discountPrice}
        show={showDetailModal}
        onHide={() => setShowDetailModal(false)}
      />
    </>
  );
}

export default CardProduct;