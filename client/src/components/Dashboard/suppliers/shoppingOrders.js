import React from 'react'
import { List, CreateButton, ImageField, Show, ShowButton, DateField, 
  DatagridConfigurable, ExportButton, SelectColumnsButton,SimpleShowLayout, 
  TopToolbar, TextInput, TextField, EditButton, useRecordContext,
   DeleteButton, SortButton , FilterButton,
} from 'react-admin';

const shoppingOrders = (ordersList) => {
  return (
    <List {...props}  actions={<ListActions/>} filters={productFilters}  >
        <DatagridConfigurable>      
            <TextField source="id" />
            <TextField source="brand" />
            <TextField source="name" />
            <TextField source="available" />
            <TextField source="stock" />
            <SelectButton basePath= "/products"/>    
        {/* <DateField source="created_at" /> */}
            <EditButton  basePath="/products"/>
            <ShowButton  basePath="/products" />
            {/* <DeleteButton basePath="/products" />  */}
          </DatagridConfigurable>
      </List>
  )
}

export default shoppingOrders