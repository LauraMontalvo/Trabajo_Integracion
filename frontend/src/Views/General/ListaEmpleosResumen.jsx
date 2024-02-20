import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Container, Row, Col, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faBriefcase } from '@fortawesome/free-solid-svg-icons';
import "../../Styles/loginstyle.css";
import { useParams } from 'react-router-dom';
import CabeceraUsuarioInicio from '../../Components/Usuario/CabeceraUsuarioInicioComp';
import CabeceraEmpresaInicioComp from '../../Components/Empresa/CabeceraEmpresaInicioComp';
import 'moment/locale/es'; // Importar el locale español

const ListaEmpleos = (props) => {
  const [empleos, setEmpleos] = useState([]);
  const [filteredEmpleos, setFilteredEmpleos] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const {usuario} = useParams();
  const esUsuario = usuario == "usuario"; // Cambia esto a `true` o `false` según corresponda
  const isAuthenticated = props.isAuthenticated;

  useEffect(() => {
    axios.get('https://46wm6186-8000.use.devtunnels.ms/api/jobs')
      .then(response => {
        // Suponiendo que cada empleo tiene un objeto idEmpresa con un campo nombreEmpresa
        const empleosActivos = response.data.filter(empleo => empleo.estado === 'Activo');
        setEmpleos(empleosActivos);
        setFilteredEmpleos(empleosActivos);
      })
      .catch(error => console.error('Error al cargar empleos:', error));
  }, []);

  const handleSearchChange = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = empleos.filter(empleo =>
      empleo.puesto.toLowerCase().includes(query) ||
      (empleo.idEmpresa && empleo.idEmpresa.nombreEmpresa.toLowerCase().includes(query))
    );
    setFilteredEmpleos(filtered);
  };

  const moment = require('moment');
  moment.locale('es');

  function formatRelativeDate(date) {
    return moment(date).fromNow();
  }

  return (
    <div className='App'>
      {esUsuario ? <CabeceraUsuarioInicio isAuthenticated={isAuthenticated} /> : <CabeceraEmpresaInicioComp isAuthenticated={isAuthenticated} />}
      <Container fluid className="mt-4">
        <Row>
          <Col md={3} className="widget">
            <h4>Filtrar Empleos</h4>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Buscar por nombre de empleo o empresa"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </Form.Group>
          </Col>
          <Col md={9}>
            <Col md={12} className="mb-3">
              <div className="total-empresas">
                <h4>Total de Empleos</h4>
                <div className="numero">{empleos.length}</div>
              </div>
            </Col>
            <Row>
              {filteredEmpleos.map((empleo, index) => (
                <Col key={index} md={12} className="mb-3">
                  <Card className="job-card">
                    <Card.Body>
                      <Row>
                        <p className="publication-date">Publicado {formatRelativeDate(empleo.fechaPublicacion)}</p>
                        <Col sm={8}>
                          <Card.Title>{empleo.puesto}</Card.Title>
                          <Card.Subtitle className="mb-2 text-muted">
                            {empleo.idEmpresa.nombreEmpresa}
                          </Card.Subtitle>
                          <Card.Text>
                            {empleo.descripcion.substring(0, 100)}...
                          </Card.Text>
                        </Col>
                        <Col sm={4} className="text-muted">
                          <div className="location">
                            <FontAwesomeIcon icon={faMapMarkerAlt} /> {empleo.idEmpresa.direccion}
                          </div>
                          <div className="job-type">
                            <FontAwesomeIcon icon={faBriefcase} /> {empleo.modalidad}
                          </div>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ListaEmpleos;
