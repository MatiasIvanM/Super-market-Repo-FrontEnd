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
    { id : "1063e28b-440e-49b1-b9c6-c523c92c9200", name : "Aceites"},
    { id : "51fbdb20-39f8-4c55-859c-de06b8eb761e", name : "Carnes"},
    { id : "bd4c3146-4944-440f-852c-2fdb445399fa", name : "Frutas"},
    { id : "983c1fe2-0e28-472c-9aaf-9924e758a16a", name : "Higiene personal"},
    { id : "9bdaf277-b913-4bad-a4b7-719e4afc14a8", name : "Latas y Conservas"},
    { id : "c567da8b-56b4-4e3a-a266-4308c09fa5bb", name : "Verduras" },
]} />
];

const DetailShow = (props) => (

  <Show {...props} title="Detalle de Producto:">
    <SimpleShowLayout>
      {/* <h3>  </h3> */}
      <div className={style.container}>
        <div className={style.containerDetalles}>
          <span className={style.h6}> ID: </span>
          <span className={style.textF}>
            {" "}
            <TextField source="id" style={{ fontSize: "1rem" }} />{" "}
          </span>

          <span className={style.h6}> MARCA:</span>
          <span className={style.textF}>
            <TextField source="brand" style={{ fontSize: "1rem" }} />{" "}
          </span>

          <span className={style.h6}> NOMBRE: </span>
          <span className={style.textF}>
            <TextField source="name" style={{ fontSize: "1rem" }} />{" "}
          </span>

          <span className={style.h6}> PRECIO: </span>
          <span className={style.textF}>
            <TextField source="price" style={{ fontSize: "1rem" }} />{" "}
          </span>

          <span className={style.h6}> ESTATUS: </span>
          <span className={style.textF}>
            <TextField source="available" style={{ fontSize: "1rem" }} />
          </span>

          <span className={style.h6}> FECHA EXP: </span>
          <span className={style.textF}>
            <DateField source="expirationdate" style={{ fontSize: "1rem" }} />
          </span>

          <span className={style.h6}> DESCRIPCIÓN: </span>
          <span className={style.textF}>
            <TextField source="description" />{" "}
          </span>
        </div>

        <div className={style.containerI}>
          <ImageField
            source="image"
            className={style.img}
            sx={{
              "& img": {
                maxWidth: "100%",
                maxHeight: "100%",
                objectFit: "contain",
              },
            }}
          />
        </div>
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
