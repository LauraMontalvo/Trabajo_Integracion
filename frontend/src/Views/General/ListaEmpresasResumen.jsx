import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Container, Row, Col, Image, Form, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faMapMarkerAlt, faPhone } from '@fortawesome/free-solid-svg-icons';
import '../../Styles/Lista.css';
import { Link, useParams } from 'react-router-dom';
import defaultImage from '../../img/imagenUsuarioDefecto.png';
import CabeceraUsuarioInicio from '../../Components/Usuario/CabeceraUsuarioInicioComp';
import CabeceraEmpresaInicioComp from '../../Components/Empresa/CabeceraEmpresaInicioComp';

// Componente para mostrar un esqueleto de carga
const LoadingSkeleton = () => (
  <div className="loading-skeleton">
    <Spinner animation="border" role="status">
      <span className="sr-only">Cargando...</span>
    </Spinner>
  </div>
);

const ListaEmpresas = (props) => {
  const [empresas, setEmpresas] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Nuevo estado para manejar la carga
  const { usuario, id } = useParams();
  const esUsuario = usuario === 'usuario';
  const isAuthenticated = props.isAuthenticated;
  const [filteredEmpresas, setFilteredEmpresas] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setIsLoading(true); // Iniciar carga
    axios.get('https://46wm6186-8000.use.devtunnels.ms/api/companies')
      .then(response => {
        const activasEmpresas = response.data
          .filter(empresa => empresa.estado === 'Activo' && empresa._id !== id)
          .sort((a, b) => a.nombreEmpresa.localeCompare(b.nombreEmpresa));
        setEmpresas(activasEmpresas);
        setFilteredEmpresas(activasEmpresas);
        setIsLoading(false); // Finalizar carga
      })
      .catch(error => {
        console.error(error);
        setIsLoading(false); // Finalizar carga incluso en caso de error
      });
  }, [id]);

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
          {isLoading ? (
            <div className="text-center">
              <Spinner animation="border" className="mx-auto" />
            </div>
          ) : (

            <Col md={9}>

              <Col md={12} className="mb-3">
                <div className="total-empresas">
                  <h4>Total de Empresas</h4>
                  <div className="numero">{filteredEmpresas.length}</div>
                </div>
              </Col>
              <Row>
                {filteredEmpresas.map(empresa => (
                  <Col md={6} lg={4} key={empresa._id} className="mb-4">
                    <Card className="empresa-card shadow-sm"> {/* Añade sombra para un efecto sutil */}
                      <Card.Body>
                        <Row className="align-items-center">
                          <Col xs={4}>
                            <Image src={empresa.foto || defaultImage} alt="Foto de perfil" roundedCircle className="img-fluid" />
                          </Col>
                          <Col xs={8}>
                            <Card.Title className="mb-2">{empresa.nombreEmpresa}</Card.Title>
                            <Card.Text className="text-muted">
                              <FontAwesomeIcon icon={faEnvelope} className="me-2" />{empresa.correo}
                            </Card.Text>
                            <Card.Text className="text-muted">
                              <FontAwesomeIcon icon={faMapMarkerAlt} className="me-2" />{empresa.direccion}
                            </Card.Text>
                            <Card.Text className="text-muted">
                              <FontAwesomeIcon icon={faPhone} className="me-2" />{empresa.telefono}
                            </Card.Text>
                            <Link to={`/perfil-empresa/${id}/${empresa._id}/${usuario}`} className="stretched-link"></Link>
                          </Col>
                        </Row>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>


            </Col>
          )}
        </Row>
      </Container>
    </div>
  );
};

export default ListaEmpresas;
