import React from "react";
import {
  List,
  CreateButton,
  DateField,
  DatagridConfigurable,
  ExportButton,
  FilterButton,
  SelectColumnsButton,
  Datagrid,
  TopToolbar,
  TextInput,
  TextField,
  SimpleShowLayout,
  Show,
  ShowButton,
  DateInput,
  ArrayField,
  SingleFieldList,
  ChipField,
  // EditButton, DeleteButton,
  SortButton,
} from "react-admin";

import style from "./OrderList.module.css";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { Card, ListGroup, Button, Modal } from "react-bootstrap";

const ListActions = () => (
  <TopToolbar>
    <SelectColumnsButton />
    <FilterButton />
    {/* <SortButton fields={['price']} />ç */}
    <CreateButton />
    <ExportButton />
  </TopToolbar>
);

const orderFilters = [
  <TextInput label="Search" source="Id" alwaysOn />,
  <TextInput label="email" source="email" defaultValue="" />,
  <DateInput label="fechapago" source="fechapago" defaultValue="" />,
];

const DetailBuy = (props) => {
  const [showModal, setShowModal] = useState(true);
  const history = useHistory();

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    history.goBack();
  };
  return (
    <>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Body>
          <Show {...props} title="Detalle de la Compra:">
            {/* {console.log(props)} */}
            <SimpleShowLayout>
              <div className={style.containerHead}>
                <h3>Detalle de la Compra </h3>
                <Card>
                  <Card.Body className={style.productInfo}>
                    <ListGroup className="list-group-flush">
                      <ListGroup.Item> 
                        <h6>Id Compra: <TextField source="id" style={{ fontSize: "1rem" }} /> </h6>
                        <h6>Fecha Compra: <TextField source="fechapago" style={{ fontSize: "1rem" }} /></h6>
                        <h6>Estado de la Compra: <TextField source="estado" style={{ fontSize: "1rem" }} /></h6>
                      </ListGroup.Item>
                    </ListGroup>
                  </Card.Body>
                </Card>
              </div>
              {/* Informacion del Usuario */}
              <div className={style.containerUser}>
                <h3>Usuario</h3>
                <Card>
                  <Card.Body className={style.productInfo}>
                    <ListGroup className="list-group-flush">
                      <ListGroup.Item>
                        <h6>Nombre de Usuario: <TextField source="Customer.name" style={{ fontSize: "1rem" }} /></h6> 
                        <h6>Correo de Usuario: <TextField source="Customer.email" style={{ fontSize: "1rem" }} /></h6> 
                      </ListGroup.Item>
                    </ListGroup>
                  </Card.Body>
                </Card>
              </div>
              {/* Informacion de la Compra */}
              <div className={style.containerDetalleBuy}>
                <h3>Detalle de la Compra</h3>
                <Card >
                  <Card.Body className={style.productInfo}>
                    <ListGroup className="list-group-flush">
                      <ListGroup.Item>
                        {/* <span>Productos Comprados:</span> */}
                        <ArrayField source="cart">
                          <Datagrid bulkActionButtons={false}>
                            <TextField source="title" label="Producto" />
                            <TextField source="quantity"  label="Cantidad"/>
                            <TextField source="unit_price" label="P/U" />
                          </Datagrid>
                        </ArrayField>
                      </ListGroup.Item>

                      <ListGroup.Item style={{ display: "flex", alignItems: "left" }}>
                        <span style={{ flex: "0 0 auto" }}>Total Pagado: $
                        <TextField
                          source="total"
                          style={{
                            fontSize: "1rem",
                            fontWeight: "bold",
                            marginLeft: "10px",
                          }}
                        />
                        ,00</span>
                      </ListGroup.Item>
                    </ListGroup>
                  </Card.Body>
                </Card>
                {/* Informacion del Pago */}
                <div className={style.containerPago}>
                  <h3>Detalles del Pagador</h3>
                  <Card>
                    <Card.Body>
                      <ListGroup className="list-group-flush">
                        <ListGroup.Item>
                          <h6>Id: <TextField source="payer.payer.id" style={{ fontSize: "1rem" }} /></h6>
                          <h6>Correo E: <TextField source="payer.payer.email" style={{ fontSize: "1rem" }} /></h6>
                          <h6>Identificacion:
                             <TextField source="payer.payer.identification.type" style={{ fontSize: "1rem" }} /> - 
                             <TextField source="payer.payer.identification.number" style={{ fontSize: "1rem" }} /> 
                          </h6>
                        </ListGroup.Item>
                      </ListGroup>
                    </Card.Body>
                  </Card>
                </div>
              </div>
            </SimpleShowLayout>
          </Show>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

const OrderList = (props) => {
  //Este es el que muestra las ciudades
  return (
    <List
      {...props}
      actions={<ListActions />}
      filters={orderFilters}
      title="Orden de Compra"
    >
      <DatagridConfigurable>
        <TextField source="id" />
        <DateField source="fechapago" label="Fecha Pago" />
        <TextField source="cart.length" label="Cantidad Productos" />
        <TextField source="payer.payer.id" label="Id Pagador" />
        <TextField source="payer.payer.identification.type" label="DNI" />
        <TextField source="payer.payer.identification.number" label="#" />
        <TextField source="CustomerId" />
        <TextField source="estado" />
        {/* </Link> */}
        <ShowButton basepath="/buy" />
        //Carro //Cantidad de Productos //Monto total de la compra //Estado de
        la compra //Cuenta del Usuario
        {/* <EditButton basePath="/orders" />
          <DeleteButton basePath="/orders" /> 
          */}
      </DatagridConfigurable>
    </List>
  );
};

export { OrderList, DetailBuy };
