import React, { useState } from 'react';
import { Modal, Button, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';

const DetalleEmpleoPostuladoModal = ({ show, onHide, empleo }) => {
    const [showDetails, setShowDetails] = useState({
        puesto: false,
        descripcion: false,
        conocimientos: false,
        aptitudes: false,
        modalidad: false,
        formacionAcademica: false,
        experienciarequerida: false,
    });

    const toggleDetails = (key) => {
        setShowDetails(prevState => ({ ...prevState, [key]: !prevState[key] }));
    };

    const renderSection = (key, title, content) => (
        <Card>
            <Card.Header as="h7">
                <strong>{title}
                </strong>
                <FontAwesomeIcon
                    icon={showDetails[key] ? faAngleUp : faAngleDown}
                    onClick={() => toggleDetails(key)}
                    style={{ float: 'right', cursor: 'pointer' }}
                />
            </Card.Header>
            {showDetails[key] && <Card.Body>{content || 'No disponible'}</Card.Body>}
        </Card>
    );

    return (
        <Modal show={show} onHide={onHide} >
            <Modal.Header closeButton>
                <Modal.Title>Detalles del Empleo Postulado</Modal.Title>
            </Modal.Header>
            <Modal.Body >
                {empleo ? (
                    <>
                        {renderSection('puesto', 'Puesto', empleo.puesto)}
                        {renderSection('descripcion', 'Descripción', empleo.descripcion)}
                        {renderSection('formacionAcademica', 'Formación Académica', empleo.formacionAcademica)}
                        {renderSection('conocimientos', 'Conocimientos Requeridos', empleo.conocimientos)}
                        {renderSection('experienciarequerida', 'Experiencia Requerida', empleo.experienciarequerida)}
                        {renderSection('aptitudes', 'Aptitudes Necesarias', empleo.aptitudes)}
                        <Card>
                            <Card.Header > <strong>Modalidad
                            </strong> </Card.Header>
                            <Card.Body>{empleo.modalidad || 'No disponible'}</Card.Body>
                        </Card>
                    </>
                ) : (
                    <p>No disponible</p>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>Cerrar</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DetalleEmpleoPostuladoModal;
