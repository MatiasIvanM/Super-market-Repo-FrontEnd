import {
  TabbedForm, 
  DateInput,
  NumberInput,Show, TabbedShowLayout 
} from "react-admin";
import { Button, InputGroup, Form, Alert } from 'react-bootstrap'
import formCarrousel from "./carrousel/formCarrousel";

const currentDate = new Date();

const Setting = () => (

    <TabbedForm>
      <TabbedForm.Tab label="carrousel" sx={{ maxWidth: '40em' }} >
        <h4> Imágenes del Carrusel </h4>
        <InputGroup className={`mb-3 `}>
          <InputGroup.Text>Imagen - 1</InputGroup.Text>
          <Form.Control
            aria-label="Image"
            placeholder='Agrega una imagen del producto'
            name='image1'
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
            name='image2'
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
            name='image3'
            type="file"
              //   {...register('image', {
              //     required: true,
              //     maxLength: 249
              //   })}
              />
        </InputGroup>
      </TabbedForm.Tab>
      <TabbedForm.Tab label="dolar" sx={{ maxWidth: '40em' }}>
        <NumberInput source="dolar" step="0.01" required />
        <DateInput source="hoy" defaultValue={currentDate} disabled />
      </TabbedForm.Tab>
    </TabbedForm>
);

export default Setting;
