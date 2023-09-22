import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {BsPersonFillSlash} from "react-icons/bs";


const Banned = () => {
    const [show, setShow] = useState(false);

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
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Banned;
