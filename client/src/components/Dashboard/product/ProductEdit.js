import React from 'react'
import { Edit, TextInput, FileInput, SimpleForm, NumberInput, FileField, DateInput  } from 'react-admin';


const ProductEdit = (props) => {  //Este es el que muestra las ciudades
  return (
    <Edit {...props}  title="Edit a Product" >
       <SimpleForm>
          <TextInput disabled source="id" />
          <TextInput source="name" required />
          <TextInput multiline source="description" required/>
          <TextInput source="brand" required />
          <NumberInput source="stock" />
          <NumberInput source="price" step="0.01" required />
          <DateInput source = "expirationdate" />
          <FileInput source="image" label="Image" accept="image/*">
            <FileField source="src" title="title" />
          </FileInput>
       </SimpleForm>
    </Edit>
    );
}

export default ProductEdit;


