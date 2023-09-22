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
  TextInput,
  TextField,
  EditButton,
  Button,
  useRecordContext,
  DeleteButton,
  SortButton,
  FilterButton,
  BooleanInput,
  BooleanField,
  SearchInput,
} from "react-admin";
// import { EditDialog } from '@react-admin/ra-form-layout';
import ToggleAvailableButton from "./ToggleAvailableButton";
import style from "./ProductsList.module.css";
import { Chip } from "@mui/material";
import { useTranslate } from "react-admin";

const ListActions = () => (
  <TopToolbar>
    <SelectColumnsButton />
    <FilterButton />
    <SortButton fields={['price']} />
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
        <div className={style.container}>
          <div  className={style.containerDetalles}>
            <span className={style.h6} > ID: </span>
            <span className={style.textF}> <TextField source="id" style={{ fontSize: "1rem" }} /> </span> 

            <span className={style.h6} > MARCA:</span> 
            <span className={style.textF}><TextField source="brand" style={{ fontSize: "1rem" }} /> </span>
            
            <span className={style.h6} > NOMBRE: </span>
            <span className={style.textF}><TextField source="name" style={{ fontSize: "1rem" }} /> </span>

            <span className={style.h6} > PRECIO: </span>
            <span className={style.textF}><TextField source="price" style={{ fontSize: "1rem" }} /> </span>

            <span className={style.h6} > ESTATUS: </span> 
            <span className={style.textF}><TextField source="available" style={{ fontSize: "1rem" }} /></span>
            
            <span className={style.h6} > FECHA EXP: </span> 
            <span className={style.textF}><DateField source="expirationdate" style={{ fontSize: "1rem" }} /></span>
            
            <span className={style.h6} > DESCRIPCIÓN: </span>
            <span className={style.textF}><TextField source="description" /> </span>


            <span className={style.h6} > DESCUENTO: </span>
            <span className={style.textF}><TextField source="discount" /> </span>
            {/* <Button onClick={test}> test</Button> */}
          </div>
          
          <div className={style.containerI}>
            
            <ImageField
            source="image" className={style.img}
            sx={{
              "& img": { maxWidth: '100%', maxHeight: '100%', objectFit: "contain" },
            }}
            />
        </div>
      </div>
    </SimpleShowLayout>
  </Show>
);

const ProductsList = (props) => {
  // console.log("🚀 ~ file: ProductsList.js:131 ~ ProductsList ~ props:", props.data)
  //Este es el que muestra las ciudades
  return (
    <List {...props} actions={<ListActions />} filters={productFilters}>
      <DatagridConfigurable>
        <TextField source="id" />
        <TextField source="brand" />
        <TextField source="name" sortByOrder="DESC" />
        {/* <TextField source="description" /> */}
        <TextField source="price" />
        <ToggleAvailableButton source="Disponibilidad" />
        <ImageField
          source="image"
          sx={{
            "& img": { maxWidth: 40, maxHeight: 40, objectFit: "contain" },
          }}
        />
        {/* <DateField source="created_at" /> */}
        <EditButton basepath="/products" />
        <ShowButton basepath="/products" />
        {/* <DeleteButton basePath="/products" />  */}
      </DatagridConfigurable>
    </List>
  );
};

export { ProductsList, DetailShow };
