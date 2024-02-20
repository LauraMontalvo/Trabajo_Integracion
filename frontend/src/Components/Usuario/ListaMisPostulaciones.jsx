import React, { useState } from 'react';

import { ListGroup, Row, Col, Button, Modal ,OverlayTrigger,Tooltip} from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle, faTrashAlt, faHourglass, faCheckCircle, faTimesCircle,faEye,faFileAlt } from '@fortawesome/free-solid-svg-icons';
import "../../Styles/loginstyle.css"
import "../../Styles/detalle.scss"
import DetalleEmpleoPostuladoModal from './DetalleEmpleoPostuladoModal'; // Asegúrate de que la ruta sea correcta
import axios from 'axios';

const ListaMisPostulaciones = ({
    postulaciones,
    handleShowModal,
    eliminarPostulacion,
    showModal,
    setShowModal,
    empleoSeleccionado,
    setPostulaciones, // Usa esta función para actualizar el estado

}) => {
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [selectedPostulacionId, setSelectedPostulacionId] = useState(null);
    const handleConfirmInactivar = (idPostulacion) => {
        setSelectedPostulacionId(idPostulacion);
        setShowConfirmModal(true);
    };
    const {id} = useParams();
    
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
    const renderMotivoRechazo = (postulacion) => {
        if (postulacion.estado === 'Negada' && postulacion.motivoRechazo) {
            return (
                <OverlayTrigger
                    placement="top"
                    overlay={
                        <Tooltip id={`tooltip-icon-button-${postulacion._id}`}>
                            {postulacion.motivoRechazo}
                        </Tooltip>
                    }
                >
                    <FontAwesomeIcon icon={faEye} className="ms-2 icon-button" />
                </OverlayTrigger>
            );
        }
        return null;
    };
    const inactivarPostulacion = async () => {
        if (selectedPostulacionId) {
            try {
                const response = await axios.put(`https://46wm6186-8000.use.devtunnels.ms/api/postulation/${selectedPostulacionId}`, {
                    estadoPostulacion: 'Inactivo'
                });
    
                // Si la operación fue exitosa, actualiza el estado para reflejar el cambio.
                if (response.data) {
                    const updatedPostulaciones = postulaciones.map(postulacion => {
                        if (postulacion._id === selectedPostulacionId) {
                            return { ...postulacion, estadoPostulacion: 'Inactivo' }; // Actualiza el estado de la postulación específica
                        }
                        return postulacion; // Retorna las postulaciones que no han cambiado
                    });
    
                    // Filtra las postulaciones inactivas para no mostrarlas en la lista
                    const activePostulaciones = updatedPostulaciones.filter(postulacion => postulacion.estadoPostulacion !== 'Inactivo');
                    setShowConfirmModal(false);
                    setPostulaciones(activePostulaciones); // Actualiza el estado con las postulaciones activas
                }
            } catch (error) {
                console.error('Error al inactivar postulación:', error);
                // Asegúrate de manejar el error aquí, como mostrar un mensaje al usuario.
            }
        }
    };
 
      const postulacionesActivas = postulaciones.filter(postulacion => 
        postulacion.idEmpleo && postulacion.estadoPostulacion !== 'Inactivo' && postulacion.idEmpleo.estado === 'Activo'
      );
    return (
        <>
            {postulaciones.length > 0 ? (
                <ListGroup className="empleos-lista">
                    {postulacionesActivas.map((postulacion) => (
                        postulacion.estadoPostulacion !== 'Inactivo' && (
                            <ListGroup.Item key={postulacion._id} className="mt-4 border p-3 position-relative">
                                <Row>
                                    <Col>
                                        <div className="empleo-detalle">
                                            <strong>Empresa:</strong>{" "}
                                            <Link to={`/perfilEmpresa/${id}/${postulacion.idEmpleo?.idEmpresa?._id}`}>
                                                {postulacion.idEmpleo?.idEmpresa?.nombreEmpresa}
                                            </Link>                                            
                                            <FontAwesomeIcon
                                                icon={faInfoCircle}
                                                className="icon-button"
                                                onClick={() => handleShowModal(postulacion.idEmpleo)}
                                            />
                                        </div>
                                    </Col>
                                    <Col>
                                    <div className="empleo-detalle">
                                        <span>
                                            <strong>Estado:</strong> {postulacion.estado}
                                            <strong> {renderEstadoIcono(postulacion.estado)}</strong>
                                            {renderMotivoRechazo(postulacion)}
                                        </span>
                                    </div>
                                    </Col>
                                </Row>
                                <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
                                    <FontAwesomeIcon
                                        icon={faTrashAlt}
                                        className="text-danger"
                                        style={{ cursor: 'pointer', fontSize: '1.5em' }}
                                        onClick={() => handleConfirmInactivar(postulacion._id)}

                                    />
                                </div>

                            </ListGroup.Item>
                        )
                    ))}
                </ListGroup>
            ) : (
                <p>No tienes postulaciones.</p>
            )}
            <DetalleEmpleoPostuladoModal
                show={showModal}
                onHide={() => setShowModal(false)}
                empleo={empleoSeleccionado}
            />
            <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmar Inactivación</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    ¿Estás seguro de que deseas eliminar esta postulación?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowConfirmModal(false)}>
                        Cancelar
                    </Button>
                    <Button variant="danger" onClick={inactivarPostulacion}>
                        Inactivar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ListaMisPostulaciones;
