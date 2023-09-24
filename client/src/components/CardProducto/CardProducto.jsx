
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
  const dispatch = useDispatch();

  let { id, name, description, price, rating, stock, image, discount, available } = props;


  const calculateDiscountPrice = () => {
    if (discount > 0) {
      const discountedPrice = Math.abs(price * discount / 100 - price);
      return discountedPrice;
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
      // Verificar que haya stock y disponibilidad
      dispatch(addProductSC({ productDetails: props, quantity: 1, discountPrice }));
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
        variant="primary"
        style={{
          width: "98%",
          backgroundColor: available ? "" : "gray",
          position: "relative", // Establece una posición absoluta para el botón
          bottom: "2.5em", // Ajusta la posición vertical según tus preferencias
          left: "0px", // Ajusta la posición horizontal según tus preferencias
          zIndex: 1 // Asegura que el botón esté sobre la tarjeta
        }}
        onClick={handleAddToCart}
        disabled={!available || stock === 0} // Deshabilitar el botón si !available o stock === 0
      >
        {(!available || stock === 0) ? "Agotado" : "Agregar al carrito"}
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

