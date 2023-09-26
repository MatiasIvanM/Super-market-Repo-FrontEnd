import React from 'react';
import { Filter, TextInput } from 'react-admin';

const CustomsFilters = (props) => (
  <Filter {...props}>
    <TextInput label="price" source="price" />
    <TextInput label="name" source="name" defaultValue=""/>,
    {/* Agrega aquí otros campos de filtro personalizados según tus necesidades */}
  </Filter>
);

export default CustomsFilters;