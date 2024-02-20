import React, { useState } from 'react';
import { ListGroup, Row, Col, Accordion, Button } from 'react-bootstrap';
import "../../Styles/detalle.scss"
import "../../Styles/Perfil.scss"
const ListaEmpleosPerfilEmpresa = ({ empleos, mostrarPostulantes }) => {
    const [acordeonesAbiertos, setAcordeonesAbiertos] = useState({});

    const toggleAcordeon = (idEmpleo) => {
        setAcordeonesAbiertos({
            ...acordeonesAbiertos,
            [idEmpleo]: !acordeonesAbiertos[idEmpleo]
        });
    };

    return (
        empleos.length > 0 ? (
            <ListGroup className="empleos-lista">
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
                                    <Accordion.Header>Detalles adicionales</Accordion.Header>
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

                                        {/* Omitir botones de acción si no son necesarios */}
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        )}
                    </ListGroup.Item>
                ))}
            </ListGroup>
        ) : (
            <p>No hay empleos publicados actualmente.</p>
        )
    );
};

export default ListaEmpleosPerfilEmpresa;
