import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Button, Modal, Row, Col, Accordion, Form, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle, faHourglass, faTrash, faUser, faUsers, faBriefcase, faBuilding } from '@fortawesome/free-solid-svg-icons';
import TabsAdministracionComp from '../../Components/Administracion/TabsAdministracionComp';
import "../../Styles/ListaEmpresa.scss";
import * as constantes from '../../Models/Constantes'

const ListaPostulacionesAdmin = () => {
    const [empleos, setEmpleos] = useState([]);
    const [filteredEmpleos, setFilteredEmpleos] = useState([]);
    const [acordeonesAbiertos, setAcordeonesAbiertos] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [postulacionesActuales, setPostulacionesActuales] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [empleoAEliminar, setEmpleoAEliminar] = useState(null);
    const [postulacionAEliminar, setPostulacionAEliminar] = useState(null);
    const [showConfirmModalEmpleo, setShowConfirmModalEmpleo] = useState(false);
    const [showConfirmModalPostulacion, setShowConfirmModalPostulacion] = useState(false);
    const [mostrarActivos, setMostrarActivos] = useState(true);
    const [mostrarInactivos, setMostrarInactivos] = useState(false);

    const cardClass = (estado) => {
        return estado === 'Activo' ? '' : 'tarjeta-inactiva';
    };
    const renderEstadoEmpleo = (estado) => {
        const color = estado === 'Activo' ? 'text-success' : 'text-danger';
        return <span className={color}>{estado}</span>;
    };
    const confirmarEliminacionEmpleo = (empleoId) => {
        setEmpleoAEliminar(empleoId);
        setShowConfirmModalEmpleo(true);
    };

    const confirmarEliminacionPostulacion = (postulacionId) => {
        setPostulacionAEliminar(postulacionId);
        setShowConfirmModalPostulacion(true);
    };


    const abrirModalPostulantes = (postulaciones) => {
        setPostulacionesActuales(postulaciones);
        setShowModal(true);
    };
    const toggleAcordeon = (idEmpleo) => {
        setAcordeonesAbiertos({
            ...acordeonesAbiertos,
            [idEmpleo]: !acordeonesAbiertos[idEmpleo]
        });
    };
    // Función para eliminar una postulación
    const eliminarPostulacion = async () => {
        if (postulacionAEliminar) {
            try {
                await axios.delete(`${constantes.URL_ELIMINAR_UNA_POSTULACION}/${postulacionAEliminar}`);
                const nuevasPostulaciones = postulacionesActuales.filter(postulacion => postulacion._id !== postulacionAEliminar);
                setPostulacionesActuales(nuevasPostulaciones);
                setShowConfirmModalPostulacion(false);
                setPostulacionAEliminar(null);
            } catch (error) {
                console.error('Error al eliminar la postulación:', error);
                // Manejar el error adecuadamente
            }
        }
    };
    // Función para eliminar un empleo
    const eliminarEmpleo = async () => {
        if (empleoAEliminar) {
            try {
                await axios.delete(`${constantes.URL_ELIMINAR_UN_EMPLEO}/${empleoAEliminar}`);
                const empleosActualizados = empleos.filter(empleo => empleo._id !== empleoAEliminar);
                setEmpleos(empleosActualizados);
                setFilteredEmpleos(empleosActualizados);
                setShowConfirmModalEmpleo(false);
                setEmpleoAEliminar(null);
            } catch (error) {
                console.error('Error al eliminar el empleo:', error);

            }
        }
    };
    const renderEstadoIcono = (estado) => {
        switch (estado) {
            case 'En Espera':
                return <FontAwesomeIcon icon={faHourglass} className="icono-en-espera" />;
            case 'Aceptada':
                return <FontAwesomeIcon icon={faCheckCircle} className="icono-aceptada" />;
            case 'Negada':
                return <FontAwesomeIcon icon={faTimesCircle} className="icono-negada" />;
            default:
                return null;
        }
    };
    useEffect(() => {
        const obtenerEmpleosConPostulaciones = async () => {
            try {
                const respuestaEmpleos = await axios.get(constantes.URL_OBTENER_EMPLEOS);
                const empleosConPostulaciones = await Promise.all(respuestaEmpleos.data.map(async (empleo) => {
                    const respuestaPostulaciones = await axios.get(`${constantes.URL_OBTENER_POSTULANTES_CON_SU_EMPLEO}/${empleo._id}`);
                    return { ...empleo, postulaciones: respuestaPostulaciones.data };
                }));
                setEmpleos(empleosConPostulaciones);
                setFilteredEmpleos(empleosConPostulaciones); // Inicialmente mostrar todos los empleos
            } catch (error) {
                console.error('Error al obtener empleos y postulaciones:', error);
            }
        };
        obtenerEmpleosConPostulaciones();
    }, []);
    useEffect(() => {
        const filtered = empleos.filter((empleo) => {
            const coincideConBusqueda = empleo.puesto.toLowerCase().includes(searchQuery.toLowerCase()) ||
                empleo.idEmpresa.nombreEmpresa.toLowerCase().includes(searchQuery.toLowerCase());

            // Si ambos checkboxes están desactivados, mostrar todos
            if (!mostrarActivos && !mostrarInactivos) {
                return coincideConBusqueda;
            }

            // Si el checkbox de activos está seleccionado, filtrar los activos
            const activo = mostrarActivos && empleo.estado === 'Activo';

            // Si el checkbox de inactivos está seleccionado, filtrar los inactivos
            const inactivo = mostrarInactivos && empleo.estado === 'Inactivo';

            return coincideConBusqueda && (activo || inactivo);
        });

        setFilteredEmpleos(filtered);
    }, [searchQuery, empleos, mostrarActivos, mostrarInactivos]);
    return (
        <>

            <div className='App'>

                <TabsAdministracionComp />
                <Container fluid className="mt-4">
                    <Row>
                        <Col md={3} className="widget">
                            <h4>Filtrar Empleos</h4>
                            <Form.Group className="mb-3">
                                <Form.Control
                                    type="text"
                                    placeholder="Buscar por nombre de empresa o empleo"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Check
                                    type="checkbox"
                                    label="Mostrar empleos activos"
                                    checked={mostrarActivos}
                                    onChange={(e) => setMostrarActivos(e.target.checked)}
                                />
                                <Form.Check
                                    type="checkbox"
                                    label="Mostrar empleos inactivos"
                                    checked={mostrarInactivos}
                                    onChange={(e) => setMostrarInactivos(e.target.checked)}
                                />
                            </Form.Group>
                        </Col>

                        <Col md={9}>
                            <Col md={12} className="mb-3">
                                <strong>Total de Empleos: </strong> {filteredEmpleos.length}
                            </Col>
                            {filteredEmpleos.length > 0 ? (
                                <Row>
                                    {filteredEmpleos.map((empleo) => (
                                        <Col xs={12} md={6} lg={5} key={empleo._id} className="mb-4">
                                            <Card className={`empresa-card ${cardClass(empleo.estado)}`}>
                                                <Card.Body>
                                                    <Row className="empleo-detalle">
                                                        <Col md={12}>

                                                            <Card.Title>
                                                                <FontAwesomeIcon icon={faBriefcase} className="me-2" /> {/* Ícono de Puesto */}
                                                                {empleo.puesto}
                                                            </Card.Title>
                                                            <Card.Subtitle className="mb-2 text-muted">
                                                                <FontAwesomeIcon icon={faBuilding} className="me-2" /> {/* Ícono de Empresa */}
                                                                <strong>{empleo.idEmpresa?.nombreEmpresa || 'Nombre de Empresa no disponible'}</strong>
                                                            </Card.Subtitle>
                                                            <strong>{renderEstadoEmpleo(empleo.estado)}
                                                            </strong>
                                                            <Card.Text>
                                                                {acordeonesAbiertos[empleo._id] ? empleo.descripcion : `${empleo.descripcion.substring(0, 100)}...`}
                                                            </Card.Text>

                                                            <Button variant="link" onClick={() => toggleAcordeon(empleo._id)}>
                                                                {acordeonesAbiertos[empleo._id] ? 'Ver menos' : 'Ver más'}
                                                            </Button>

                                                        </Col>

                                                    </Row>
                                                    {acordeonesAbiertos[empleo._id] && (
                                                        <Accordion defaultActiveKey="0">
                                                            <Accordion.Item eventKey="0">

                                                                <Accordion.Header> <strong>Detalles adicionales</strong></Accordion.Header>
                                                                <Accordion.Body>
                                                                    <Row className="empleo-detalle">
                                                                        <Col xs={12} md={6}>
                                                                            <strong>Formación Académica:</strong>
                                                                            <p>{empleo.formacionAcademica}</p>
                                                                        </Col>
                                                                        <Col xs={12} md={6}>
                                                                            <strong>Conocimientos Requeridos:</strong>
                                                                            <p>{empleo.conocimientos}</p>
                                                                        </Col>
                                                                        <Col xs={12} md={6}>
                                                                            <strong>Aptitudes Necesarias:</strong>
                                                                            <p>{empleo.aptitudes}</p>
                                                                        </Col>
                                                                        <Col xs={12} md={6}>
                                                                            <strong>Experiencia Requerida:</strong>
                                                                            <p>{empleo.experiencia}</p>
                                                                        </Col>
                                                                    </Row>
                                                                    <Row className="empleo-detalle">

                                                                        <Col xs={12} md={6}>
                                                                            <strong>Modalidad:</strong>
                                                                            <p>{empleo.modalidad}</p>
                                                                        </Col>
                                                                    </Row>

                                                                    {/* Omitir botones de acción si no son necesarios */}
                                                                </Accordion.Body>

                                                            </Accordion.Item>

                                                        </Accordion>

                                                    )}

                                                    <div style={{ position: 'relative' }}>
                                                        <div style={{ position: 'absolute', bottom: 10, right: 10 }}>
                                                            <FontAwesomeIcon
                                                                icon={faTrash}
                                                                onClick={() => confirmarEliminacionEmpleo(empleo._id)}
                                                                className="text-danger"
                                                                style={{ cursor: 'pointer', fontSize: '1.2rem' }}
                                                            />
                                                        </div>
                                                    </div>
                                                    <Row className="mt-3">
                                                        <Col className="text-right">
                                                            <Button
                                                                onClick={() => abrirModalPostulantes(empleo.postulaciones)}
                                                                className="ml-auto d-none d-lg-block btn-outline-azul"
                                                            >
                                                                <FontAwesomeIcon icon={faUsers} /> Ver postulantes
                                                            </Button>
                                                            <Button
                                                                onClick={() => abrirModalPostulantes(empleo.postulaciones)}
                                                                className="ml-auto d-lg-none btn-outline-azul"
                                                            >
                                                                <FontAwesomeIcon icon={faUsers} />
                                                            </Button>
                                                        </Col>
                                                    </Row>
                                                </Card.Body>

                                            </Card>

                                        </Col>
                                    ))}
                                </Row>
                            ) : (
                                <p>No hay empleos con postulaciones.</p>
                            )}
                        </Col>
                    </Row>
                </Container>
                {/* Modal para mostrar postulantes */}
                <Modal show={showModal} onHide={() => setShowModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Postulantes</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    {postulacionesActuales.length > 0 ? (
                        postulacionesActuales.map((postulacion) => (
                            <Row key={postulacion._id} className="mb-2 align-items-center">
                                <Col>
                                    <FontAwesomeIcon icon={faUser} className="me-2" />
                                    {postulacion.idUsuario ? `${postulacion.idUsuario.nombre} ${postulacion.idUsuario.apellido}` : 'Usuario no disponible'}
                                </Col>

                                <Col>
                                    {renderEstadoIcono(postulacion.estado)} {postulacion.estado}
                                </Col>
                                <Col xs="auto">
                                    <FontAwesomeIcon
                                        icon={faTrash}
                                        onClick={() => confirmarEliminacionPostulacion(postulacion._id)}
                                        className="text-danger"
                                        style={{ cursor: 'pointer' }}
                                    />
                                </Col>
                            </Row>
                            ))
                            ) : (
                                <p>No existen postulantes por el momento.</p>
                                )}
                    </Modal.Body>
                </Modal>
                <Modal show={showConfirmModalEmpleo} onHide={() => setShowConfirmModalEmpleo(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Confirmar Eliminación</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        ¿Estás seguro de que deseas eliminar este empleo?
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowConfirmModalEmpleo(false)}>
                            Cancelar
                        </Button>
                        <Button variant="danger" onClick={eliminarEmpleo}>
                            Eliminar
                        </Button>
                    </Modal.Footer>
                </Modal>
                <Modal show={showConfirmModalPostulacion} onHide={() => setShowConfirmModalPostulacion(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Confirmar Eliminación</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        ¿Estás seguro de que deseas eliminar esta postulación?
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowConfirmModalPostulacion(false)}>
                            Cancelar
                        </Button>
                        <Button variant="danger" onClick={eliminarPostulacion}>
                            Eliminar
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>

        </>
    );
};

export default ListaPostulacionesAdmin;
