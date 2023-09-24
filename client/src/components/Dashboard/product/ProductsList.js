import React from "react";
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
  TextField,
  EditButton,
  SortButton,
  FilterButton,
  SearchInput,
} from "react-admin";
// import { EditDialog } from '@react-admin/ra-form-layout';
import ToggleAvailableButton from "./ToggleAvailableButton";
import style from "./ProductsList.module.css";
import { Chip } from "@mui/material";
import { useTranslate } from "react-admin";
import { Card, ListGroup } from 'react-bootstrap'

const ListActions = () => (
  <TopToolbar>
    <SelectColumnsButton />
    <FilterButton />
    <SortButton fields={["price"]} />
    <CreateButton />
    <ExportButton />
  </TopToolbar>
);

const QuickFilter = ({ label }) => {
  const translate = useTranslate();
  return <Chip sx={{ marginBottom: 1 }} label={translate(label)} />;
};

const productFilters = [
  <SearchInput source="name" alwaysOn />,
  <QuickFilter
    source="Disponibilidad"
    label="Disponibilidad"
    defaultValue="Disponible"
  />,
  <QuickFilter source="Categoria" label="Categoria" defaultValue="Bebidas" />,
  // <QuickFilter source="tags" label="Tagged Code" defaultValue={[3]} />,
];

// const productFilters = [
//   <SearchInput source="name" alwaysOn />,
//   // <TextInput label="Search" source="name" alwaysOn />,
//   <TextInput label="categories" source="categories" defaultValue="" />,
// ];

// const test=()=>{
//       console.log(props);
// }

const DetailShow = (props) => (
  <Show {...props} title="Detalle de Producto:">
    {console.log(props)}
    <SimpleShowLayout>
      {/* <h3>  </h3> */}
      <div className={style.titleContainer}> 
              <h1>Detalle del producto</h1>
            </div>
        <div className={style.container}> 
          <Card className={style.detailContainer}>
          <hr/>
          <Card.Title className={style.productImage}>
            <ImageField className={style.image}
              source="image"
              // sx={{
              // "& img": { maxWidth: '100%', maxHeight: '100%', objectFit: "contain" },
              // }}
            />
          </Card.Title>
        </Card>
          <Card className={style.productInfoContainer}>
          {/* <div > */}
            <Card.Body className={style.productInfo}>
            <ListGroup className="list-group-flush">
              <ListGroup.Item><span>ID: </span><TextField source="id" style={{ fontSize: "1rem" }} /></ListGroup.Item>
              <ListGroup.Item><span>MARCA:</span><TextField source="brand" style={{ fontSize: "1rem" }} /></ListGroup.Item>
              <ListGroup.Item><span>NOMBRE: </span><TextField source="name" style={{ fontSize: "1rem" }} /></ListGroup.Item>
              <ListGroup.Item><span>PRECIO: </span> <TextField source="price" style={{ fontSize: "1rem" }} /></ListGroup.Item>
              <ListGroup.Item><span>ESTATUS: </span><TextField source="available" style={{ fontSize: "1rem" }} /></ListGroup.Item>
              <ListGroup.Item><span>FECHA EXP: </span> <DateField source="expirationdate" style={{ fontSize: "1rem" }} /></ListGroup.Item>
              <ListGroup.Item><span>DESCRIPCIÓN: </span><TextField source="description" /></ListGroup.Item>
              <ListGroup.Item><span>DESCUENTO: </span><TextField source="discount" /></ListGroup.Item>
            </ListGroup>
            </Card.Body>
          {/* </div> */}
        </Card> 
      </div>
    </SimpleShowLayout>
  </Show>
);

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
        <TextField source="name" sortByOrder="DESC" />
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
