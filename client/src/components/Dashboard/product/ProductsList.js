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
  TextField, TextInput, BooleanInput,
  EditButton,
  SortButton,
  FilterButton,
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
];

const DetailShow = (props) => { 
  
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
        <EditButton basepath="/products" />
        <ShowButton basepath="/products" />
      </DatagridConfigurable>
    </List>
  );
};


export { ProductsList, DetailShow };
