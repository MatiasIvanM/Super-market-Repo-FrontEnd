import{ Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import style from "./CardProduct.module.css";
import { useState } from "react";
import Detail from '../../View/Detail/Detail'

function CardProduct(props) {

  const [showDetailModal, setShowDetailModal] = useState(false);

  let {
    id,
    name,
    description,
    price,
    rating,
    stock,
    image,
  } = props;


  return (
    <>
    <Card onClick={() => setShowDetailModal(true)} className={style.container} style={{ width: "16rem" }} bg="white">
      
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
            <Card.Title
              style={{ fontSize: "1.3rem", color: "blue", textAlign: "left" }}
            >
              ${price}
            </Card.Title>
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
        
        
    </Card>
    <Detail
          id={id}
          show={showDetailModal}
          onHide={() => setShowDetailModal(false)}
          
        />      
              
     </>
  );
}

export default CardProduct;