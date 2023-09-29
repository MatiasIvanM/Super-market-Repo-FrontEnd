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
 
  FunctionField,
  // EditButton, DeleteButton,
  SortButton,
  ImageField,
} from "react-admin";

import style from "./OrderList.module.css";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { Card, ListGroup, Button, Modal, Col, Container, Row, Image  } from "react-bootstrap";

const ListActions = () => (
  <TopToolbar>
    <SelectColumnsButton />
    {/* <FilterButton /> */}
    <ExportButton label="Exportar" />
  </TopToolbar>
);

const orderFilters = [
  <TextInput label="Search" source="Id" alwaysOn />,
  // <TextInput label="email" source="email" defaultValue="" />,
  // <DateInput label="fechapago" source="fechapago" defaultValue="" />,
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
      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Body>
          <Show {...props} title="Detalle de la Compra:">
            <SimpleShowLayout>
              <Container>
              <div className={style.containerHead}>
                <Card>
                  <Card.Body className={style.productInfo}>
                   <Row>
                     <Col xs={12} md={6}> 
                      <h3>Detalle</h3>
                       <hr/>
                        <h6>ID compra: <TextField source="id" style={{ fontSize: "1rem" }} /> </h6>
                        <h6> Fecha: 
                        <DateField
                          source="fechapago"
                          options={{
                            year: 'numeric',
                            month: 'numeric',
                            day: 'numeric',
                          }}
                          style={{ fontSize: '1rem', marginLeft: "3px", }}
                        />
                        </h6>
                        <h6>Estado: <TextField source="estado" style={{ fontSize: "1rem" }} /></h6>
                     </Col>
                     <Col xs={12} md={6}>
                      <h3>Usuario</h3>
                        <hr/>
                      <h6>Nombre : <TextField source="Customer.name" style={{ fontSize: "1rem" }} /></h6> 
                      <h6>Correo de usuario: <TextField source="Customer.email" style={{ fontSize: "1rem" }} /></h6> 
                      <h6>ID: <TextField source="payer.payer.id" style={{ fontSize: "1rem" }} /></h6>
                      <h6>Correo con el que se realizó el pago: <TextField source="payer.payer.email" style={{ fontSize: "1rem" }} /></h6>
                      <h6>Identificación:
                        <TextField source="payer.payer.identification.type" style={{ fontSize: "1rem" }} /> - 
                        <TextField source="payer.payer.identification.number" style={{ fontSize: "1rem" }} /> 
                      </h6>
                     </Col>
                   </Row>
                   <hr/>
                   <Row>
                    <Col>
                      <h3>Detalle de la compra</h3>
                        <ArrayField source="cart">
                          <Datagrid bulkActionButtons={false}>
                            <TextField source="quantity"  label="Cantidad" style={{ color: "black" }}/>
                            <TextField source="title" label="Producto" style={{ color: "black" }}/>
                            <TextField source="unit_price" label="Precio por unidad" style={{ color: "black" }}/>
                            <FunctionField
                              label="Total de la línea"
                              style={{ color: "black" }}
                              render={(props) => {
                                const totalLinePrice = props.quantity * props.unit_price;
                                return <span>${totalLinePrice}</span>;
                              }}
                            />
                          </Datagrid>
                        </ArrayField>
                    </Col>
                   </Row>
                   <br/>
                   <Row>
                    <Col></Col>
                    <Col></Col>
                    <Col>
                    <ListGroup.Item style={{ display: "flex", alignItems: "left" }}>
                        <span style={{ flex: "0 0 auto",fontSize: "1rem",  fontWeight: "bold" }}>Total Pagado: ${/* <span style={{ fontSize: "1rem",  fontWeight: "bold", }}>$</span> */}
                        <TextField
                          source="total"
                          style={{
                            fontSize: "1rem",
                            fontWeight: "bold",
                            marginLeft: "1px",
                          }}
                        />
                        ,00</span>
                      </ListGroup.Item>
                    </Col>
                   </Row>
                   <hr/>
                   <Row>
                    <Col> 
                      <Image src="logo.png" rounded style={{ height: "50px", padding: "0", margin: "0" }}/>
                    </Col>
                    <Col>
                    © 2023 Copyright: PF-SuperMarket-Shop
                    </Col>
                   </Row>
                  </Card.Body>
                </Card>
              </div>
              </Container>
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

  // {console.log(`ESTAAAAAAAAAA ${props.source}`)}
  // {console.log(props.source)}
  return (
    <List
      {...props}
      actions={<ListActions />}
      filters={orderFilters}
      title="Orden de Compra"
    >
      <DatagridConfigurable>
        <TextField source="id" label="Nº Pedido"/>
        <DateField source="fechapago" label="Fecha Pago" />
        <TextField source="cart.length" label="Cantidad Productos" />
        <TextField source="payer.payer.id" label="Id Pagador" />
        <TextField source="Customer.name" label="Usuario" />
        {/* {source="Estado" === "approved" 
        ? console.log("Fue aprobado")
        : console.log("Pendiente")} */}
        <h7 className={style.h7}>
        <TextField label ="Estado" 
          source="estado" />
          {/* { <TextField label ="Estado" 
          source="estado" /> === "APPROVED" ? console.log("Fue aprobado")
        : console.log("Pendiente")} */}

        </h7>
        {/* </Link> */}
        <ShowButton basepath="/buy" label = "Detalle" />

      </DatagridConfigurable>
    </List>
  );
};

export { OrderList, DetailBuy };
