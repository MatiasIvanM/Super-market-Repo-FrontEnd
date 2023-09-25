
import { Button, Card } from "react-bootstrap";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import style from "./CardProduct.module.css";
import { useState, useEffect } from "react";
import { addProductSC } from "../../redux/Actions/actionsSC";
import { useDispatch } from "react-redux"; // Importa el hook useSelector
import Detail from "../../View/Detail/Detail";

function CardProduct(props) {
  console.log("🚀 ~ file: CardProducto.jsx:201 ~ CardProduct ~ props:", props)

  const [showDetailModal, setShowDetailModal] = useState(false);
  const [discountPrice, setDiscountPrice] = useState(0);
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [buttonColor, setButtonColor] = useState("primary")
  const dispatch = useDispatch();

  let { id, name, description, price, rating, stock, image, discount, available } = props;


  const calculateDiscountPrice = () => {
    if (discount > 0) {
      const discountedPrice = Math.floor(price * discount / 100);
      return price - discountedPrice;
    } else {
      return price;
    }
  };

  useEffect(() => {
    const newDiscountPrice = calculateDiscountPrice();
    setDiscountPrice(newDiscountPrice);
  }, [discount]);

  const handleAddToCart = () => {
    if (stock > 0 && available) {
      dispatch(addProductSC({ productDetails: props, quantity: 1, discountPrice }));
      // Cambia el color del botón a verde y mostrar mensaje de confirmación durante medio segundo
      setButtonColor("success");
      setConfirmationMessage("Agregado al Carrito");
      setTimeout(() => {
        setButtonColor("primary"); // Volver a establecer el color del botón a su estado original
        setConfirmationMessage("");
      }, 1000);
    }
  };

  const handleCardClick = () => {
    setShowDetailModal(true);
  };

  return (
    <div className={style.cardContainer}>
      <Card
        className={style.card}
        style={{ width: "16rem", height: "20rem", position: "relative" }} // Establece una posición relativa
        bg="white"
        onClick={handleCardClick} // Mostrar el modal de detalle al hacer clic en la tarjeta
      >
        <Card.Img
          variant="top"
          src={image}
          style={{
            width: "100%",
            height: "50%", // Establece un alto fijo para las imágenes
            objectFit: "contain", // Mantiene la relación de aspecto y ajusta la imagen al espacio
            alignSelf: "center"
          }}
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
        </Card.Body>
      </Card>
      <Button
        variant={buttonColor} // Controla el color del botón dinámicamente
        style={{
          backgroundColor: available ? "" : "gray",
          width: "98%",
          position: "relative",
          bottom: "2.5em",
          left: "0px",
          zIndex: 1,
          color: "black"
        }}
        onClick={handleAddToCart}
        disabled={!available || stock === 0}
      >
        {confirmationMessage ? (
          <>
            <span style={{ color: "green" }}>✔</span> {confirmationMessage}
          </>
        ) : (
          (!available || stock === 0) ? "Agotado" : "Agregar al carrito"
        )}
      </Button>
      <Detail
        id={id}
        discountPrice={discountPrice}
        show={showDetailModal}
        onHide={() => setShowDetailModal(false)}
      />
    </div>
  );
  
  
}

export default CardProduct;

