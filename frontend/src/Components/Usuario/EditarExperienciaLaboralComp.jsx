import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Row, Col, Alert, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase, faBuilding, faCalendarAlt, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import * as constantes from '../../Models/Constantes'
// ... Importaciones adicionales si son necesarias ...
const EditarExperienciaLaboral = ({ idExperiencia, onExperienciaEdited, closeEditModal }) => {
    // Estados para los datos del formulario
    const [descripcionResponsabilidades, setDescripcionResponsabilidades] = useState('');
    const [ambitoLaboral, setAmbitoLaboral] = useState('');
    const [empresa, setEmpresa] = useState('');
    const [puesto, setPuesto] = useState('');
    const [fechaInicio, setFechaInicio] = useState('');
    const [fechaFin, setFechaFin] = useState('');
    // Estados para los mensajes de error de validación
    const [descripcionResponsabilidadesError, setDescripcionResponsabilidadesError] = useState('');
    const [ambitoLaboralError, setAmbitoLaboralError] = useState('');
    const [empresaError, setEmpresaError] = useState('');
    const [puestoError, setPuestoError] = useState('');
    const [fechaInicioError, setFechaInicioError] = useState('');
    const [fechaFinError, setFechaFinError] = useState('');

    const [error, setError] = useState('');
    const [showSuccessModal, setShowSuccessModal] = useState(false);


    const handleSuccessModalClose = () => {
        setShowSuccessModal(false);
        if (closeEditModal) {
            closeEditModal();
        }
    };
    useEffect(() => {
        axios.get(`${constantes.URL_EDITAR_U_OBTENER_EXPERIENCIA_LABORAL}/${idExperiencia}`)
            .then(response => {
                // Aquí estableces los estados con los datos obtenidos
                setDescripcionResponsabilidades(response.data.descripcionResponsabilidades);
                setAmbitoLaboral(response.data.ambitoLaboral);
                setEmpresa(response.data.empresa);
                setPuesto(response.data.puesto);
                setFechaInicio(toShortDateFormat(response.data.fechaInicio));
                setFechaFin(toShortDateFormat(response.data.fechaFin));
            })
            .catch(error => {
                console.error('Error al cargar la experiencia', error);
                setError('Error al cargar datos de la experiencia laboral');
            });
    }, [idExperiencia]);

    const handleSubmit = (e) => {
        e.preventDefault();
        // ... Aquí incluyes tus validaciones ...

        axios.put(`${constantes.URL_EDITAR_U_OBTENER_EXPERIENCIA_LABORAL}/${idExperiencia}`, {
            descripcionResponsabilidades,
            ambitoLaboral,
            puesto,
            empresa,
            fechaInicio,
            fechaFin
        })
            .then(response => {
                // Llamar a la función callback después de una actualización exitosa

                if (onExperienciaEdited) {
                    onExperienciaEdited(); // Llama a la función callback
                }
                setShowSuccessModal(true);  // Muestra el modal de éxito
            })
            .catch(error => {
                console.error('Error al actualizar la experiencia', error);
                setError('Error al actualizar la experiencia laboral');
            });
    };

    function toShortDateFormat(dateString) {
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
    }

    return (
        <Form onSubmit={handleSubmit} className="mi-formulario">
            {error && <Alert variant="danger">{error}</Alert>}
            <Row>
            <Col md={12}>
                    <Form.Group>
                        <Form.Label>Puesto</Form.Label>
                        <div className="input-icon-wrapper">
                            <FontAwesomeIcon icon={faBriefcase} className="input-icon" />
                            <Form.Control
                                as="textarea"
                                rows={4}
                                placeholder="Ingrese la descripción de sus responsabilidades"
                                value={puesto}
                                onChange={e => setPuesto(e.target.value)}
                            />
                        </div>

                    </Form.Group>
                </Col>
                <Col md={12}>
                    <Form.Group>
                        <Form.Label>Descripción de Responsabilidades</Form.Label>
                        <div className="input-icon-wrapper">
                            <FontAwesomeIcon icon={faBriefcase} className="input-icon" />
                            <Form.Control
                                as="textarea"
                                rows={4}
                                placeholder="Ingrese la descripción de sus responsabilidades"
                                value={descripcionResponsabilidades}
                                onChange={e => setDescripcionResponsabilidades(e.target.value)}
                            />
                        </div>

                    </Form.Group>
                </Col>
                {/* ... Campos adicionales ... */}
                <Col md={12}>
                    <Form.Group>
                        <Form.Label>Ámbito Laboral/Departamento</Form.Label>
                        <div className="input-icon-wrapper">
                            <FontAwesomeIcon icon={faBuilding} className="input-icon" />
                            <Form.Control
                                as="textarea"
                                rows={4}
                                placeholder="Ingrese el ámbito laboral"
                                value={ambitoLaboral}
                                onChange={e => setAmbitoLaboral(e.target.value)}
                            />
                        </div>
                    </Form.Group>
                </Col>
                <Col md={12}>
                    <Form.Group>
                        <Form.Label>Empresa/Razón Social</Form.Label>
                        <div className="input-icon-wrapper">
                            <FontAwesomeIcon icon={faBuilding} className="input-icon" />
                            <Form.Control
                                type="text"
                                placeholder="Ingrese el nombre de la empresa"
                                value={empresa}
                                onChange={e => setEmpresa(e.target.value)}
                            />
                        </div>
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group>
                        <Form.Label>Fecha de Inicio</Form.Label>
                        <div className="input-icon-wrapper">
                            <FontAwesomeIcon icon={faCalendarAlt} className="input-icon" />
                            <Form.Control
                                type="date"
                                value={fechaInicio}
                                onChange={e => setFechaInicio(e.target.value)}
                            />
                        </div>
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group>
                        <Form.Label>Fecha de Fin</Form.Label>
                        <div className="input-icon-wrapper">
                            <FontAwesomeIcon icon={faCalendarAlt} className="input-icon" />
                            <Form.Control
                                type="date"
                                value={fechaFin}
                                onChange={e => setFechaFin(e.target.value)}
                            />
                        </div>
                    </Form.Group>
                </Col>
            </Row>
            <div className="botones-centrados">
                <Button type="submit" className='btn-primary'>Guardar Cambios</Button>
            </div>
            <Modal show={showSuccessModal} onHide={handleSuccessModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title className='tituloModal'>
                        <FontAwesomeIcon icon={faCheckCircle} className="text-success me-2" />Usuario actualizado con éxito</Modal.Title>
                </Modal.Header>
                <Modal.Body className='tituloModalBody' >La información ha sido actualizada correctamente.</Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={handleSuccessModalClose}>
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>
        </Form>
    );
};

export default EditarExperienciaLaboral;
