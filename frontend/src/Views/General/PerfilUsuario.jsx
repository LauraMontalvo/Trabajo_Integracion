import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Card, ListGroup, Image, Container, Row, Col, Tab, Tabs, Button } from 'react-bootstrap';
import CabeceraEmpresaInicioComp from '../../Components/Empresa/CabeceraEmpresaInicioComp';
import ImagenPerfil from '../../Components/General/ImagenPerfil';
import defaultImage from '../../img/imagenUsuarioDefecto.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import "../../Styles/detalle.scss"
import CabeceraUsuarioInicio from '../../Components/Usuario/CabeceraUsuarioInicioComp';

function PerfilUsuario(props) {
    const { id, idUsuario, usuario } = useParams();
    const [user, setUser] = useState(null);
    const [acadTraining, setAcadTraining] = useState([]);
    const [experienciaLaboral, setExperienciaLaboral] = useState([]);
    const [imagenPreview, setImagenPreview] = useState(null);
    const [certificaciones, setCertificaciones] = useState([]);
    const [verMasDescripcion, setVerMasDescripcion] = useState(false); // Nuevo estado para controlar la visualización
    const [isLoading, setIsLoading] = useState(true); 


    const esUsuario = usuario == 'usuario';
    const isAuthenticated = props.isAuthenticated;
    //Descripcion
    const toggleVerMasDescripcion = () => {
        setVerMasDescripcion(!verMasDescripcion);
    };
    //

    useEffect(() => {
        const fetchUserData = async () => {
            
            try {
                const userResponse = await axios.get(`https://46wm6186-8000.use.devtunnels.ms/api/user/${idUsuario}`);
                setUser(userResponse.data);

                const acadResponse = await axios.get(`https://46wm6186-8000.use.devtunnels.ms/api/acadTrainings/user/${idUsuario}`);
                setAcadTraining(acadResponse.data);

                const expResponse = await axios.get(`https://46wm6186-8000.use.devtunnels.ms/api/workExperiences/user/${idUsuario}`);
                setExperienciaLaboral(expResponse.data);

                const certiResponse = await axios.get(`https://46wm6186-8000.use.devtunnels.ms/api/certification/user/${idUsuario}`);
                setCertificaciones(certiResponse.data);
                // Obtener la foto del usuario
                const fotoResponse = await axios.get(`https://46wm6186-8000.use.devtunnels.ms/api/user/foto/${idUsuario}`);
                if (fotoResponse.data && fotoResponse.data.foto) {
                    setImagenPreview(fotoResponse.data.foto);
                }
            } catch (error) {
                console.error('Error al cargar los datos:', error);
            }
        };

        fetchUserData();
    }, [idUsuario]);

    const calcularEdad = (fechaNacimiento) => {
        if (!fechaNacimiento) return '';

        const hoy = new Date();
        const nacimiento = new Date(fechaNacimiento);
        let edad = hoy.getFullYear() - nacimiento.getFullYear();
        const mes = hoy.getMonth() - nacimiento.getMonth();

        if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
            edad--;
        }

        return edad;
    };
    if (!user) {
        return <div>Cargando...</div>;
    }
    const format = (dateString) => {
        if (!dateString) {
            return 'No disponible';
        }

        // Ya que la fecha está en formato ISO, simplemente devuelve la parte de la fecha.
        return dateString.split('T')[0];
    };
    const truncateUrl = (url) => {
        const maxChar = 30;
        return url.length > maxChar ? url.substring(0, maxChar) + '...' : url;
    };
    return (
        <div className='App'>
             {esUsuario ? <CabeceraUsuarioInicio isAuthenticated={isAuthenticated} /> : <CabeceraEmpresaInicioComp isAuthenticated={isAuthenticated} />}

            <Container className="mt-4">
                <Row>
                    <Col md={4}>
                        <Card fluid className="datos-personales-card">
                            <Card.Body className="mt-4">
                                <div className="image-container text-center mb-3">
                                    <Image src={user.foto || imagenPreview || defaultImage} alt="Foto de perfil" roundedCircle className="img-fluid" />
                                </div>
                                <ListGroup variant="flush">
                                    <ListGroup.Item className="list-group-item">Nombre: <span className="field-value">{user.nombre} {user.apellido}</span></ListGroup.Item>
                                    <ListGroup.Item>Género: <span className="field-value">{user.sexo}</span></ListGroup.Item>
                                    <ListGroup.Item className="list-group-item">
                                        <span className="field-title">Descripción Personal: </span>
                                        <span className="field-value descripcion-personal">

                                            {verMasDescripcion || user.descripcionPersonal?.length <= 10
                                                ? user.descripcionPersonal
                                                : `${user.descripcionPersonal?.substring(0, 10)}... `}
                                            {user.descripcionPersonal?.length > 10 && (
                                                <Button variant="link" onClick={toggleVerMasDescripcion}>
                                                    {verMasDescripcion ? 'Ver menos' : 'Ver más'}
                                                </Button>
                                            )}
                                        </span>
                                    </ListGroup.Item>
                                    <ListGroup.Item className="list-group-item">
                                        <span className="field-title">Fecha de Nacimiento:</span> <span className="field-value">{format(user.fechaNacimiento)}</span>
                                    </ListGroup.Item>                                 
                                    <ListGroup.Item className="list-group-item">Teléfono: <span className="field-value">{user.telefono}</span></ListGroup.Item>
                                    <ListGroup.Item className="list-group-item">Edad: <span className="field-value">{calcularEdad(user.fechaNacimiento)} años</span></ListGroup.Item>

                                </ListGroup>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={8}>
                        <Tabs defaultActiveKey="academic" id="info-tab" className="mb-3">
                            <Tab eventKey="academic" title="Información Académica">
                                <Card>
                                    <Card.Body>
                                        {acadTraining.length > 0 ? (
                                            acadTraining.map((item) => (
                                                <div key={item._id} className="mb-4 p-3 border rounded">
                                                    <h5 className="mb-2">{item.tituloObtenido}</h5>
                                                    <p className="mb-1"><strong>Institución:</strong> {item.idInstitucion?.nombreInstitucion || 'No disponible'}</p>
                                                    <p className="mb-1"><strong>Ubicación de la Institución: </strong>  {item.idInstitucion?.ubicacion || 'No disponible'}</p>
                                                    <p className="mb-1"><strong>Fecha de Inicio:</strong> {format(item.fechaInicio)}</p>
                                                    <p><strong>Fecha de Fin:</strong> {format(item.fechaFin)}</p>
                                                </div>

                                            ))
                                        ) : (
                                            <p>No se ha registrado formación académica.</p>
                                        )}
                                    </Card.Body>
                                </Card>

                            </Tab>
                            <Tab eventKey="certificaciones" title="Certificaciones">
                                <Card>
                                    <Card.Body>
                                        {certificaciones.length > 0 ? (
                                            certificaciones.map((cert) => (
                                                <div key={cert._id} className="mb-4 p-3 border rounded">
                                                    <h5 className="mb-2">{cert.tituloObtenido}</h5>
                                                    <strong>Titulo Obtenido en la Certificación:</strong><p>{cert.titulo}-  <a href={cert.url} target="_blank" rel="noopener noreferrer" className="certificacion-url">
                                                        {truncateUrl(cert.url)}
                                                        <FontAwesomeIcon icon={faExternalLinkAlt} size="sm" />
                                                    </a></p>
                                                    <p className="mb-1"><strong>Fecha de Expedión:</strong> {format(cert.fechaExpedicion)}</p>

                                                </div>

                                            ))
                                        ) : (
                                            <p>No se ha registrado certificaciones obtenidas</p>
                                        )}
                                    </Card.Body>
                                </Card>
                            </Tab>
                            <Tab eventKey="laboral" title="Experiencia Laboral">
                                <Card>
                                    <Card.Body>
                                        {experienciaLaboral.length > 0 ? (
                                            experienciaLaboral.map((exp) => (
                                                <div key={exp._id} className="mb-4 p-3 border rounded">
                                                    <h5 className="mb-2">{exp.empresa} - puesto {exp.puesto}</h5>
                                                    <p className="mb-1"><strong>Descripción de Responsabilidades:</strong> {exp.descripcionResponsabilidades}</p>
                                                    <p className="mb-1"><strong>Ámbito Laboral/Departamento:</strong> {exp.ambitoLaboral}</p>
                                                    <p className="mb-1"><strong>Fecha de Inicio:</strong> {format(exp.fechaInicio)}</p>
                                                    <p><strong>Fecha de Fin:</strong> {format(exp.fechaFin)}</p>
                                                </div>
                                            ))
                                        ) : (
                                            <p>No hay experiencia laboral registrada.</p>
                                        )}
                                    </Card.Body>
                                </Card>
                            </Tab>

                        </Tabs>
                    </Col>
                </Row>
            </Container>
        </div>

    );
}

export default PerfilUsuario;
