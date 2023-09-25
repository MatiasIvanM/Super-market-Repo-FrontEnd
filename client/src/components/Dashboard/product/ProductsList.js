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
