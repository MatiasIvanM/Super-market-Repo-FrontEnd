import React from 'react'
import { Create, TextInput, FileInput, SimpleForm, NumberInput, FileField, DateInput  } from 'react-admin';
 
const ProductCreate = (props) => { 
  return (
    <Create {...props}  title="Add a Product" >
       <SimpleForm>
          <TextInput source="name" required/>
          <TextInput multiline source="description" required />
          <TextInput source="brand" required/>
          <NumberInput source="stock"  required/>
          <NumberInput source="price" step="0.01"  required/>
          <DateInput source = "expirationdate"  required/>
          <FileInput source="image" label="Image" accept="image/*">
            <FileField source="src" title="title" required />
          </FileInput>
       </SimpleForm>
    </Create>
    );
}

export default ProductCreate;


