import React, { useState } from "react";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import style from "./About.module.css";
import { Card, Button, Modal, Col, Row } from "react-bootstrap";
import {Footer} from "../../components/Footer/Footer";
import NavBar from "../../components/NavBar/NavBar";
import Overlay from "../../components/Overlay/Overlay";


const discipulosHenry = [
  {
    id: 1,
    name: "Juan M. Aguirre",
    cohorte: "PT-12A",
    email: "https://github.com/JuanManuelA12",
    gitHub: "juan@github",
    portfolio: "Sitio en construcción",
    foto: "https://avatars.githubusercontent.com/u/111154948?v=4",
  },
  {
    id: 2,
    name: "Matías Ivan Martín",
    cohorte: "PT-13A",
    email: "matiasivan.sd@gmail.com",
    gitHub: "https://github.com/MatiasIvanM",
    portfolio: "Sitio en construcción",
    foto: "https://avatars.githubusercontent.com/u/105732530?v=4",
  },
  {
    id: 3,
    name: "Nicólas Castellano",
    cohorte: "PT-12A",
    email: "felipenicolas115@gmail.com",
    gitHub: "https://github.com/alemannc",
    portfolio: "Sitio en construcción",
    foto: require("./images/Nico.jpg"),
  },
  {
    id: 4,
    name: "Carlos Polo",
    cohorte: "PT-13A",
    email: "ing.sistema.cepa@gmail.com",
    gitHub: "https://github.com/cepa387",
    portfolio: "Sitio en construcción",
    foto: require("./images/Carlos.jpg"),
  },
  {
    id: 5,
    name: "Bautsta Zitelli",
    cohorte: "PT-13A",
    email: "bautista.zitelli11@gmail.com",
    gitHub: "https://github.com/Bautizitelli",
    portfolio: "Sitio en construcción",
    foto: require("./images/Bauti.jpg"),
  },
  {
    id: 6,
    name: "Gabriel Lossada",
    cohorte: "PT-13A",
    email: "gabrielL@henry.com",
    gitHub: "https://github.com/glossada",
    portfolio: "Sitio en construcción",
    foto: "https://avatars.githubusercontent.com/u/125376427?v=4",
  },
  {
    id: 7,
    name: "Santiago Solavaggione",
    cohorte: "PT-13A",
    email: "santiagoS@henry.com",
    gitHub: "https://github.com/Santjagor",
    portfolio: "Sitio en construcción",
    foto: require("./images/Santi.jpg"),
  },
  {
    id: 8,
    name: "Ana M. Loyo",
    cohorte: "PT-13A",
    email: "anitamlv@gmail.com",
    gitHub:"https://github.com/ALoyoVasquez",
    portfolio: "Sitio en construcción",
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
                <Card.Img variant="top" src={estudian[0]?.foto} className={style.imgModal}/>
                </div>
                <div>
                <Card>
                  <Card.Body>
                    <h6>Cohorte: {estudian[0]?.cohorte}</h6>
                    <h6>Correo: <a href={`mailto:${estudian[0]?.email}`}>{estudian[0]?.email}</a></h6>
                    <h6>Git-Hub: <a href={estudian[0]?.gitHub} target="_blank" rel="noopener noreferrer">{estudian[0]?.gitHub}</a></h6>
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
      <Overlay></Overlay>
      <Footer />
    </>
  );
};

export default About;
