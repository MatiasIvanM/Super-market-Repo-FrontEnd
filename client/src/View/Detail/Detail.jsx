import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductById } from "../../redux/Actions/actionsProducts";
// import products from '../../data'
// import NotFound from "../../components/notFound/notFound";
// import style from "../Detail/Detail.module.css";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Image from 'react-bootstrap/Image';
import { useHistory } from "react-router-dom";
import { Alert } from 'react-bootstrap';

function ProductsDetail() {
    const { id } = useParams();
    const navigate = useHistory();
    const dispatch = useDispatch();
    const products = useSelector((state) => state.productsId);
    const [showMessage, setShowMessage] = useState(false); // Estado para mostrar/ocultar el mensaje


    useEffect(() => {
        dispatch(getProductById(id));
    }, [dispatch, id]);

    function handleClick() {
        navigate.push("/home");
      }

      function handleAddToCart() {
        // Una vez que el producto se ha agregado al carrito, mostramos la alerta
        setShowMessage(true);
        // Ocultamos la alerta después de un cierto tiempo (por ejemplo, 3 segundos)
        setTimeout(() => {
            setShowMessage(false);
        }, 3000); // 3000 milisegundos = 3 segundos
    }

    return (
        <div
            className="modal show"
            style={{ display: 'block', position: 'initial',width: "80%" }}
        >
            <Modal.Dialog>
                <Modal.Header style={{ alignSelf: "center" }}>
                    <Modal.Title >{products.name}</Modal.Title>
                </Modal.Header>

                <Image style={{ width: "60%", alignSelf: "center" }} src={products.image} rounded />

                <Modal.Body>
                    <p>{products.description}</p>
                    <Modal.Title>$ {products.price}</Modal.Title>
                </Modal.Body>
                <Modal.Title>Marca: {products.brand}</Modal.Title>

                <Modal.Footer>

                    <Button variant="secondary" onClick={handleClick}>Back</Button>
                    <Button variant="primary" onClick={handleAddToCart}>Agregar al carrito</Button>

                </Modal.Footer>
                <Alert show={showMessage} variant="success">
                ¡Producto agregado al carrito!
            </Alert>
            </Modal.Dialog>
            
        </div>
    )
}

export default ProductsDetail;






// function StaticExample() {
//   return (
//     <div
//       className="modal show"
//       style={{ display: 'block', position: 'initial' }}
//     >
//       <Modal.Dialog>
//         <Modal.Header closeButton>
//           <Modal.Title>Modal title</Modal.Title>
//         </Modal.Header>

//         <Modal.Body>
//           <p>Modal body text goes here.</p>
//         </Modal.Body>

//         <Modal.Footer>
//           <Button variant="secondary">Close</Button>
//           <Button variant="primary">Save changes</Button>
//         </Modal.Footer>
//       </Modal.Dialog>
//     </div>
//   );
// }

// export default StaticExample;