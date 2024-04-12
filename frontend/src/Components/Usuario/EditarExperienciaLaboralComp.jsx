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

    const validarDescripcionResponsabilidades = (descripcion) => {
        if (!descripcion.trim()) return "La descripción de responsabilidades es obligatoria.";
        return "";
    };

    const validarAmbitoLaboral = (ambito) => {
        if (!ambito.trim()) return "El ámbito laboral es obligatorio.";
        return "";
    };
    const validarPuesto = (puesto) => {
        if (!puesto.trim()) return "El puesto es obligatorio.";
        return "";
    };
    const validarEmpresa = (empresa) => {
        if (!empresa.trim()) return "El nombre de la empresa/razón social es obligatoria.";
     
        return "";
    };
    const validateFechaInicio = (fecha, setError) => {
        if (!fecha) {
            setError("La fecha de inicio es obligatoria.");
        } else if (new Date(fecha) > new Date()) {
            setError("La fecha de inicio no puede ser una fecha futura.");
        } else {
            setError("");
        }
    };
    
    const validateFechaFin = (fecha, setError, fechaInicio) => {
        if (!fecha) {
            setError("La fecha de fin es obligatoria.");
        } else if (new Date(fecha) < new Date(fechaInicio)) {
            setError("La fecha de fin debe ser posterior a la fecha de inicio.");
        } else if (new Date(fecha) > new Date()) {
            setError("La fecha de fin no puede ser una fecha futura.");
        } else {
            setError("");
        }
    };
    const handleDescripcionResponsabilidadesChange = (e) => {
        const value = e.target.value;
        setDescripcionResponsabilidades(value);
        const error = validarDescripcionResponsabilidades(value);
        setDescripcionResponsabilidadesError(error);
    };
    const handlePuestoChange = (e) => {
        const value = e.target.value;
        setPuesto(value);
        const error = validarPuesto(value);
        setPuestoError(error);
    };
    const handleAmbitoLaboralChange = (e) => {
        const value = e.target.value;
        setAmbitoLaboral(value);
        const error = validarAmbitoLaboral(value);
        setAmbitoLaboralError(error);
    };
    const handleEmpresaChange = (e) => {
        const value = e.target.value;
        setEmpresa(value);
        const error = validarEmpresa(value);
        setEmpresaError(error);
    };
    const handleFechaInicioChange = (e) => {
        const value = e.target.value;
        setFechaInicio(value);
        validateFechaInicio(value, setFechaInicioError); 
    };
    
    const handleFechaFinChange = (e) => {
        const value = e.target.value;
        setFechaFin(value);
        validateFechaFin(value, setFechaFinError, fechaInicio); // Esto también
    };
    useEffect(() => {
        axios.get(`${constantes.URL_EDITAR_U_OBTENER_EXPERIENCIA_LABORAL}/${idExperiencia}`)
            .then(response => {
           
                const { descripcionResponsabilidades, ambitoLaboral, empresa, puesto, fechaInicio, fechaFin } = response.data;
                setDescripcionResponsabilidades(descripcionResponsabilidades);
                setAmbitoLaboral(ambitoLaboral);
                setEmpresa(empresa);
                setPuesto(puesto);
                setFechaInicio(toShortDateFormat(fechaInicio));
                setFechaFin(toShortDateFormat(fechaFin));
            })
            .catch(error => {
                console.error('Error al cargar la experiencia', error);
                setError('Error al cargar datos de la experiencia laboral');
            });
    }, [idExperiencia]);

    const handleSubmit = (e) => {
        e.preventDefault();

        validarDescripcionResponsabilidades(descripcionResponsabilidades);
        validarAmbitoLaboral(ambitoLaboral);
        validarPuesto(puesto);
        validarEmpresa(empresa);
    
   
        validateFechaInicio(fechaInicio, setFechaInicioError);
        validateFechaFin(fechaFin, setFechaFinError, fechaInicio);
        
        if (descripcionResponsabilidadesError || ambitoLaboralError || puestoError || empresaError || fechaInicioError || fechaFinError) {
       
            return; // Detiene la ejecución si hay errores
        }

        axios.put(`${constantes.URL_EDITAR_U_OBTENER_EXPERIENCIA_LABORAL}/${idExperiencia}`, {
            descripcionResponsabilidades,
            ambitoLaboral,
            puesto,
            empresa,
            fechaInicio,
            fechaFin
        })
            .then(() => {
                if (onExperienciaEdited) {
                    onExperienciaEdited();
                }
                setShowSuccessModal(true);
            })
            .catch(error => {
                console.error('Error al actualizar la experiencia', error);
                setError('Error al actualizar la experiencia laboral');
            });
    };

    const validarCampos = () => {
        if (!descripcionResponsabilidades.trim() || !ambitoLaboral.trim() || !empresa.trim() || !puesto.trim() || !fechaInicio.trim() || !fechaFin.trim()) {
            setError('Todos los campos son obligatorios');
            return false;
        }
        setError('');
        return true;
    };

    function toShortDateFormat(dateString) {
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
    }

    const handleSuccessModalClose = () => {
        setShowSuccessModal(false);
        if (closeEditModal) {
            closeEditModal();
        }
    };


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
                                type="text" // Cambiado de 'as="textarea"' a 'type="text"' si solo es un input de una línea
                                placeholder="Ingrese su puesto"
                                value={puesto}
                                isInvalid={!!puestoError}
                                onChange={handlePuestoChange}
                            />

                        </div>
                        {puestoError && <p className="text-danger">{puestoError}</p>}

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
                                isInvalid={!!descripcionResponsabilidadesError}
                                onChange={handleDescripcionResponsabilidadesChange}
                            />
                        </div>
                        {descripcionResponsabilidadesError && <p className="text-danger">{descripcionResponsabilidadesError}</p>}

                    </Form.Group>
                </Col>
                {/* ... Campos adicionales ... */}
                <Col md={12}>
                    <Form.Group>
                        <Form.Label>Ámbito Laboral/Departamento</Form.Label>
                        <div className="input-icon-wrapper">
                            <FontAwesomeIcon icon={faBuilding} className="input-icon" />
                            <Form.Control
                                type="text"
                                placeholder="Ingrese el ámbito laboral o departamento"
                                value={ambitoLaboral}
                                isInvalid={!!ambitoLaboralError}
                                onChange={handleAmbitoLaboralChange}
                            />
                        </div>
                        {ambitoLaboralError && <p className="text-danger">{ambitoLaboralError}</p>}

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
            isInvalid={!!empresaError}
            onChange={handleEmpresaChange}
        />
                        </div>
                        {empresaError && <p className="text-danger">{empresaError}</p>}

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
                                isInvalid={!!fechaInicioError}
                                onChange={handleFechaInicioChange}
                            />
                        </div>
                        {fechaInicioError && <p className="text-danger">{fechaInicioError}</p>}

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
                                isInvalid={!!fechaFinError}
                                onChange={handleFechaFinChange}
                            />
                        </div>
                        {fechaFinError && <p className="text-danger">{fechaFinError}</p>}
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
