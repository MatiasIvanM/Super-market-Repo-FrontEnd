import React from "react";
// import { Link } from 'react-router-dom';
import {
  List,
  DatagridConfigurable,
  TextField, 
  EditButton,
  TopToolbar,
  CreateButton
} from "react-admin";

const ListActions = () => (
  <TopToolbar>
      <CreateButton label="Crear Categoria"/>
  </TopToolbar>
);

 
const CategoryList = (props) => {
  return (
    <List {...props}
    actions={<ListActions />}>
      <DatagridConfigurable>
        <TextField source="id" label="Id Categoria"/>
        <TextField source="name" label="Nombre"/>
        <EditButton basepath="/category" label="Editar"/>
      </DatagridConfigurable>
    </List>
  );
};


export default CategoryList;
