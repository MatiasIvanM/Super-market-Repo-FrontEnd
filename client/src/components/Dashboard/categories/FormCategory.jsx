import { useState } from "react";
import React from "react";
import { useDispatch } from "react-redux";
import { Button, Alert } from "react-bootstrap";

import style from './FormCategory.module.css';
import { addCategory } from "../../../redux/Actions/actionsCategory";


export default function FormCategory() {
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    name: "",
  });

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const submitHandler = (event) => {
    if (form.name === "") {
      event.preventDefault();
      alert("Complete los Campos Vacios");
    } else {
      dispatch(addCategory(form));
    }
  };
  const changeHandler = (event) => {
    const property = event.target.name;
    const value = event.target.value;

    setForm({ ...form, [property]: value });
  };

  return (
    <div className={style.container} >
      <div>
        <h1>Crear Categoria</h1>
        <form onSubmit={submitHandler} className={style.form} >
          <div>
            <label htmlFor="name" > Nombre de la categoria: </label>
            <div>
              <input type="text" id="name" name="name" value={form.name} onChange={changeHandler}
                className={style.input} />
            </div>
            {/* {<small> {errores.name} </small>} */}
          </div>

          <div>
            <Button variant="success" type="submit">
              Agregar Categoria
            </Button>
          </div>
          <Alert key="success" variant="success" show={showSuccessMessage}>
            Categoria se ha agregado correctamente.
          </Alert>
        </form>
      </div>
    </div>
  );
}
