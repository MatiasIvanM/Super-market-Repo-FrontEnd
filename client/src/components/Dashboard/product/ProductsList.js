import React from 'react'
import { List, Datagrid, DateField, ImageField, CreateButton,
  DatagridConfigurable, ExportButton, FilterButton, SelectColumnsButton,
  TopToolbar, TextInput, TextField, EmailField, EditButton, DeleteButton, 
  SimpleForm, NumberInput, Edit, ReferenceInput, ReferenceManyInput, 
  SimpleFormIterator, sizes, SelectInput, colors, SortButton, required  
} from 'react-admin';
// import { EditDialog } from '@react-admin/ra-form-layout';

import IconEvent from '@mui/icons-material/Event';

const ListActions = () => (
  <TopToolbar>
      <SelectColumnsButton />
      <FilterButton/>
      <SortButton fields={['price']} />
      <CreateButton/>
      <ExportButton/>

  </TopToolbar>
);

const productFilters = [
  <TextInput label="Search" source="name" alwaysOn />,
  <TextInput label="categories" source="categories" defaultValue="" />,
];

const ProductsList = (props) => {  //Este es el que muestra las ciudades
  return (
    <List {...props}  actions={<ListActions/>} filters={productFilters}>
        <DatagridConfigurable>      
          <TextField source="id" />
          <TextField source="brand" />
          <TextField source="name" />
          {/* <TextField source="description" /> */}
          <TextField source="price" />
          <TextField source="available" />
          {/* <ImageField source="image" sx= {{ '& img': { maxWidth: 50, maxHeight: 50, objectFit: 'contain' } } } /> */}
          {/* <DateField source="created_at" /> */}
          <EditButton basePath="/products" />
          <DeleteButton basePath="/products" />
        </DatagridConfigurable>
    </List>
    );
}

export default  ProductsList