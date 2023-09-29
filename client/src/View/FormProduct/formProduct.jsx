import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "./formProduct.module.css";
import { addProduct } from "../../redux/Actions/actionsProducts";
import { Button, InputGroup, Form, Alert } from "react-bootstrap";
import { PiWarning } from "react-icons/pi";
import { Link, useHistory } from "react-router-dom";
import { selectCategory } from "../../redux/Actions/actionsCategory";
// import {useHistory } from ''

export default function FormProduct() {
  let history = useHistory();
  const dispatch = useDispatch();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  const selectedCategory = useSelector((state) => state.category);

  const [producto, setProducto] = useState([]);
  const card = useSelector((state) => state.shoppingCart);
  useEffect(() => {
    setProducto(card);
  }, []);

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const onSubmit = (data) => {
    // const isCategoryValid = !!data.category;
    console.log(data);
    if (Object.keys(errors).length > 0) {
    } else {
      dispatch(addProduct(data));
      setShowSuccessMessage(true);
      reset();
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 4000);
    }
  };

  const handleCategoryChange = (e) => {
    const selectedValue = e.target.value;
    dispatch(selectCategory(selectedValue)); // Dispara la acción para seleccionar una categoría
  };
  const handleClick = () => {
    history.goBack();
  };

  return (
    <div className={style.container}>
      <div className={style.formContainer}>
        <h1>Crear Producto</h1>
        <form encType="multipart/form-data" onSubmit={handleSubmit(onSubmit)}>
          {errors.name && (
            <span className={style.errorMessage}>
              <PiWarning />{" "}
              {errors.name?.type === "required" ? (
                <span>El campo nombre es requerido</span>
              ) : (
                <span>El campo nombre no puede tener más de 10 caracteres</span>
              )}
            </span>
          )}
          ;
          <InputGroup className={`mb-3 ${errors.name && style.error}`}>
            <InputGroup.Text id="basic-addon1">Nombre </InputGroup.Text>
            <Form.Control
              placeholder="Escribe el nombre del producto"
              aria-describedby="basic-addon1"
              id="name"
              name="name"
              type="text"
              {...register("name", {
                required: true,
                maxLength: 249,
              })}
            />
          </InputGroup>
          {errors.price && (
            <span className={style.errorMessage}>
              <PiWarning />{" "}
              {errors.price?.type === "required" && (
                <span>El campo Price es requerido</span>
              )}
            </span>
          )}
          <InputGroup className={`mb-3 ${errors.price && style.error}`}>
            <InputGroup.Text>Precio</InputGroup.Text>
            <InputGroup.Text>$</InputGroup.Text>
            <Form.Control
              type="number"
              name="price"
              aria-label="Precio"
              placeholder="Escribe el precio del producto"
              {...register("price", {
                required: true,
              })}
            />
          </InputGroup>
          {errors.description && (
            <span className={style.errorMessage}>
              <PiWarning />{" "}
              {errors.description?.type === "required" ? (
                <span>El campo descripción es requerido</span>
              ) : (
                <span>
                  El campo descripción no puede tener más de 250 caracteres
                </span>
              )}
            </span>
          )}
          <InputGroup className={`mb-3 ${errors.description && style.error}`}>
            <InputGroup.Text>Descripción del producto</InputGroup.Text>
            <Form.Control
              as="textarea"
              aria-label="With textarea"
              name="description"
              placeholder="Escribe una descripción del producto"
              {...register("description", {
                required: true,
                maxLength: 249,
              })}
            />
          </InputGroup>
          {errors.stock && (
            <span className={style.errorMessage}>
              <PiWarning />{" "}
              {errors.stock?.type === "required" && (
                <span>El campo stock es requerido</span>
              )}
            </span>
          )}
          <InputGroup className={`mb-3 ${errors.stock && style.error}`}>
            <InputGroup.Text id="basic-addon1">Inventario </InputGroup.Text>
            <Form.Control
              placeholder="Escribe la cantidad en inventario del producto"
              aria-label="Stock"
              aria-describedby="basic-addon1"
              name="stock"
              type="number"
              {...register("stock", {
                required: true,
              })}
            />
          </InputGroup>
          {errors.brand && (
            <span className={style.errorMessage}>
              <PiWarning />{" "}
              {errors.brand?.type === "required" && (
                <span>El campo brand es requerido</span>
              )}
            </span>
          )}
          <InputGroup className={`mb-3 ${errors.brand && style.error}`}>
            <InputGroup.Text>Marca</InputGroup.Text>
            <Form.Control
              aria-label="Brand"
              placeholder="Escribe la marca del producto"
              name="brand"
              type="text"
              {...register("brand", {
                required: true,
              })}
            />
          </InputGroup>
          {errors.expirationdate && (
            <span className={style.errorMessage}>
              <PiWarning />{" "}
              {errors.expirationdate?.type === "required" && (
                <span>El campo fecha de ingreso es requerido</span>
              )}
            </span>
          )}

          <InputGroup className={`mb-3 ${errors.expirationdate && style.error}`}>
            <InputGroup.Text>Ingreso a Deposito</InputGroup.Text>
            <Form.Control
              aria-label="expirationdate"
              placeholder="Fecha de Ingreso a Deposito"
              name="expirationdate"
              type="date"
              {...register("expirationdate", {
                required: true,
              })}
            />
          </InputGroup>
          {/* {errors.categories && (
                  <span className={style.errorMessage}><PiWarning/>  {errors.categories?.type === 'required' && <span>El campo Categories es requerido</span>}</span>
                )}
        <InputGroup className={`mb-3 ${errors.categories && style.error}`}>
        <InputGroup.Text>Categorias</InputGroup.Text>
          <Form.Control 
            aria-label="Categories" 
            placeholder='En que categorias se encuentra el producto'
            name='categories'
            type="text"
              {...register('categories', {
                required: true,
              })}
            />
        </InputGroup> */}
          <InputGroup className={`mb-3 ${errors.categories && style.error}`}>
            <InputGroup.Text>Categorías</InputGroup.Text>
            <select
              name="categories"
              onChange={handleCategoryChange}
              className="form-select"
              {...register("categories", {
                required: true,
              })}
            >
              <option value="">Selecciona una categoría</option>
              {selectedCategory.map((category, index) => (
                <option key={index} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </InputGroup>
          {/* {errors.categories && (
            <span className={style.errorMessage}>
              <PiWarning />{' '}
              {errors.categories?.type === 'required' && <span>El campo Categorias es requerido</span>}
            </span>
          )}

          <div className={`mb-3 ${errors.categories && style.error}`}>
            <label htmlFor="categories" className="form-label">Categorías</label>
            <select
               id="category"
              name="category" 
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="form-select"
            >
              <option value="">Selecciona una categoría</option>
              {selectedCategory.map((category, index) => (
                <option key={index} value={category.name}> 
                  {category.name}
                </option>
              ))}
            </select>
          </div> */}
          {errors.image && (
            <span className={style.errorMessage}>
              <PiWarning />{" "}
              {errors.image?.type === "required" ? (
                <span>El campo imagen es requerido</span>
              ) : (
                <span>
                  El campo nombre no puede tener más de 250 caracteres
                </span>
              )}
            </span>
          )}
          <InputGroup className={`mb-3 ${errors.categories && style.error}`}>
            <InputGroup.Text>Imagen</InputGroup.Text>
            <Form.Control
              aria-label="Image"
              placeholder="Agrega una imagen del producto"
              name="image"
              type="file"
              {...register("image", {
                required: true,
                maxLength: 249,
              })}
            />
          </InputGroup>
          <div className={style.buttonContainer}>
            <Button
              className={style.styleButton}
              variant="success"
              type="submit"
            >
              Agregar producto
            </Button>            
            <Button onClick={handleClick}>Cerrar</Button>
          </div>
          <Alert key="success" variant="success" show={showSuccessMessage}>
            El producto se ha agregado correctamente.
          </Alert>
        </form>
      </div>
    </div>
  );
}

// ´${PRODUCT}/:${id}´
