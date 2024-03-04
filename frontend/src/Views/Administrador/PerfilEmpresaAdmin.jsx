import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, Card, ListGroup, Image, Button } from 'react-bootstrap';
import "../../Styles/Perfil.scss"
import "../../Styles/detalle.scss"
import CabeceraUsuarioInicio from '../../Components/Usuario/CabeceraUsuarioInicioComp';
import ListaEmpleosPerfilEmpresa from '../../Components/Usuario/ListaEmpleosPerfilEmpresa';
import defaultImage from '../../img/imagenUsuarioDefecto.png';
import TabsAdministracionComp from '../../Components/Administracion/TabsAdministracionComp';

const PerfilEmpresaAdmin = () => {
  const { id, idEmpresa } = useParams(); // Obtener el ID de la empresa desde la URL
  const [empresa, setEmpresa] = useState(null);
  const [empleos, setEmpleos] = useState([]);
  const [verDescripcionCompleta, setVerDescripcionCompleta] = useState(false);
  const [imagenPreview, setImagenPreview] = useState(null);

  useEffect(() => {
    const cargarDatosEmpresa = async () => {
      try {
        const resEmpresa = await axios.get(`https://46wm6186-8000.use.devtunnels.ms/api/company/${idEmpresa}`);
        setEmpresa(resEmpresa.data);

        const resEmpleos = await axios.get(`https://46wm6186-8000.use.devtunnels.ms/api/jobs/company/${idEmpresa}`);
        const empleosActivos = resEmpleos.data.filter(empleo => empleo.estado === 'Activo');
        setEmpleos(empleosActivos);

        const fotoResponse = await axios.get(`https://46wm6186-8000.use.devtunnels.ms/api/company/foto/${idEmpresa}`);
        if (fotoResponse.data && fotoResponse.data.foto) {
          setImagenPreview(fotoResponse.data.foto);
        } else {
          setImagenPreview(defaultImage); // Establecer imagen por defecto si no hay foto
        }
      } catch (error) {
        console.error('Error al cargar los datos:', error);
        setImagenPreview(defaultImage); // Asegurarse de que la imagen por defecto se establezca en caso de error
      }
    };

    cargarDatosEmpresa();
  }, [id]);

  if (!empresa) {
    return <div>Cargando...</div>;
  }
  // Función para alternar la visualización de la descripción
  const toggleDescripcion = () => {
    setVerDescripcionCompleta(!verDescripcionCompleta);
  };

  const mensajeEmpleos = `Hay ${empleos.length} empleo${empleos.length !== 1 ? 's' : ''} en ${empresa.nombreEmpresa}`;

  return (
    <div className='App'>
      <TabsAdministracionComp />
      <Container className="perfil-empresa mt-4">
        <Row>
          <Col md={4}>
            <Card className="card-empresa">

              <Card.Body>
                <div className="image-container text-center mb-3">
                  <Image src={imagenPreview || defaultImage} alt="Foto de perfil" roundedCircle className="img-fluid" />
                </div>
                <div className="text-center">
                  <Card.Title><strong>{empresa.nombreEmpresa}</strong></Card.Title>
                </div>
                <ListGroup variant="flush">
                  <ListGroup.Item>Correo: {empresa.correo}</ListGroup.Item>
                  <ListGroup.Item>Dirección: {empresa.direccion}</ListGroup.Item>
                  <ListGroup.Item>Teléfono: {empresa.telefono}</ListGroup.Item>

                  <ListGroup.Item>
                    Descripción: {verDescripcionCompleta
                      ? empresa.descripcion
                      : `${empresa.descripcion.substring(0, 100)}...`}
                    <Button variant="link" onClick={toggleDescripcion}>
                      {verDescripcionCompleta ? 'Ver menos' : 'Ver más'}
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
          <Col md={8}>
            <Card className="card-empleos">
              <Card.Body>
                <h3 className="titulo-empleos-publicados">{mensajeEmpleos}</h3>
                {empleos.length > 0 ? (
                  <ListaEmpleosPerfilEmpresa empleos={empleos} />
                ) : (
                  <p>No hay empleos publicados actualmente.</p>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>

  );
};

export default PerfilEmpresaAdmin;
