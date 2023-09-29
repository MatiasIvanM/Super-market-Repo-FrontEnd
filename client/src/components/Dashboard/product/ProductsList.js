import React, { useState, useEffect } from 'react';
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

import { useDispatch, useSelector } from "react-redux";

import ToggleAvailableButton from "./ToggleAvailableButton";
import style from "./ProductsList.module.css";
import { useHistory } from 'react-router-dom';

import { Card, ListGroup, Button, Modal }from 'react-bootstrap';
import { selectCategory } from '../../../redux/Actions/actionsCategory';
// import { selectCategory } from '../../redux/Actions/actionsCategory';

const ListActions = () => (
  <TopToolbar>
      <SelectColumnsButton />
      <FilterButton />
      <CreateButton label="Crear Producto"/>
      <ExportButton label="Exportar"/>
  </TopToolbar>
);

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
    {/* {console.log(props)} */}
    <SimpleShowLayout>
      <div className={style.titleContainer}> 
              <h1>Detalle del Producto</h1>
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

  const dispatch = useDispatch();
  let categories = useSelector((state) => state.category)
  // const [catego, setCatego] = useState([]);
  let categorias = categories.map(value => ({ id: value.id, name: value.name }));
  
  useEffect(() =>{
    dispatch(selectCategory())
  }, [])

  // console.log(categorias)

  const productFilters = [
    <TextInput label="Nombre" source="name" defaultValue=""/>,  
    <SelectInput label="Categorias" source="categories" defaultValue="" choices={categorias} />
  ];
  return (
    <List
      {...props}
      actions={<ListActions />}
      filters={productFilters}
      // pagination={<CustomPagination />}
    >
      <DatagridConfigurable>
        <TextField label="Id" source="id" />
        <TextField label="Marca" source="brand" />
        <TextField label="Nombre" source="name" />
        <TextField label="Precio" source="price" />
        <TextField label="Descuento" source="discount" />
        <ToggleAvailableButton source="Disponibilidad" />
        <ImageField label="Imagen"
          source="image"
          sx={{
            "& img": { maxWidth: 40, maxHeight: 40, objectFit: "contain" },
          }}
        />
          <TextField source="Categories[0].name" label="Categoria" />
        <EditButton basepath="/products" label="Editar"/>
        <ShowButton basepath="/products" label="Detalle" />
      </DatagridConfigurable>
    </List>
  );
};


export { ProductsList, DetailShow };
