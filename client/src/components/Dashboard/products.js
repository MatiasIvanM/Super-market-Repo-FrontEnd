import React from 'react'
import { List, Datagrid, DateField, ImageField, CreateButton,
  DatagridConfigurable, ExportButton, FilterButton, SelectColumnsButton,
  TopToolbar, TextInput, TextField, EmailField, 
  SimpleForm, NumberInput, Edit, ReferenceInput, ReferenceManyInput, 
  SimpleFormIterator, sizes, SelectInput, colors, SortButton, required  
} from 'react-admin';
// import { EditDialog } from '@react-admin/ra-form-layout';

import IconEvent from '@mui/icons-material/Event';

const ListActions = () => (
  <TopToolbar>
      <SelectColumnsButton />
      <FilterButton/>
      <SortButton fields={['price', 'stock']} />
      <CreateButton/>
      <ExportButton/>

  </TopToolbar>
);

const productFilters = [
  <TextInput label="Search" source="name" alwaysOn />,
  <TextInput label="categories" source="categories" defaultValue="" />,
];

const ProductList = (props) => {  //Este es el que muestra las ciudades
  return (
    <>
    <List {...props}  actions={<ListActions/>} filters={productFilters}>
        <DatagridConfigurable>      
          {/* <TextField source="id" /> */}
          <TextField source="brand" />
          <TextField source="name" />
          {/* <TextField source="description" /> */}
          <TextField source="price" />
          <TextField source="available" />
          {/* <ImageField source="image" sx= {{ '& img': { maxWidth: 50, maxHeight: 50, objectFit: 'contain' } } } /> */}
          {/* <DateField source="created_at" /> */}
        </DatagridConfigurable>

    </List>
     {/* <EditDialog> */}
     <Edit>
      <SimpleForm>
          <TextInput source="name" validate={required()} />
          <TextInput source="brand" validate={required()} />
      </SimpleForm>
     </Edit>
     {/* </EditDialog> */}
    </>
    );
}

const PostProduct = (props) => {  //Este es el que muestra las ciudades
  return (
    <List {...props}  actions={<ListActions/>} filters={productFilters}>
        <DatagridConfigurable>      
          <TextField source="idCountry" />
          <TextField source="name" />
          <TextField source="capital" />
          <ImageField source="flags" sx= {{ '& img': { maxWidth: 50, maxHeight: 50, objectFit: 'contain' } } } />
          <DateField source="created_at" />
        </DatagridConfigurable>
    </List>
    );
}

const EditProduct = (props) => {  //Este es el que muestra las ciudades
  return (
        <Edit mutationMode="optimistic">
          <SimpleForm>
              <TextInput source="name" />
              <NumberInput source="price" />
               <ReferenceInput source="category_id" reference="categories" />
   
                  <SimpleFormIterator inline>
                      <TextInput source="sku" />
                      {/* <SelectInput source="size" choices={sizes} /> */}
                      {/* <SelectInput source="color" choices={colors} /> */}
                      <NumberInput source="stock" defaultValue={0} />
                  </SimpleFormIterator>
              {/* </ReferenceManyInput> */}
          </SimpleForm>
        </Edit>
    );
}

export { ProductList, PostProduct, EditProduct}


           //// <ReferenceManyInput reference="variants" target="product_id"> */}