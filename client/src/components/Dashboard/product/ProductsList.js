import React from "react";
import { Link } from 'react-router-dom';
import {
  List,
  CreateButton,
  ImageField,
  Show,
  ShowButton,
  DateField,
  DatagridConfigurable,
  ExportButton,
  SelectColumnsButton,
  SimpleShowLayout,
  TopToolbar,
  TextField, TextInput, BooleanInput,SelectField,
  EditButton,
  SortButton,
  FilterButton,
  SelectInput,
} from "react-admin";

import ToggleAvailableButton from "./ToggleAvailableButton";
import style from "./ProductsList.module.css";
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import { Card, ListGroup, Button, Modal }from 'react-bootstrap';



const ListActions = () => (
  <TopToolbar>
      <SelectColumnsButton />
      <FilterButton/>
      <CreateButton/>
      <ExportButton/>
  </TopToolbar>
);

const productFilters = [

  <TextInput label="name" source="name" defaultValue=""/>,
  // <TextInput label="categories" source="categories.name" defaultValue=""/>,
  <SelectInput source="categories" defaultValue="" choices={[
    {id : "ebcfaa8f-f97b-4510-b09e-5da957c3b406", name: "Aceites" },
    {id : "59a5fffc-e0c4-45a2-8268-1a76ef84d096", name: "Arroz y Legumbres" },
    {id : "b7003d88-0c21-4530-9c2d-7eee4cb24396", name: "Carnes" },
    {id : "5ebe2935-7f8b-459f-9e82-49e85ec4eba9", name: "Frutas" },
    {id : "7ef4f7fc-2d60-47a1-bd06-7dcf0b9b1438", name: "Higiene Personal" },
    {id : "9706acd7-9b10-49b0-9cb7-68cc86659c9a", name: "Gaseosas" },
    {id : "54fbd1de-c317-4e5f-bbca-c0810f825c21", name: "Golosinas" },
    {id : "2a696b61-8e3e-4d3d-bde9-2381c4fa08a5", name: "Latas y Conservas"},
    {id : "aae85617-55d5-45b8-b653-081d2a383fff", name: "Licores" },
    {id : "da0b0d58-41ee-46f6-98d0-d7a706b1d02a", name: "Panaderia" },
    {id : "648686ee-b8b9-4923-86b2-5dce36c7985d", name: "Verduras" },
]} />
];

const DetailShow = (props) => { 
  
  const  [showModal, setShowModal] = useState(true);
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
    <Show {...props} title="Detalle de Producto:">
    {console.log(props)}
    <SimpleShowLayout>
      <div className={style.titleContainer}> 
              <h1>Detalle del producto</h1>
            </div>
        <div className={style.container}> 
          <Card className={style.detailContainer}>
          
          <Card.Title >
          <div className={style.productImageContainer}>
            <ImageField source="image" />
          </div>
          </Card.Title>
        </Card>
          <Card className={style.productInfoContainer}>
            <Card.Body className={style.productInfo}>
            <ListGroup className="list-group-flush">
              <ListGroup.Item><span>ID: </span><TextField source="id" style={{ fontSize: "1rem" }} /></ListGroup.Item>
              <ListGroup.Item><span>MARCA:</span><TextField source="brand" style={{ fontSize: "1rem" }} /></ListGroup.Item>
              <ListGroup.Item><span>NOMBRE: </span><TextField source="name" style={{ fontSize: "1rem" }} /></ListGroup.Item>
              <ListGroup.Item><span>PRECIO: </span> <TextField source="price" style={{ fontSize: "1rem" }} /></ListGroup.Item>
              <ListGroup.Item><span>ESTATUS: </span><TextField source="available" style={{ fontSize: "1rem" }} /></ListGroup.Item>
              <ListGroup.Item><span>FECHA EXP: </span> <DateField source="expirationdate" style={{ fontSize: "1rem" }} /></ListGroup.Item>
              <ListGroup.Item><span>DESCRIPCIÓN: </span><TextField source="description" style={{ fontSize: "1rem" }}/></ListGroup.Item>
              <ListGroup.Item><span>DESCUENTO: </span><TextField source="discount" style={{ fontSize: "1rem" }}/>%</ListGroup.Item>
            </ListGroup>
            </Card.Body>
        </Card> 
      </div>
    </SimpleShowLayout>
  </Show>
    </Modal.Body>
    <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Cerrar
            </Button>
          </Modal.Footer>
  </Modal>
  
  </>
  )
};
 
const ProductsList = (props) => {
  return (
    <List
      {...props}
      actions={<ListActions />}
      filters={productFilters}
      // pagination={<CustomPagination />}
    >
      <DatagridConfigurable>
        <TextField source="id" />
        <TextField source="brand" />
        <TextField source="name" />
        <TextField source="price" />
        <ToggleAvailableButton source="Disponibilidad" />
        <ImageField
          source="image"
          sx={{
            "& img": { maxWidth: 40, maxHeight: 40, objectFit: "contain" },
          }}
        />
          <TextField source="Categories[0].name" label="Categoria" />
        <EditButton basepath="/products" />
        <ShowButton basepath="/products" />
      </DatagridConfigurable>
    </List>
  );
};


export { ProductsList, DetailShow };
