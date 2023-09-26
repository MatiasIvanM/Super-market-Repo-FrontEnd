import {
    Edit,
    SimpleForm,
    TextInput,
    SelectInput,
    PasswordInput,
    useShowController,
    EditButton
} from 'react-admin';
import style from './users.module.css'
import{ Form, InputGroup }from 'react-bootstrap';
import { Card, ListGroup, Alert, Button, Modal }from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import React, { useState } from 'react';

const UserEdit = (props) => {
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
        <Modal show={showEditModal} onHide={handleCloseModal} className={style.modalDetailContainer}>
        <Modal.Body>
    <Edit {...props}>
        <div className={style.cardEditContainer}>
            <div >
            <Alert key='dark' variant='dark' style={{margin:5}}>
                         <h4>Editar usuario</h4>   
                      </Alert>
                <SimpleForm>
                    <TextInput source="name" label="Nombre" />
                    <TextInput source="email" label="Correo Electrónico" />
                    <TextInput source="address" label="Dirección" />
                    <PasswordInput source="password" label="Contraseña" />
                    <SelectInput
                    source="role"
                    label="Rol"
                    choices={[
                        { id : 'BAN', name: 'Restringir Usuario'},
                        { id: 'user', name: 'Usuario' },
                        { id: 'admin', name: 'Administrador' },
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

export default UserEdit;
