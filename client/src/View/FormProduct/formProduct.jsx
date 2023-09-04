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
              {...register('price', {
                required: true,
              })}
            />
            {errors.price?.type === 'required' && <p>El campo Price es requerido</p>}
          </div>

          <div>
            <label>Description</label>
            <input
              type="text"
              {...register('description', {
                required: true,
              })}
            />
            {errors.description?.type === 'required' && <p>El campo Description es requerido</p>}
          </div>

          <div>
            <label>Image</label>
            <input
              type="text"
              {...register('image', {
                required: true,
              })}
            />
            {errors.image?.type === 'required' && <p>El campo Image es requerido</p>}
          </div>
          <div>
            <label>Stock</label>
            <input
              type="number"
              {...register('stock', {
                required: true,
              })}
            />
            {errors.stock?.type === 'required' && <p>El campo stock es requerido</p>}
          </div>
          <div>
            <label>Brand</label>
            <input
              type="text"
              {...register('brand', {
                required: true,
              })}
            />
            {errors.brand?.type === 'required' && <p>El campo brand es requerido</p>}
          </div>
          <div>
            <label>Expiration date</label>
            <input
              type="text"
              {...register('expirationdate', {
                required: true,
              })}
            />
            {errors.expirationdate?.type === 'required' && <p>El Expiration date es requerido</p>}
          </div>
          <div>
            <label>Categories</label>
            <input
              type="text"
              {...register('categories', {
                required: true,
              })}
            />
            {errors.categories?.type === 'required' && <p>El campo Categories es requerido</p>}
          </div>
          <button type="submit">Crear Producto</button>
        </form>
      </div>
    </div>
  );
};

export default Form;