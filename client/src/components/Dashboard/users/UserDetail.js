
import {
    TextField,
    Show,
    SimpleShowLayout
} from 'react-admin';

import { Card, ListGroup, Alert, Button, Modal }from 'react-bootstrap';
import style from './users.module.css'
import { useHistory } from 'react-router-dom';
import React, { useState } from 'react';

const UserDetail = (props) => {
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
        <Modal show={showModal} onHide={handleCloseModal} className={style.modalDetailContainer}>
          {/* <Modal.Header closeButton>
            <Modal.Title></Modal.Title>
          </Modal.Header> */}
          <Modal.Body>
              <Show {...props}>
                  <SimpleShowLayout className={style.userDetails}>
                  <div className={style.cardDetailContainer}>
                  <Card style={{ width: '30rem' }} className={style.details}>
                  <Card.Header style={{padding:3}}>
                  <Alert key='dark' variant='dark' style={{margin:5}}>
                         <h4>Detalles del usuario : </h4>   
                      </Alert>
                  </Card.Header>
                  <ListGroup variant="flush" style={{padding:0}}>
                      <ListGroup.Item style={{padding:0}}>
                          <Alert key='secondary' variant='secondary' style={{margin:3}}>
                          <strong>Nombre:</strong><TextField source="name" style={{ fontSize: '1.1rem' }}/>
                          </Alert>
                      </ListGroup.Item>
                      <ListGroup.Item style={{padding:0}}>
                      <Alert key='secondary' variant='secondary' style={{margin:3}}>
                      <strong>Dirección:</strong><TextField source="adress" style={{ fontSize: '1.1rem' }}/>
                          </Alert>
                      </ListGroup.Item>
                      <ListGroup.Item style={{padding:0}}>
                      <Alert key='secondary' variant='secondary' style={{margin:3}}>
                      <strong>Correo Electrónico:</strong> <TextField source="email" style={{ fontSize: '1.1rem' }}/>
                          </Alert>
                      </ListGroup.Item>
                      <ListGroup.Item style={{padding:0}}>
                      <Alert key='secondary' variant='secondary' style={{margin:3}}>
                      <strong>Rol:</strong><TextField source="role" style={{ fontSize: '1.1rem' }}/>
                          </Alert>
                      </ListGroup.Item>
                      <ListGroup.Item style={{padding:0}}>
                      <Alert key='secondary' variant='secondary' style={{margin:3}}>
                      <strong>Télefono:</strong><TextField source="phone" style={{ fontSize: '1.1rem' }}/>
                          </Alert>
                      </ListGroup.Item>
                      <ListGroup.Item style={{padding:0}}>
                      <Alert key='secondary' variant='secondary' style={{margin:3}}>
                      <strong>Cuenta:</strong><TextField source="provider" style={{ fontSize: '1.1rem' }}/>
                          </Alert>
                      </ListGroup.Item>
                  </ListGroup>
                  </Card>
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
  
  export default UserDetail;
 