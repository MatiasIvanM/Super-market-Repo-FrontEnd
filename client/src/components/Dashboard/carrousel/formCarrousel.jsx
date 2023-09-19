import { useForm } from 'react-hook-form';
import { useState,useEffect } from 'react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import style from './formCarrousel.module.css'
// import { addProduct } from "../../../redux/Actions/actionsProducts"
import { Button, InputGroup, Form, Alert } from 'react-bootstrap'
import { PiWarning } from 'react-icons/pi'
import { Link } from 'react-router-dom'
// import { selectCategory } from '../../redux/Actions/actionsCategory'

export default function formCarrousel() {
    
    // const dispatch = useDispatch();
    // const { register, handleSubmit, reset } = useForm();
    // const { register } = useForm();
    // const selectedCategory = useSelector((state) => state.category);
    
    // const [producto, setProducto] = useState([]);
    // const card= useSelector((state)=>state.productsSC)
    
    // useEffect(()=>{
    //     setProducto(card)
    // },[])
   
    const onSubmit = (data) => {
        // const isCategoryValid = !!data.category;
        // console.log(errors);
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

  return (
    <div className={style.container} >
      <div className={style.formContainer} >
        <h1>Imagenes del Carrousel</h1>
        <form encType="multipart/form-data" >
        {/* <form encType="multipart/form-data" onSubmit={handleSubmit(onSubmit)}> */}
    
          {/* {errors.image && (
            <span className={style.errorMessage}>
              <PiWarning /> {errors.image?.type === 'required'
                ? <span>El campo imagen es requerido</span>
                : <span>El campo nombre no puede tener más de 250 caracteres</span>}</span>
          )} */}
          <InputGroup className={`mb-3 `}>
            <InputGroup.Text>Imagen - 1</InputGroup.Text>
            <Form.Control
              aria-label="Image"
              placeholder='Agrega una imagen del producto'
              name='image'
              type="file"
            //   {...register('image', {
            //     required: true,
            //     maxLength: 249
            //   })}
            />
          </InputGroup>

          <div className={style.buttonContainer}>
            <Button className={style.styleButton} variant="success" type='submit'>Agregar producto</Button>
            <Button className={style.styleButton} as={Link} to='/home' variant="primary">Volver al inicio</Button>
          </div>
          {/* <Alert key='success' variant='success' show={showSuccessMessage}>
            El producto se ha agregado correctamente.
          </Alert> */}
        </form>
      </div>
    </div>
  );
};
