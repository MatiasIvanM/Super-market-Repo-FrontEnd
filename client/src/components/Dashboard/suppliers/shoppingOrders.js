import React from 'react'
import { List, CreateButton, ImageField, Show, ShowButton, DateField, 
  DatagridConfigurable, ExportButton, SelectColumnsButton,SimpleShowLayout, 
  TopToolbar, TextInput, TextField, EditButton, useRecordContext,
   DeleteButton, SortButton , FilterButton,
} from 'react-admin';

const ListActions = () => (
  <TopToolbar>
      <SelectColumnsButton />
      {/* <FilterButton/>
      <CreateButton/>
      <ExportButton/> */}
  </TopToolbar>
);

const ShoppingOrders = (props) => {
  return (
    <List {...props} actions={<ListActions/>}>
        <DatagridConfigurable>      
            <TextField source="id" />
            <TextField source="brand" />
            <TextField source="name" />
            <TextField source="available" />
            <TextField source="stock" />
            {/* <SelectButton basePath= "/products"/>     */}
        </DatagridConfigurable>
      </List>
  )
}

const AddButton =(props) =>{
  
}

export default ShoppingOrders