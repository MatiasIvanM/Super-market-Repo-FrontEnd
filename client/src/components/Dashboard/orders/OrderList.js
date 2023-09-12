import React from 'react'
import { List, CreateButton, DateField, DatagridConfigurable, ExportButton, FilterButton, SelectColumnsButton,
  TopToolbar, TextInput, TextField, 
  // EditButton, DeleteButton, 
   SortButton  
} from 'react-admin';

const ListActions = () => (
  <TopToolbar>
      <SelectColumnsButton />
      <FilterButton/>
      <SortButton fields={['price']} />
      <CreateButton/>
      <ExportButton/>
  </TopToolbar>
);


const orderFilters = [
  <TextInput label="Search" source="Id" alwaysOn />,
  <TextInput label="email" source="email" defaultValue="" />,
];

const OrderList = (props) => {  //Este es el que muestra las ciudades
  return (
    
    <List {...props}  actions={<ListActions/>} filters={orderFilters}>
        <DatagridConfigurable>      
          <TextField source="Id" />
          <TextField source="orderDetail" />
          <TextField source="orderAdress" />
          <TextField source="orderStatus" />
          <TextField source="email" />
          <TextField source="price" />
          <DateField source="oderDate" />
          {/* <EditButton basePath="/orders" />
          <DeleteButton basePath="/orders" /> */}
        </DatagridConfigurable>
    </List>
    );
}

export default  OrderList
