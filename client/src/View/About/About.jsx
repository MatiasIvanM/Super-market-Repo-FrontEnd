import React, { useState } from "react";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import style from "./About.module.css";
import { Card, Button, Modal, Col, Row } from "react-bootstrap";
import NavBar from "../../components/NavBar/NavBar";
import {Footer} from "../../components/Footer/Footer";

const discipulosHenry = [
  {
    id: 1,
    name: "Juan M. Aguirre",
    cohorte: "PT-12A",
    email: "juanMA@henry.com",
    gitHub: "juan@github",
    portfolio: "URL://juanma",
    foto: "https://avatars.githubusercontent.com/u/111154948?v=4",
  },
  {
    id: 2,
    name: "Matías Martín",
    cohorte: "PT-13A",
    email: "matiasM@henry.com",
    gitHub: "matias@github",
    portfolio: "URL://mati",
    foto: "https://avatars.githubusercontent.com/u/105732530?v=4",
  },
  {
    id: 3,
    name: "Nicólas Castellano",
    cohorte: "PT-12A",
    email: "nicolasC@henry.com",
    gitHub: "nicolas@github",
    portfolio: "URL://nico",
    foto: "https://avatars.githubusercontent.com/u/97761599?v=4",
  },
  {
    id: 4,
    name: "Carlos Polo",
    cohorte: "PT-13A",
    email: "carlosP@henry.com",
    gitHub: "carlos@github",
    portfolio: "URL://carlos",
    foto: "https://avatars.githubusercontent.com/u/97761599?v=4",
  },
  {
    id: 5,
    name: "Bautsta Zitelli",
    cohorte: "PT-13A",
    email: "bautistaZ@henry.com",
    gitHub: "bautista@github",
    portfolio: "URL://bauti",
    foto: "https://avatars.githubusercontent.com/u/97761599?v=4",
  },
  {
    id: 6,
    name: "Gabriel Lossada",
    cohorte: "PT-13A",
    email: "gabrielL@henry.com",
    gitHub: "gabriel@github",
    portfolio: "URL://gabriel",
    foto: "https://avatars.githubusercontent.com/u/125376427?v=4",
  },
  {
    id: 7,
    name: "Santiago Solavaggione",
    cohorte: "PT-13A",
    email: "santiagoS@henry.com",
    gitHub: "santiago@github",
    portfolio: "URL://santi",
    foto: "https://avatars.githubusercontent.com/u/108992013?v=4",
  },
  {
    id: 8,
    name: "Ana M. Loyo",
    cohorte: "PT-13A",
    email: "anaML@henry.com",
    gitHub: "ana@github",
    portfolio: "URL://ana",
    foto: "https://avatars.githubusercontent.com/u/123335176?v=4",
  },
];

const About = () => {
  const [estudian, setEstudian] = useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const handleShow = (id) => {
    setShow(true);
    setEstudian(discipulosHenry.filter((std) => std.id === id));
  };

  return (
    <>
      <NavBar />
      <div className={style.container}>
        <h1>Conócenos</h1>

        <Row xs={2} md={4} className="g-4" style={{ alignContent: "center" }}>
          {discipulosHenry.map((estudiante) => (
            <Col key={estudiante.id}>
              <Card
                style={{
                  width: "14rem",
                  height: "16rem",
                  alignItems: "center",
                  background: "dark",
                }}
                className={style.customCard}
              >
                <Card.Img
                  variant="top"
                  src={estudiante.foto}
                  style={{ width: "70%", alignSelf: "center" }}
                  className={style.img}
                />
                <Card.Body style={{ width: "98%" }}>
                  <Card.Title style={{ fontSize: "1.10rem" }}>
                    {estudiante.name}
                  </Card.Title>
                </Card.Body>
                <Button
                  variant="primary"
                  onClick={() => handleShow(estudiante.id)}
                  className={style.button}
                >
                  Contáctame{" "}
                </Button>
              </Card>
            </Col>
          ))}
        </Row>
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>{estudian[0]?.name} </Modal.Title>
          </Modal.Header>
          <div className={style.container2}>
            <Modal.Body>
              <div>
                <div >
                <Card.Img variant="top" src={estudian[0]?.foto}   className={style.img}/>
                </div>
                <div>
                <Card>
                  <Card.Body>
                    <h6>Cohorte: {estudian[0]?.cohorte}</h6>
                    <h6>Correo: <a href={`mailto:${estudian[0]?.email}`}>{estudian[0]?.email}</a></h6>
                    <h6>Git-Hub: {estudian[0]?.gitHub} </h6>
                    <h6>Portafolio: {estudian[0]?.portfolio} </h6>
                  </Card.Body>
                </Card>
                </div>
              </div>
            </Modal.Body>
          </div>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      <Footer />
    </>
  );
};

export default About;
