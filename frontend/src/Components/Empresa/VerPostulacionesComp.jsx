import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    ListGroup, Button, Badge, Form, Modal, Tooltip, OverlayTrigger
} from 'react-bootstrap';import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faHourglass, faCheckCircle, faTimesCircle, faUser, faInfoCircle
} from '@fortawesome/free-solid-svg-icons';import { Link ,useParams} from 'react-router-dom';
import "../../Styles/Lista.scss"
import * as constantes from '../../Models/Constantes'

// Estilo personalizado para los botones
const buttonStyle = {
    margin: '0 5px',
};

const VerPostulaciones = ({ idEmpleo, postulantes }) => {
    const [postulantesList, setPostulantesList] = useState(postulantes);

    const [showRejectionModal, setShowRejectionModal] = useState(false);
    const [selectedReason, setSelectedReason] = useState('');
    const [postulationToReject, setPostulationToReject] = useState(null);
    const {id} = useParams();
    const openRejectionModal = (idPostulacion) => {
        setPostulationToReject(idPostulacion);
        setShowRejectionModal(true);
    };

    const handleRejectPostulation = async () => {
        if (!selectedReason) {
            alert("Por favor, selecciona un motivo de rechazo.");
            return;
        }

        try {
            await axios.put(`${constantes.URL_MOTIVO_RECHAZO_POSTULACION}/${postulationToReject}`, {
                estado: 'Negada',
                motivoRechazo: selectedReason
            });
            setPostulantesList(prevPostulantes =>
                prevPostulantes.map(postulacion =>
                    postulacion._id === postulationToReject ? { ...postulacion, estado: 'Negada', motivoRechazo: selectedReason } : postulacion
                )
            );
            setShowRejectionModal(false);
        } catch (error) {
            console.error('Error al rechazar la postulación:', error);
        }
    };
    useEffect(() => {
        const postulantesFiltrados = postulantes.filter(postulacion => postulacion.idUsuario && postulacion.idUsuario.estado !== 'Eliminado');
        setPostulantesList(postulantesFiltrados);
    }, [postulantes]);
    
    
    useEffect(() => {
        // Utilizado para el seguimiento de cambios en postulantesList
        console.log(postulantesList);
    }, [idEmpleo, postulantesList]);

    const actualizarEstadoPostulacion = async (idPostulacion, nuevoEstado) => {
        try {
            await axios.put(`${constantes.URL_MOTIVO_RECHAZO_POSTULACION}/${idPostulacion}`, { estado: nuevoEstado });
            setPostulantesList(prevPostulantes =>
                prevPostulantes.map(postulacion =>
                    postulacion._id === idPostulacion ? { ...postulacion, estado: nuevoEstado } : postulacion
                )
            );
        } catch (error) {
            console.error('Error al actualizar el estado de la postulación:', error);
        }
    };

    const renderEstado = (estado) => {
        const estados = {
            'En Espera': { icon: faHourglass, color: 'warning' },
            'Aceptada': { icon: faCheckCircle, color: 'success' },
            'Negada': { icon: faTimesCircle, color: 'danger' },
        };

        const { icon, color } = estados[estado] || {};
        return (
            <Badge bg={color} className="d-flex align-items-center">
                <FontAwesomeIcon icon={icon} className="me-2" />
                {estado}
            </Badge>
        );
    };
    return (<>
            <ListGroup className="list-group-flush">
            {postulantesList.map(postulacion => (
                
                <ListGroup.Item key={postulacion._id} className="d-flex flex-column flex-md-row justify-content-between align-items-center">
                    
                    <div className="mb-2 mb-md-0 d-flex align-items-center">
                        
                        <FontAwesomeIcon icon={faUser} className="me-2" />
                        <Link to={`/perfilUsuario/${id}/${postulacion.idUsuario?._id}`}>
                            {postulacion.idUsuario?.nombre} {postulacion.idUsuario?.apellido}
                        </Link>
                        
                    </div>
                    <div className="mb-2 mb-md-0 text-center">
                        {renderEstado(postulacion.estado)}
                        
                    </div>
                    
                    <div>
                        <Button
                            variant="success"


                            onClick={() => actualizarEstadoPostulacion(postulacion._id, 'Aceptada')}
                            disabled={postulacion.estado === 'Aceptada' || postulacion.estado === 'Negada'}
                            style={buttonStyle}
                            className="ver-postulaciones-button"

                        >
                            Aceptar
                        </Button>
                        <Button
                            variant="danger"
                            className="ver-postulaciones-button"

                            onClick={() => openRejectionModal(postulacion._id, 'Negada')}
                            disabled={postulacion.estado === 'Aceptada' || postulacion.estado === 'Negada'}
                            style={buttonStyle}
                        >
                            Negar
                        </Button>
                        <div>
                        {postulacion.estado === 'Negada' && postulacion.motivoRechazo && (
                            <div className="w-100 text-center">
                                <Badge bg="secondary">Motivo del Rechazo: {postulacion.motivoRechazo}</Badge>
                            </div>
                        )}
                        </div>
                       
                    </div>
                 
                </ListGroup.Item>
                
            ))}
            
        </ListGroup>

        <Modal show={showRejectionModal} onHide={() => setShowRejectionModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Selecciona un Motivo de Rechazo</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    {['Fuera de rango de edad', 'Formacion académica', 'Plaza ya no disponible', 'Información incompleta', 'Otro'].map((reason) => (
                        <div key={reason} className="mb-3">
                            <Form.Check
                                type='radio'
                                id={`rejection-reason-${reason}`}
                                name="rejectionReason"
                                label={reason}
                                onChange={() => setSelectedReason(reason)}
                                checked={selectedReason === reason}
                            />
                        </div>
                    ))}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowRejectionModal(false)}>
                    Cancelar
                </Button>
                <Button variant="danger" onClick={handleRejectPostulation}>
                    Negar con Motivo
                </Button>
            </Modal.Footer>
        </Modal>
    </>

    );
};

export default VerPostulaciones;
