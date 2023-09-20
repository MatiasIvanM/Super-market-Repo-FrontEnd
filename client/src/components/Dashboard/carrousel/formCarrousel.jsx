import React from 'react';
import style from './formCarrousel.module.css'
import { Button, InputGroup, Form, Alert } from 'react-bootstrap'
import { Link } from 'react-router-dom'


export default function formCarrousel() {
   
    const onSubmit = (data) => {
    };

  return (
    <div className={style.container} >
      <div className={style.formContainer} >
        <h4 className={style.h4} >Imágenes del Carrousel</h4>
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
              name='image2'
              type="file"
            //   {...register('image', {
            //     required: true,
            //     maxLength: 249
            //   })}
            />
          </InputGroup>
          <InputGroup className={`mb-3 `}>
            <InputGroup.Text>Imagen - 2</InputGroup.Text>
            <Form.Control
              aria-label="Image"
              placeholder='Agrega una imagen del producto'
              name='image3'
              type="file"
            //   {...register('image', {
            //     required: true,
            //     maxLength: 249
            //   })}
            />
          </InputGroup>
          <InputGroup className={`mb-3 `}>
            <InputGroup.Text>Imagen - 3</InputGroup.Text>
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
            <Button className={style.styleButton} variant="success" type='submit'>Guardar</Button>
            {/* <Button className={style.styleButton} as={Link} to='/home' variant="primary">V</Button> */}
          </div>
          {/* <Alert key='success' variant='success' show={showSuccessMessage}>
            El producto se ha agregado correctamente.
          </Alert> */}
        </form>
      </div>
    </div>
  );
};
