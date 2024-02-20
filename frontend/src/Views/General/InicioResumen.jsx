import React, { useState } from 'react';
import { Card, Container, Row, Col, Button, Collapse } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import "../../Styles/InicioResumen.scss";
import usuariosImg from "../../img/usuarios.png";
import jobImg from "../../img/job.png";
import empresaiconoImg from "../../img/empresaicono.png";
import { useParams } from 'react-router-dom';
import CabeceraUsuarioInicio from '../../Components/Usuario/CabeceraUsuarioInicioComp';
import CabeceraEmpresaInicioComp from '../../Components/Empresa/CabeceraEmpresaInicioComp';
const InicioResumen = (props) => {
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
      link: `/resumen/usuariosResumen/${id}/${usuario}`,

      icon: usuariosImg, // Imagen para usuarios
    },
    {
      title: "Empresas Existentes",
      text: "Ver empresas existentes.",

      link: `/resumen/empresasResumen/${id}/${usuario}`,
      icon: empresaiconoImg, // Imagen para empresas
    },
    {
      title: "Empleos disponibles",
      text: "Ver empresas existentes.",

      link: `/resumen/empleosResumen/${id}/${usuario}`,
      icon: jobImg, // Imagen para empresas
    },
    // ... otras tarjetas
  ];

  console.log(usuario)
  console.log('sddddddddddddddddddddddddddddddddddddddd')
  const esUsuario = usuario == "usuario"; // Cambia esto a `true` o `false` según corresponda

  return (
    <div className='App'>
      {esUsuario ? <CabeceraUsuarioInicio isAuthenticated={isAuthenticated} /> : <CabeceraEmpresaInicioComp isAuthenticated={isAuthenticated} />}
      {/* Renderiza la cabecera de usuario o empresa según corresponda */}
      <Container fluid className="mt-4">
        <Row>
          {cardsData.map((card, index) => (
            <Col xs={12} md={4} key={index} className="mb-4">
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

export default InicioResumen;
