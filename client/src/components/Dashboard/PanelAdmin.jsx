// import CardActions from '@mui/material/CardActions';
// import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
import React, { useState, useEffect } from "react";
// import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {
  Card,
  CardContent,
  CardHeader,
  CardActions,
  CardMedia,
} from "@mui/material";
import style from "./Dashboard.module.css";
import { getProducts } from "../../redux/Actions/actionsProducts";
import { getCustomers } from "../../redux/Actions/actionsCustomers";
import { getBuy } from "../../redux/Actions/actionsBuy";

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

  return (
    <div className={style.panelAdmin}>
      <Card>
        <CardHeader title="Bienvenido al Panel de Administración" />
        <CardContent>Super Market</CardContent>
        {/* <img src="" alt="logo"> */}
      </Card>
      <div className={style.panelAContainer}>
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              RESUMEN
            </Typography>
            <Typography variant="h5" component="div">
              CLIENTES
            </Typography>
            <br />
            <div className={style.contenido}>
              <div className={style.contenido1}>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  Usuarios:
                </Typography>
                <Typography variant="body2">
                  {usuarios.length -
                    (usuariosBan.length + usuariosAdmin.length)}
                </Typography>
              </div>
              <div className={style.contenido1}>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  Administador:
                </Typography>
                <Typography variant="body2">{usuariosAdmin.length}</Typography>
              </div>
              <div className={style.contenido1}>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  Baneados:
                </Typography>
                <Typography variant="body2">{usuariosBan.length}</Typography>
              </div>
            </div>
          </CardContent>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            <strong> Total: </strong> {usuarios.length}
          </Typography>
        </Card>

        {/* Productos */}
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              RESUMEN
            </Typography>
            <Typography variant="h5" component="div">
              PRODUCTOS
            </Typography>
            <br />
            <div className={style.contenido}>
              <div className={style.contenido1}>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  Disponibles:
                </Typography>
                <Typography variant="body2">
                  {productosDisponibles.length}
                </Typography>
              </div>
              <div className={style.contenido1}>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  Agotados:
                </Typography>
                <Typography variant="body2">
                  {productos.length - productosDisponibles.length}
                </Typography>
              </div>
            </div>
          </CardContent>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            <strong> Total: </strong> {productos.length}
          </Typography>
        </Card>
        {/* Productos */}
        {/* //Ordenes 
        EXISTEN 8 ESTADOS DE ORDENES, 
        Pending	  Approved	 Inprocess  Inmediation 
        Rejected	Cancelled	 Refunded	  Chargedback
        */}
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              RESUMEN
            </Typography>
            <Typography variant="h5" component="div">
              ORDENES
            </Typography>
            <br />
            <div className={style.contenido}>
              <div className={style.contenido1}>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  Aprobadas:
                </Typography>
                <Typography variant="body2">
                  {ordenesAprobadas.length}
                </Typography>
              </div>
              <div className={style.contenido1}>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  Pendientes:
                </Typography>
                <Typography variant="body2">
                  {ordenes.length - ordenesAprobadas.length}
                </Typography>
              </div>
            </div>
          </CardContent>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            <strong> Total: </strong> {ordenes.length}
          </Typography>
        </Card>
      </div>
    </div>
  );
};

export default PanelAdmin;
