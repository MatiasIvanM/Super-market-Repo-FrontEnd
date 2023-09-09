import React from 'react'
import { List, CreateButton,
  // DateField, ImageField, 
  DatagridConfigurable, ExportButton, FilterButton, SelectColumnsButton,
  TopToolbar, TextInput, TextField, 
  // EditButton, DeleteButton, 
   SortButton  
} from 'react-admin';
// import { EditDialog } from '@react-admin/ra-form-layout';


<<<<<<< HEAD
=======
import IconEvent from '@mui/icons-material/Event';
>>>>>>> eaa7c371dea69b70cd0f134bcbb7c24669ed72a4

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
<<<<<<< HEAD
          {/* <EditButton basePath="/products" />
          <DeleteButton basePath="/products" /> */}
=======
          {/*<EditButton basePath="/products" />*/}
          {/*<DeleteButton basePath="/products" />*/}
>>>>>>> eaa7c371dea69b70cd0f134bcbb7c24669ed72a4
        </DatagridConfigurable>
    </List>
    );
}

export default  ProductsList
