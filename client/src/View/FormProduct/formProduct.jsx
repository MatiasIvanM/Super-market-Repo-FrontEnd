import { useForm } from 'react-hook-form';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './formProduct.css';
import {addProduct} from "../../redux/Actions/actionsProducts"


const Form = () => {
  const dispatch = useDispatch();
  const { register, formState: { errors }, handleSubmit } = useForm();


  const onSubmit = (data) => { 
    dispatch(addProduct(data))
    console.log(data)
  };

  return (
    <div className="form-container">
      <div>
        <h1>Crear Producto</h1>
      </div>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label>Nombre</label>
            <input
              type="text"
              {...register('name', {
                required: true,
                maxLength: 10,
              })}
            />
            {errors.name?.type === 'required' && <p>El campo nombre es requerido</p>}
            {errors.name?.type === 'maxLength' && <p>El campo nombre no puede tener más de 10 caracteres</p>}
          </div>

          <div>
            <label>Price</label>
            <input
              type="number"
              {...register('Price', {
                required: true,
              })}
            />
            {errors.Price?.type === 'required' && <p>El campo Price es requerido</p>}
          </div>

          <div>
            <label>Description</label>
            <input
              type="text"
              {...register('Description', {
                required: true,
              })}
            />
            {errors.Description?.type === 'required' && <p>El campo Description es requerido</p>}
          </div>

          <div>
            <label>Image</label>
            <input
              type="text"
              {...register('Image', {
                required: true,
              })}
            />
            {errors.season?.type === 'Image' && <p>El campo Image es requerido</p>}
          </div>
          <div>
            <label>stock</label>
            <input
              type="number"
              {...register('Stock', {
                required: true,
              })}
            />
            {errors.stock?.type === 'stock' && <p>El campo stock es requerido</p>}
          </div>
          <div>
            <label>Brand</label>
            <input
              type="text"
              {...register('brand', {
                required: true,
              })}
            />
            {errors.brand?.type === 'brand' && <p>El campo brand es requerido</p>}
          </div>
          <div>
            <label>Expiration date</label>
            <input
              type="text"
              {...register('expirationdate', {
                required: true,
              })}
            />
            {errors.expirationdate?.type === 'expirationdate' && <p>El Expiration date es requerido</p>}
          </div>
          <div>
            <label>Categories</label>
            <input
              type="text"
              {...register('categories', {
                required: true,
              })}
            />
            {errors.categories?.type === 'Categories' && <p>El campo Categories es requerido</p>}
          </div>
          <button type="submit">Crear Producto</button>
        </form>
      </div>
    </div>
  );
};

export default Form;