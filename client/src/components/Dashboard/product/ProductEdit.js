import React from 'react'
import { Edit, TextInput, FileInput, SimpleForm, NumberInput, FileField, DateInput, required, Edit  } from 'react-admin';


const ProductEdit = (props) => {  //Este es el que muestra las ciudades
  return (
    <Edit {...props}  title="Edit a Product" >
       <SimpleForm>
          <TextInput disabled source="id" />
          <TextInput source="name" />
          <TextInput multiline source="description" />
          <TextInput source="brand" />
          <NumberInput source="stock" />
          <NumberInput source="price" step="0.01" />
          <DateInput source = "expirationdate" />
          <FileInput source="image" label="Image" accept="image/*">
            <FileField source="src" title="title" />
          </FileInput>
       </SimpleForm>
    </Edit>
    );
}

export default ProductEdit;
