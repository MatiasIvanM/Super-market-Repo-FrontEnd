import React from "react";
import {
  Edit,
  TextInput,
  FileInput,
  SimpleForm,
  NumberInput,
  FileField,
  DateInput,
  SelectInput,
  ImageField,SaveButton, DeleteButton, Toolbar
} from "react-admin";
import { useHistory, Link } from 'react-router-dom';
import { useState } from 'react';
import { Card, ListGroup, Button, Modal, Col, Container, Row }from 'react-bootstrap';

const MyToolbar = () => (
  <Toolbar>
      <SaveButton type="button" label="Guardar" />
      {/* <DeleteButton   label="Borrars"/> */}
  </Toolbar>
);

const ProductEdit = (props) => {
    
  const [showModal, setShowModal] = useState(true);
  const history = useHistory();

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    history.goBack();
  };
  return (
    <>
    <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Body>
      <Edit {...props} title="Editor de Productos">
      <SimpleForm toolbar={<MyToolbar/>}>
        <Container>
        <TextInput disabled source="id" />
          <Row>
          <Col xs={12} md={6}>
            <TextInput source="name" label="Nombre" required />
          </Col>
          <Col xs={12} md={6}>
            <TextInput source="brand" label="Marca" required />
          </Col>
          </Row>
          <Row>
            <Col xs={12} md={6}>
              <TextInput
                multiline
                source="description"
                label="Descripcion"
                required
              />
            </Col>
            <Col xs={12} md={6}>
              <NumberInput source="stock" label="Inventario" required />
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={6}>
              <NumberInput source="price" step="0.01" label="Precio" required />
            </Col>
            <Col xs={12} md={6}>
              <NumberInput source="discount" step="0.01" label="DESCUENTO" required />
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={6}>
              <DateInput source="expirationdate" label="Ingreso a Deposito" />
            </Col>
            <Col xs={12} md={6}>
              <SelectInput
                source="available"
                label="Disponible"
                choices={[
                  { id: "true", name: "Si" },
                  { id: "false", name: "No" },
                ]}
              />
            </Col>
          </Row>
          {/* <Row>
      
            <Col xs={12} md={6}>
              <SelectInput
                source="Categories[0].name"
                label="Categoria"
                choices={[
                  { name : "Higiene Personal"},
                  { name : "Aceites"},
                  { name : "Carnes"},
                  { name : "Frutas"},
                  { name : "Latas y Conservas"},
                  { name : "Verduras"},
                  { name : "Arroz y Legumbres"},
                  { name : "Panaderia"} 
                 ]}

              />
            </Col>
          </Row> */}
          <Row>
            <Col xs={12} md={6}>
              <ImageField
                source="image"
                sx={{
                  "& img": { maxWidth: 240, maxHeight: 240, objectFit: "contain" },
                }}
              />
            </Col>
            <Col xs={12} md={6}>
              <TextInput source="image" label="Imagen" accept="image/*">
                <TextInput source="src" title="title" />
              </TextInput>
            </Col>
          </Row>
    </Container>
      </SimpleForm>
    </Edit>
      </Modal.Body>
      <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
                Cancelar
            </Button>
          </Modal.Footer>
    </Modal>
    
    </>
    );
};

export default ProductEdit;
