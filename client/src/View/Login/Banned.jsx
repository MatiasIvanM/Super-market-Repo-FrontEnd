import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {BsPersonFillSlash} from "react-icons/bs";
import { useAuth0 } from "@auth0/auth0-react"
import { useHistory } from 'react-router-dom';

const Banned = () => {
  const { logout, isAuthenticated } = useAuth0()
  const history = useHistory()
    const [show, setShow] = useState(false);

    const handleClose = () => {
      localStorage.clear()
      if (isAuthenticated) {
          logout({ logoutParams: { returnTo: window.location.origin } })
      }
      else {
          history.push('/')
      }
      setShow(false);
    };

  return (
    <>
      <Modal
        show={true}
        // onHide={() => setShow(false)}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header>
          <Modal.Title id="example-custom-modal-styling-title">
            <BsPersonFillSlash /> - Cuenta Bloqueada 
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
          Su cuenta ha sido suspendida temporalmente debido a alguna actividad sospechosa. Si consideras que esto es un error escribenos a  <a href="mailto:quejas@supermarket.com">quejas@supermarket.com</a>
          </p>
        <Button onClick={handleClose}> Aceptar </Button>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Banned;
