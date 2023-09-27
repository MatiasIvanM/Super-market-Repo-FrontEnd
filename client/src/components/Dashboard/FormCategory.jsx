import { useForm } from 'react-hook-form';
import { useState,useEffect } from 'react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import style from './formProduct.module.css'
import { addProduct } from "../../redux/Actions/actionsProducts"
import { Button, InputGroup, Form, Alert } from 'react-bootstrap'
import { PiWarning } from 'react-icons/pi'
import { Link } from 'react-router-dom'
import { selectCategory } from '../../redux/Actions/actionsCategory'
import axios from 'axios';

export default function FormCategory() {
  


//   const [producto, setProducto] = useState([]);
//   const card= useSelector((state)=>state.shoppingCart)
//  useEffect(()=>{
//    setProducto(card)
//    },[])
   

//   const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const onSubmit = (data) => {

    axios.post('http://localhost:3001/category', data);
    // const isCategoryValid = !!data.category;
    // console.log(data);
    // if (Object.keys(errors).length > 0) {
    // } else {
    //   dispatch(addProduct(data));
    //   setShowSuccessMessage(true)
    //   reset();
    //   setTimeout(() => {
    //     setShowSuccessMessage(false);
    //   }, 4000);
    // }
  };

//   const handleCategoryChange = (e) => {
//     const selectedValue = e.target.value;
//     dispatch(selectCategory(selectedValue)); // Dispara la acción para seleccionar una categoría
    
//   };

  return (
    <div className={style.container} >
      <div className={style.formContainer} >
        <h1>Crear Categoria</h1>
        <form encType="multipart/form-data" onSubmit={handleSubmit(onSubmit)}>

          {/* {errors.name && (
            <span className={style.errorMessage}>
              <PiWarning /> {errors.name?.type === 'required'
                ? <span>El campo nombre es requerido</span>
                : <span>El campo nombre no puede tener más de 10 caracteres</span>}</span>
          )}; */}
          <InputGroup className={`mb-3 ${errors.name && style.error}`}>
            <InputGroup.Text id="basic-addon1">Nombre Categoria: </InputGroup.Text>
            <Form.Control
              placeholder="Escribe el nombre de la Categoria"
              aria-describedby="basic-addon1"
              id='categories'
              name='categories'
              type="text"
              {...register('categories', {
                required: true,
                maxLength: 249,
              })}
            />
          </InputGroup>

          

          <div className={style.buttonContainer}>
            <Button className={style.styleButton} variant="success" type='submit'>Agregar Categoria</Button>
            {/* <Button className={style.styleButton} as={Link} to='/home' variant="primary">Volver al inicio</Button> */}
          </div>
          <Alert key='success' variant='success' show={showSuccessMessage}>
            Categoria se ha agregado correctamente.
          </Alert>
        </form>
      </div>
    </div>
  );
};
