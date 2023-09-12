import React from 'react'
import { List, CreateButton, ImageField, Show, ShowButton, DateField, 
  DatagridConfigurable, ExportButton, SelectColumnsButton,SimpleShowLayout, 
  TopToolbar, TextInput, TextField, EditButton, useRecordContext,
   DeleteButton, SortButton , FilterButton,
} from 'react-admin';
// import { EditDialog } from '@react-admin/ra-form-layout';
import style from './ProductsList.module.css';



const ListActions = () => (
  <TopToolbar>
      <SelectColumnsButton />
      {/* <FilterButton/> */}
      {/* <SortButton fields={['price']} /> */}
      <CreateButton/>
      <ExportButton/>

  </TopToolbar>
);


const productFilters = [
  <TextInput label="Search" source="name" alwaysOn />,
  <TextInput label="categories" source="categories" defaultValue="" />,
];

const DetailShow = (props) => (
  <Show {...props}>
    <SimpleShowLayout>
        <h3> Detalle de Producto:  </h3>
      <div className={style.container}>  
        <div style={{ margin: '1em'}} className={style.containerDetalles}>
          <h6>ID: <TextField source="id" style={{ fontSize: '1.1rem' }}/> </h6>
          <h6>MARCA: <TextField source="brand"  style={{ fontSize: '2rem' }}/></h6>
          <h6>NOMBRE: <TextField source="name" style={{ fontSize: '1.8rem' }}/></h6>
          <h6>DESCRIPCIÓN: <TextField source="description" /></h6>
          <h6>PRECIO: <TextField source="price" style={{ fontSize: '1.8rem' }}/></h6>
          <h6>ESTATUS: <TextField source="available" style={{ fontSize: '1.8rem' }}/></h6>
          <h6>FECHA EXP: <DateField source="created_at" style={{ fontSize: '1.8rem' }}/></h6>
        </div>
        
        <div className={style.containerI}>  
        <ImageField source="image" sx= {{ '& img': { maxWidth: 200, maxHeight: 200, objectFit: 'contain' } } } />
        </div>
      </div>
    </SimpleShowLayout>
  </Show>
);

// const Aside = () => {
//   const record = useRecordContext();
//   return (
//       <div style={{ width: 200, margin: '1em' }}>
//         <h1> DEtal </h1>

//           {/* <Typography variant="h6">Post details</Typography> */}
//           {record && (
//               // <Typography variant="body2">
//                 <>
//                   Creation date: {record.createdAt}
//                 </>
//               // </Typography>
//           )}
//       </div>
//   );
// };


const ProductsList = (props) => {  //Este es el que muestra las ciudades
  return (
    
    <List {...props}  actions={<ListActions/>} filters={productFilters}  >
        <DatagridConfigurable>      
          <TextField source="id" />
          <TextField source="brand" />
          <TextField source="name" />
          {/* <TextField source="description" /> */}
          <TextField source="price" />
          <TextField source="available" />
          <ImageField source="image" sx= {{ '& img': { maxWidth: 40, maxHeight: 40, objectFit: 'contain' } } } />
          {/* <DateField source="created_at" /> */}
          <EditButton  basePath="/products"/>
          <ShowButton  basePath="/products" />
          {/* <DeleteButton basePath="/products" />  */}
        </DatagridConfigurable>
    </List>
    );
}

export {   ProductsList, DetailShow  };
