import { Button, Form, InputGroup, Modal } from 'react-bootstrap'
import style from './ProductForm.module.css'
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { validation } from './validation';
import { PiWarning } from 'react-icons/pi'
import axios from 'axios'

const URL = 'http://localhost:3001'


export default function ProductForm(){

  const [showErrorModal, setShowErrorModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '', 
    price: '', 
    description: '', 
    image: '', 
    stock: '', 
    brand: '', 
    expirationdate:null, 
    categories: '', 
  });

  const [formErrors, setFormErrors] = useState({
    name: '', 
    price: '', 
    description: '', 
    image: '', 
    stock: '', 
    brand: '', 
    expirationdate: '', 
    categories: '', 
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    const fieldErrors = validation({ ...formData, [name]: value });
  setFormErrors({ ...formErrors, [name]: fieldErrors[name] });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const fieldErrors = validation(formData);
    setFormErrors(fieldErrors);
    const hasErrors = Object.values(fieldErrors).some((error) => !!error);
  
    if (!hasErrors) {
      try {
        const response = await axios.post(`${URL}/product`,{
          name: formData.name, 
          price: formData.price, 
          description: formData.description, 
          image: formData.image, 
          stock: formData.stock, 
          brand: formData.stock, 
          expirationdate:formData.expirationdate, 
          categories: formData.categories, 
        });
        if (response.status === 201) {
          console.log('Producto agregado con éxito:', response.data);
          
        } else {
          setShowErrorModal(true); 
        }
      } catch (error) {
        console.error('Error al agregar el producto:', error);
        setShowErrorModal(true);
      }
    } else {
      setShowErrorModal(true);
    }
  };

    return(
        <div className={style.container}>
          <div className={style.formContainer}>
          <h1>Agrega un producto</h1>

    <Form onSubmit={handleSubmit}>

       {formErrors.name && (
          <span className={style.errorMessage}><PiWarning/> {formErrors.name}</span>
        )}
      <InputGroup className={`mb-3 ${formErrors.name && style.error}`}>
        <InputGroup.Text id="basic-addon1">Nombre </InputGroup.Text>
        <Form.Control
          placeholder="Escribe el nombre del producto"
          aria-label="Username"
          aria-describedby="basic-addon1"
          name='name'
          value={formData.name}
          onChange={handleChange}
        />
      </InputGroup>

      {formErrors.price && (
          <span className={style.errorMessage}><PiWarning/> {formErrors.price}</span>
        )}
      <InputGroup className={`mb-3 ${formErrors.price && style.error}`}>
      <InputGroup.Text>Precio</InputGroup.Text>
        <InputGroup.Text>$</InputGroup.Text>
        <Form.Control 
          type="number"
          name="price"
          aria-label="Precio" 
          placeholder='Escribe el precio del producto'
          value={formData.price}
          onChange={handleChange}
          />
      </InputGroup>

      {formErrors.description && (
          <span className={style.errorMessage}><PiWarning/> {formErrors.description}</span>
        )}
      <InputGroup className={`mb-3 ${formErrors.description && style.error}`}>
        <InputGroup.Text>Descripción del producto</InputGroup.Text>
        <Form.Control 
          as="textarea" 
          aria-label="With textarea" 
          name="description"
          placeholder='Escribe una descripción del producto'
          value={formData.description}
          onChange={handleChange}
          />
      </InputGroup>

      {formErrors.stock && (
          <span className={style.errorMessage}><PiWarning/> {formErrors.stock}</span>
        )}
      <InputGroup className={`mb-3 ${formErrors.stock && style.error}`}>
        <InputGroup.Text id="basic-addon1">Stock </InputGroup.Text>
        <Form.Control
          type="number"
          placeholder="Escribe la cantidad en stock del producto"
          aria-label="Stock"
          aria-describedby="basic-addon1"
          name='stock'
          value={formData.stock}
          onChange={handleChange}
        />
      </InputGroup>

      {formErrors.brand && (
          <span className={style.errorMessage}><PiWarning/> {formErrors.brand}</span>
        )}
      <InputGroup className={`mb-3 ${formErrors.brand && style.error}`}>
      <InputGroup.Text>Marca</InputGroup.Text>
        <Form.Control 
          aria-label="Brand" 
          placeholder='Escribe la marca del producto'
          name='brand'
          value={formData.brand}
          onChange={handleChange}
          />
      </InputGroup>

      <InputGroup className='mb-3'>
        <InputGroup.Text>Fecha de vencimiento</InputGroup.Text>
        <DatePicker
          selected={formData.expirationdate}
          onChange={(date) => setFormData({ ...formData, expirationdate: date })}
          dateFormat="dd/MM/yyyy"
          placeholderText="dd/mm/aaaa"
          className={style.dateInput}
        />
      </InputGroup>

      {formErrors.categories && (
          <span className={style.errorMessage}><PiWarning/> {formErrors.categories}</span>
        )}
      <InputGroup className={`mb-3 ${formErrors.categories && style.error}`}>
      <InputGroup.Text>Categorias</InputGroup.Text>
        <Form.Control 
          aria-label="Categories" 
          placeholder='En que categorias se encuentra el producto'
          name='categories'
          value={formData.categories}
          onChange={handleChange}
          />
      </InputGroup>
      
      {formErrors.image && (
          <span className={style.errorMessage}><PiWarning/> {formErrors.image}</span>
        )}
      <Form.Group controlId="formFile" className={`mb-3 ${formErrors.image && style.error}`}>
        <Form.Label>Imagen</Form.Label>
        <Form.Control 
        type="file"
        name='image'
         />
      </Form.Group>
      <Button variant="success" type='submit'>Agregar producto</Button>
    </Form>
    <Modal
        size="lg"
        show={showErrorModal}
        onHide={() => setShowErrorModal(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            ERROR <PiWarning/>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>Hubo un error al crear el producto. Verifica todos los campos y vuelve a intentarlo.</Modal.Body>
      </Modal>
    {showErrorModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowErrorModal(false)}>
              &times;
            </span>
            
          </div>
        </div>
      )}
    </div>
        </div>
    );
}