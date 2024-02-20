import React, { useState } from 'react';
import { ListGroup, Row, Col, Modal, Button, Accordion } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faUsers } from '@fortawesome/free-solid-svg-icons';

const EmpleosPublicados = ({ empleos, mostrarPostulantes, handleEditEmpleoClick, handleShowModalEliminar }) => {
    const [acordeonesAbiertos, setAcordeonesAbiertos] = useState({});
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const toggleAcordeon = (idEmpleo) => {
        setAcordeonesAbiertos({
            ...acordeonesAbiertos,
            [idEmpleo]: !acordeonesAbiertos[idEmpleo]
        });
    };

    return (
        empleos.length > 0 ? (
            <ListGroup className="empleos-lista">
                <h3>Empleos publicados</h3>
                {empleos.map((empleo) => (
                    <ListGroup.Item key={empleo._id} className="mt-4 border p-3">

                        <Row className="empleo-detalle">

                            <Col xs={12}>

                                <h6>Puesto:</h6>
                                <p>{empleo.puesto}</p>


                                <h6>Formación Académica Requerida:</h6>
                                <p>{empleo.formacionAcademica}</p>

                                <h6>Descripción del Empleo:</h6>
                                <p>{acordeonesAbiertos[empleo._id] ? empleo.descripcion : `${empleo.descripcion.substring(0, 100)}...`}</p>



                                <Button variant="link" onClick={() => toggleAcordeon(empleo._id)}>
                                    {acordeonesAbiertos[empleo._id] ? 'Ver menos' : 'Ver más'}
                                </Button>

                            </Col>

                        </Row>
                        {acordeonesAbiertos[empleo._id] && (
                            <Accordion defaultActiveKey="0">
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header >  Detalles adicionales </Accordion.Header>
                                    <Accordion.Body>
                                        <Row className="empleo-detalle">

                                            <Col xs={12} md={6}>
                                                <h6>Conocimientos Requeridos:</h6>
                                                <p>{empleo.conocimientos}</p>
                                            </Col>
                                            <Col xs={12} md={6}>
                                                <h6>Aptitudes Necesarias:</h6>
                                                <p>{empleo.aptitudes}</p>
                                            </Col>
                                        </Row>
                                        <Row className="empleo-detalle">
                                            <Col xs={12} md={6}>
                                                <h6>Experiencia Requerida:</h6>
                                                <p>{empleo.experiencia}</p>
                                            </Col>
                                            <Col xs={12} md={6}>
                                                <h6>Modalidad:</h6>
                                                <p>{empleo.modalidad}</p>
                                            </Col>
                                        </Row>

                                        <Button variant="info" className="mt-2" onClick={() => mostrarPostulantes(empleo._id)}>
                                            <FontAwesomeIcon icon={faUsers} /> Ver Postulantes
                                        </Button>
                                        <div className="iconos-acciones" style={{ position: 'absolute', top: '10px', right: '10px' }}>
                                            <FontAwesomeIcon icon={faEdit} className="text-primary mr-2" style={{ cursor: 'pointer', fontSize: '1.5em', marginRight: '15px' }}
                                                onClick={() => handleEditEmpleoClick(empleo._id)}
                                            />
                                         <FontAwesomeIcon icon={faTrashAlt} className="text-danger" style={{ cursor: 'pointer', fontSize: '1.5em' }}
                                onClick={() => handleShowModalEliminar(empleo._id)}
                            />

                                        </div>

                                        

                                    </Accordion.Body>

                                </Accordion.Item>
                            </Accordion>
                        )}
                        {/* ... resto del contenido ... */}
                    </ListGroup.Item>
                ))}
            </ListGroup>
        ) : (
            <p>No hay empleos publicados actualmente.</p>
        )
    );
};

export default EmpleosPublicados;
