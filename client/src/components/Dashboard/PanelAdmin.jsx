// import CardActions from '@mui/material/CardActions';
// import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
import React, { useState, useEffect } from "react";
// import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {
  // Card,
  CardContent,
  CardHeader,
  CardActions,
  CardMedia,
} from "@mui/material";
import style from "./Dashboard.module.css";
import { getProducts } from "../../redux/Actions/actionsProducts";
import { getCustomers } from "../../redux/Actions/actionsCustomers";
import { getBuy } from "../../redux/Actions/actionsBuy";
import { FaTasks, FaCheck, FaList, FaRegIdCard, FaUserCircle } from 'react-icons/fa'
import { CgProfile, CgUnavailable } from 'react-icons/cg'
import { MdPendingActions } from 'react-icons/md'
import { TiDelete } from 'react-icons/ti'
import { RiAdminFill } from 'react-icons/ri'
import { AiFillSignal } from 'react-icons/ai'
import { MdDeliveryDining } from 'react-icons/md'
import { BiBox } from 'react-icons/bi'

import { Card, Button, ListGroup } from 'react-bootstrap'

const PanelAdmin = () => {
  const dispatch = useDispatch();
  let productos = useSelector((state) => state.products);
  let usuarios = useSelector((state) => state.customers);
  let ordenes = useSelector((state) => state.buycart);

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getBuy());
    dispatch(getCustomers());
  }, []);
  console.log(ordenes);

  const productosDisponibles = productos.filter(
    (producto) => producto.available === true
  );
  const usuariosAdmin = usuarios.filter((user) => user.role === "admin");
  const usuariosBan = usuarios.filter((user) => user.role === "BAN");
  const ordenesAprobadas = ordenes.filter(
    (order) => order.estado === "approved"
  );
  const ordenesRechazadas = ordenes.filter(
    (order) => order.estado === "rejected"
  );
  const ordenesEntregadas = ordenes.filter(
    (order) => order.estado === "delivered"
  );

  return (
    <div className={style.panelAdmin}>
      <Card>
        <CardHeader title="Bienvenido al Panel de Administración" />
        <CardContent>Super Market</CardContent>
      </Card>
      <div className={style.panelAContainer}>
        <Card style={{ width: '18rem' }}>
          <Card.Body>
            <div className={style.cardHeader}>
              <span className={style.icon}>
                <CgProfile />
              </span>
              <span className={style.cardTitle}>
                Clientes
              </span>
            </div>
          </Card.Body>
          <ListGroup className={`list-group-flush ${style.listGroup}`}>
            <ListGroup.Item><FaUserCircle/> - Activos: {usuarios.length}</ListGroup.Item>
            <ListGroup.Item><RiAdminFill/> - Administradores:  {usuariosAdmin.length}</ListGroup.Item>
            <ListGroup.Item><TiDelete/> - Baneados: {usuariosBan.length}</ListGroup.Item>
            <ListGroup.Item>
              <FaRegIdCard/> - Registrados: {usuarios.length -
                    (usuariosBan.length + usuariosAdmin.length)}
              </ListGroup.Item>
          </ListGroup>
        </Card>

        <Card style={{ width: '18rem' }}>
          <Card.Body>
            <div className={style.cardHeader}>
              <span className={style.icon}>
                <BiBox />
              </span>
              <span className={style.cardTitle}>
                Productos
              </span>
            </div>
          </Card.Body>
          <ListGroup className={`list-group-flush ${style.listGroup}`}>
            <ListGroup.Item><FaCheck/> - Disponibles: {productosDisponibles.length}</ListGroup.Item>
            <ListGroup.Item><CgUnavailable/> - Agotados:  {productos.length - productosDisponibles.length}</ListGroup.Item>
            <ListGroup.Item><FaList/> - Total: {productos.length}</ListGroup.Item>
          </ListGroup>
        </Card>
 
        <Card style={{ width: '18rem' }}>
          <Card.Body>
            <div className={style.cardHeader}>
              <span className={style.icon}>
                <AiFillSignal />
              </span>
              <span className={style.cardTitle}>
                Ordenes
              </span>

            </div>
          </Card.Body>
          <ListGroup className={`list-group-flush ${style.listGroup}`}>
            <ListGroup.Item><FaList/> - Ordenes totales: {ordenes.length}</ListGroup.Item>
            <ListGroup.Item><FaCheck/> - Ordenes aprobadas:  {ordenesAprobadas.length}</ListGroup.Item>
            <ListGroup.Item><CgUnavailable/> - Ordenes rechazadas:  {ordenesRechazadas.length}</ListGroup.Item>
            <ListGroup.Item><MdDeliveryDining/> - Ordenes entregadas:  {ordenesEntregadas.length}</ListGroup.Item>
            <ListGroup.Item>
              <MdPendingActions/> - Ordenes pendientes: {ordenes.length - (ordenesAprobadas.length + ordenesRechazadas.length + ordenesEntregadas.length)}
              </ListGroup.Item>
          </ListGroup>
        </Card>

      </div>
    </div>
  );
};

export default PanelAdmin;

 