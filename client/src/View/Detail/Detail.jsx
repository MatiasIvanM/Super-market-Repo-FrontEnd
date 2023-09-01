import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductById } from "../../redux/Actions/actionsProducts";
// import NotFound from "../../components/notFound/notFound";
// import style from "../Detail/Detail.module.css";

function ProductsDetail() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const products = useSelector((state) => state.productsId);

    useEffect(() => {
        dispatch(getProductById(id));
    }, [dispatch, id]);


    return (
        <div >
            <div>
                <p> {products.Product_ID} </p>
                <p>{products.Product_name}</p>

                <p>{products.hasOwnProperty("image") ?
                    (<img src={products.image} alt="not found" />) :
                    (<img src={products.image} alt="not found" />)}</p>

                <div >
                    <p>{products.Description}</p>
                    <p> {products.Price}</p>
                    <p >{products.stock}</p>

                </div>
            </div>
        </div>
    )
}

export default ProductsDetail;