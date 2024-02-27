import React, { useState } from 'react';
import { Card, Container, Row, Col, Button, Collapse } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import "../../Styles/InicioResumen.scss";
import usuariosImg from "../../img/usuarios.png";
import jobImg from "../../img/job.png";
import empresaiconoImg from "../../img/empresaicono.png";
import { useParams } from 'react-router-dom';
import CabeceraUsuarioInicio from '../../Components/Usuario/CabeceraUsuarioInicioComp';
import empresaExticonoImg from "../../img/empresaExt.png";
import CabeceraEmpresaInicioComp from '../../Components/Empresa/CabeceraEmpresaInicioComp';
const InicioResumenUsuario = (props) => {
  const { id, usuario } = useParams();
  const [expandedCard, setExpandedCard] = useState(null);
  const isAuthenticated = props.isAuthenticated;
  const handleCardClick = (index) => {
    setExpandedCard(expandedCard === index ? null : index);
  };

  const cardsData = [
    {
      title: "Usuarios Existentes",
      text: "Ver usuarios existentes.",
      link: `/resumenUsuario/usuariosResumen/${id}/${usuario}`,

      icon: usuariosImg, // Imagen para usuarios
    },
    {
      title: "Empresas Existentes",
      text: "Ver empresas existentes.",

      link: `/resumenUsuario/empresasResumen/${id}/${usuario}`,
      icon: empresaiconoImg, // Imagen para empresas
    },
    {
      title: "Empresas Externas",
      text: "Ver empresas externas.",

      link: `/resumenUsuario/empresasexternas/${id}/${usuario}`,
      icon: empresaExticonoImg, // Imagen para empresas
    },
    {
      title: "Empleos disponibles",
      text: "Ver empresas existentes.",

      link: `/resumenUsuario/empleosResumen/${id}/${usuario}`,
      icon: jobImg, // Imagen para empresas
    },
    // ... otras tarjetas
  ];

  const esUsuario = usuario == "usuario"; 

  return (
    <div className='App'>
 <CabeceraUsuarioInicio  />

 <Container fluid className="mt-4">
  <Row>
    {cardsData.map((card, index) => (
      <Col xs={12} md={6} lg={3} key={index} className="mb-4"> {/* Ajuste para lg={3} */}
        <Link to={card.link} className="card-link">
          <Card
            className={`custom-card ${expandedCard === index ? 'expanded' : ''}`}
            onClick={(e) => handleCardClick(index, e)}
          >
            <Card.Body>
              <img src={card.icon} alt={card.title} className="card-icon" />
              <Card.Title className="custom-card-title">{card.title}</Card.Title>
              <Card.Text>{card.text}</Card.Text>
            </Card.Body>
            <Collapse in={expandedCard === index}>
              <Card.Footer>
                Mensaje elegante al hacer clic
                <Button variant="primary" className="ml-2">Ir a la página</Button>
              </Card.Footer>
            </Collapse>
          </Card>
        </Link>
      </Col>
    ))}
  </Row>
</Container>
    </div>

  );
};

export default InicioResumenUsuario;
