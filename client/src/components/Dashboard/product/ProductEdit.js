import React from "react";
import {
  Edit,
  TextInput,
  FileInput,
  SimpleForm,
  NumberInput,
  FileField,
  DateInput,
  SelectInput,
  ImageField,
} from "react-admin";

const ProductEdit = (props) => {
  return (
    <Edit {...props} title="Editor de Productos">
      <SimpleForm>
        <TextInput disabled source="id" />
        <TextInput source="name" label="Nombre" required />
        <TextInput
          multiline
          source="description"
          label="Descripcion"
          required
        />
        <TextInput source="brand" label="Marca" required />
        <NumberInput source="stock" label="Invetnario" required />
        <NumberInput source="price" step="0.01" label="Precio" required />
        <NumberInput source="discount" step="0.01" label="DESCUENTO" required />
        <DateInput source="expirationdate" label="Ingreso a Deposito" />
        <SelectInput
          source="available"
          label="Disponible"
          choices={[
            { id: "true", name: "Si" },
            { id: "false", name: "No" },
          ]}
        />
        <ImageField
          source="image"
          sx={{
            "& img": { maxWidth: 240, maxHeight: 240, objectFit: "contain" },
          }}
        />
        <FileInput source="image" label="Image" accept="image/*">
          <FileField source="src" title="title" />
        </FileInput>
      </SimpleForm>
    </Edit>
  );
};

export default ProductEdit;
