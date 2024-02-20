import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Container, Row, Col, Image,Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faIndustry, faPhone, faGlobe, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import '../../Styles/Lista.css';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { Link, useParams } from 'react-router-dom';
import defaultImage from '../../img/imagenUsuarioDefecto.png';
import CabeceraUsuarioInicio from '../../Components/Usuario/CabeceraUsuarioInicioComp';
import CabeceraEmpresaInicioComp from '../../Components/Empresa/CabeceraEmpresaInicioComp';

const ListaEmpresas = (props) => {
  const [empresas, setEmpresas] = useState([]);
  const {usuario, id} = useParams();
  const esUsuario = usuario === 'usuario';
  const isAuthenticated = props.isAuthenticated;
  const [filteredEmpresas, setFilteredEmpresas] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    axios.get('https://46wm6186-8000.use.devtunnels.ms/api/companies')
      .then(response => {
        const activasEmpresas = response.data
          .filter(empresa => empresa.estado === 'Activo')
          .sort((a, b) => a.nombreEmpresa.localeCompare(b.nombreEmpresa));
        setEmpresas(activasEmpresas);
        setFilteredEmpresas(activasEmpresas); // Mostrar solo empresas activas
      })
      .catch(error => console.error(error));
  }, []);

  const handleSearchChange = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = empresas.filter(empresa =>
      empresa.nombreEmpresa.toLowerCase().includes(query)
    );
    setFilteredEmpresas(filtered);
  };
  return (
    <div className="App">
      {esUsuario ? <CabeceraUsuarioInicio isAuthenticated={isAuthenticated} /> : <CabeceraEmpresaInicioComp isAuthenticated={isAuthenticated} />}
      <Container fluid className="mt-4">
        <Row>
        <Col md={3} className="widget">
            <h4>Filtrar Empresas</h4>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Buscar por nombre de empresa"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </Form.Group>
          </Col>
          <Col md={9}>   
          <Col md={12} className="mb-3">
            <div className="total-empresas">
              <h4>Total de Empresas</h4>
              <div className="numero">{empresas.length}</div>
            </div>
          </Col>
          <Row>
          {filteredEmpresas.map(empresa => (
                        <Col md={8} lg={6} key={empresa._id} className="mb-4"> {/* Ajusta el tamaño de las columnas */}
              <Card className="empresa-card h-100"> {/* Añade h-100 para igualar la altura de los cards */}
                <Card.Body>
                  <Row className="align-items-center">
                    <Col xs={12} sm={4} md={4}>
                      <div className="image-container mb-3">
                        <Image src={empresa.foto || defaultImage} alt="Foto de perfil" roundedCircle className="img-fluid mb-2" />
                      </div>
                    </Col>
                    <Col xs={12} sm={8} md={8}>
                      <Card.Title>
                        <Link to={`/perfil-empresa/${id}/${empresa._id}/${usuario}`} className="empresa-link">
                          {empresa.nombreEmpresa || "Empresa no especificada"}
                        </Link>
                      </Card.Title>
                      <Card.Text>
                        <FontAwesomeIcon icon={faEnvelope} /> {empresa.correo}
                      </Card.Text>
                      <Card.Text>
                        <FontAwesomeIcon icon={faMapMarkerAlt} /> {empresa.direccion}
                      </Card.Text>
                      <Card.Text>
                        <FontAwesomeIcon icon={faPhone} /> {empresa.telefono}
                      </Card.Text>
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

export default ListaEmpresas;
