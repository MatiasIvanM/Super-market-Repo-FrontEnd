import {
  Edit,
  SimpleForm,
  TextInput,
  SelectInput,
  Toolbar,
  useShowController,
  SaveButton,
} from "react-admin";
import style from "./users.module.css";
// import { Form, InputGroup } from "react-bootstrap";
import {  Alert, Button, Modal } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import React, { useState } from "react";

const MyToolbar = () => (
    <Toolbar>
        <SaveButton type="button" label="Guardar" />
        {/* <DeleteButton   label="Borrars"/> */}
    </Toolbar>
  );

const OrderEdit = (props) => {
  const { record } = useShowController(props);

  const [showEditModal, setShowEditModal] = useState(true);
  const history = useHistory();

  const handleShowModal = () => {
    setShowEditModal(true);
  };

  const handleCloseModal = () => {
    setShowEditModal(false);
    history.goBack();
  };

  return (
    <Modal
      show={showEditModal}
      onHide={handleCloseModal}
      className={style.modalDetailContainer}
    >
      <Modal.Body>
        <Edit {...props}>
          <div className={style.cardEditContainer}>
            <div>
              <Alert key="dark" variant="dark" style={{ margin: 5 }}>
                <h4>Editar Estado de la Orden de Compra</h4>
              </Alert>
              <SimpleForm toolbar={<MyToolbar/>}>
                <TextInput source="id" label="id" disabled/>
                <TextInput source="Customer.name" label="Nombre" disabled />
                <SelectInput
                  source="estado"
                  label="Estado"
                  choices={[
                    { id: "approved", name: "APPROVED" },
                    { id: "delivered", name: "DELIVERED" },
                    { id: "rejected", name: "REJECTED" },
                    { id: "canceled", name: "CANCELED" },
                    { id: "pending", name: "PENDING" },
                  ]}
                />
              </SimpleForm>
            </div>
          </div>
        </Edit>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          Cancelar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default OrderEdit;
