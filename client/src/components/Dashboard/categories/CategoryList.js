import React from "react";
// import { Link } from 'react-router-dom';
import {
  List,
  DatagridConfigurable,
  TextField, 
  EditButton,
} from "react-admin";

 
const CategoryList = (props) => {
  return (
    <List {...props}>
      <DatagridConfigurable>
        <TextField source="id" label="Id Categoria"/>
        <TextField source="name" label="Nombre"/>
        <EditButton basepath="/category" label="Editar"/>
      </DatagridConfigurable>
    </List>
  );
};


export default CategoryList;
