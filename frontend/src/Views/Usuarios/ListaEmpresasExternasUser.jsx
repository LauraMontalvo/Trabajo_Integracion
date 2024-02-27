import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card, Container, Row, Col, Spinner, Form } from 'react-bootstrap';
import { faBuilding, faInfoCircle, faLink, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.css';
import TabsAdministracionComp from "../../Components/Administracion/TabsAdministracionComp";
import "../../Styles/Lista.scss";
import "../../Styles/ListaEmpresa.scss"; 
import EditarEmpresaExterna from "../../Components/Administracion/EditarEmpresaExterna";
import CabeceraUsuarioInicio from "../../Components/Usuario/CabeceraUsuarioInicioComp";

const ListaEmpresasExternasUser = () => {
  const [empresasExternas, setEmpresasExternas] = useState([]);
  
  const [filtroNombre, setFiltroNombre] = useState("");
  const [empresasExternasFiltradas, setEmpresasExternasFiltradas] = useState([]);
  const [isLoading, setIsLoading] = useState(true); 



  useEffect(() => {
    setIsLoading(true); // Inicia la carga

    axios.get('https://46wm6186-8000.use.devtunnels.ms/api/externalCompanies')
      .then(res => {
        const empresasOrdenadas = res.data.sort((a, b) => a.nombreEmpresa.localeCompare(b.nombreEmpresa));
        setEmpresasExternas(empresasOrdenadas);
        setEmpresasExternasFiltradas(empresasOrdenadas); 
        setIsLoading(false); // Finalizar carga // Inicialmente, muestra todos los usuarios activos ordenados, excluyendo al usuario actual

      })
      .catch(error => {
        console.error(error);
        setIsLoading(false); // Finaliza la carga con error
      });
  }, []);

  const handleFiltroNombreChange = (event) => {
    const query = event.target.value.toLowerCase();
    setFiltroNombre(query);
    const filtrados = empresasExternas.filter(empresa =>
      empresa.nombreEmpresa.toLowerCase().includes(query)
    );
    setEmpresasExternasFiltradas(filtrados);
  };
  const truncateUrl = (url) => {
    const maxChar = 30; 
    return url.length > maxChar ? `${url.substring(0, maxChar)}...` : url;
  };


 

  return (
    <div className="App">
     <CabeceraUsuarioInicio />
      <Container fluid className="mt-4">
        <Row>
          <Col md={3} className="widget">
            <h4>Filtrar Empresas Externas</h4>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Buscar por nombre de empresa"
                value={filtroNombre}
                onChange={handleFiltroNombreChange}
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
              <h4>Total de Usuarios</h4>
              <div className="numero">{empresasExternasFiltradas.length}</div>
            </div>
          </Col>
            <Row>
              {empresasExternasFiltradas.map((empresa) => (
                <Col md={6} key={empresa._id} className="mb-3">
                  <Card className="empresa-card">
                    <Card.Body>
                      <Card.Title>
                        <FontAwesomeIcon icon={faBuilding} className="me-2" />
                        {empresa.nombreEmpresa}
                      </Card.Title>
                      <Card.Text>
                        <FontAwesomeIcon icon={faInfoCircle} className="me-2" /> {empresa.descripcionPublicacion}
                      </Card.Text>
                      <Card.Text>
                        <FontAwesomeIcon icon={faLink} className="me-2" />
                        <a href={empresa.url} target="_blank" rel="noopener noreferrer" title={empresa.url}>
                          {truncateUrl(empresa.url)}         <FontAwesomeIcon icon={faExternalLinkAlt} size="sm" />
                        </a>
                      </Card.Text>



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

export default ListaEmpresasExternasUser;
