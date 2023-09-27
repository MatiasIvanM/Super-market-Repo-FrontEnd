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
  ImageField,
} from "react-admin";
import { useHistory, Link } from 'react-router-dom';
import { useState } from 'react';
import { Card, ListGroup, Button, Modal, Col, Container, Row }from 'react-bootstrap';


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
      <SimpleForm>
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
          <Row>
      
            <Col xs={12} md={6}>
              <SelectInput
                source="categories"
                label="Categoria"
                choices={[
                  { id : "7ef4f7fc-2d60-47a1-bd06-7dcf0b9b1438", name : "Higiene Personal"},
                  { id : "ebcfaa8f-f97b-4510-b09e-5da957c3b406", name : "Aceites"},
                  { id : "b7003d88-0c21-4530-9c2d-7eee4cb24396", name : "Carnes"},
                  { id : "5ebe2935-7f8b-459f-9e82-49e85ec4eba9", name : "Frutas"},
                  { id : "2a696b61-8e3e-4d3d-bde9-2381c4fa08a5", name : "Latas y Conservas"},
                  { id : "648686ee-b8b9-4923-86b2-5dce36c7985d", name : "Verduras"},
                  { id : "59a5fffc-e0c4-45a2-8268-1a76ef84d096", name : "Arroz y Legumbres"},
                  { id : "da0b0d58-41ee-46f6-98d0-d7a706b1d02a", name : "Panaderia"} 
                 ]}
              />
            </Col>
          </Row>
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
              <FileInput source="image" label="Image" accept="image/*">
                <FileField source="src" title="title" />
              </FileInput>
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
