import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Form, Row, Col, Modal } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import "../../Styles/loginstyle.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import * as constantes from '../../Models/Constantes';

const EditarEmpresaExterna = ({ id, onEmpresaUpdated, closeEditModal }) => {


    const [nombreEmpresa, setNombreEmpresa] = useState('');
    const [descripcionPublicacion, setDescripcionPublicacion] = useState('');
    const [url, setUrl] = useState('');

    const [nombreEmpresaError, setNombreEmpresaError] = useState('');
    const [descripcionPublicacionError, setDescripcionPublicacionError] = useState('');
    const [urlError, setUrlError] = useState('');
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    useEffect(() => {
        const fetchEmpresaData = async () => {
            try {
                const response = await axios.get(`https://46wm6186-8000.use.devtunnels.ms/api/externalCompany/${id}`);
                const { nombreEmpresa, descripcionPublicacion, url } = response.data;
                setNombreEmpresa(nombreEmpresa);
                setDescripcionPublicacion(descripcionPublicacion);
                setUrl(url);
            } catch (error) {
                console.error("Error al cargar la empresa externa:", error);
            }
        };

        fetchEmpresaData();
    }, [id]);
    const validarNombreEmpresa = (nombre) => {
        if (!nombreEmpresa.trim()) return "El nombre de la empresa es obligatorio.";
        // Aquí puedes agregar más validaciones si es necesario
        return "";
    };

    const validarDescripcion = (descripcion) => {
        if (!descripcionPublicacion.trim()) return "La descripción es obligatoria.";
        // Más validaciones...
        return "";
    };
    const validarUrl = (url) => {
        if (!url.trim()) return "La URL es obligatoria.";
        if (!/^(ftp|http|https):\/\/[^ "]+$/.test(url)) return "La URL no es válida.";
        return "";
    };
    // Manejo del cambio en el nombre de la empresa
    const handleNombreEmpresaChange = (e) => {
        const value = e.target.value;
        setNombreEmpresa(value);
        const error = validarNombreEmpresa(value); // Usando la función de validación existente
        setNombreEmpresaError(error);
    };

    // Manejo del cambio en la descripción de la publicación
    const handleDescripcionPublicacionChange = (e) => {
        const value = e.target.value;
        setDescripcionPublicacion(value);
        const error = validarDescripcion(value); // Usando la función de validación existente
        setDescripcionPublicacionError(error);
    };

    // Manejo del cambio en la URL
    const handleUrlChange = (e) => {
        const value = e.target.value;
        setUrl(value);
        const error = validarUrl(value); // Usando la función de validación existente
        setUrlError(error);
    };
    const handleSuccessModalClose = () => {
        setShowSuccessModal(false); // Cierra el modal de éxito
        closeEditModal(); // Cierra el modal de edición si está presente
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const errorNombreEmpresa = validarNombreEmpresa(nombreEmpresa);
        const errorDescripcion = validarDescripcion(descripcionPublicacion);
        const errorUrl = validarUrl(url);

        // Actualizar estados de error
        setNombreEmpresaError(errorNombreEmpresa);
        setDescripcionPublicacionError(errorDescripcion);
        setUrlError(errorUrl);

        // Verificar si hay errores antes de enviar
        if (errorNombreEmpresa || errorDescripcion || errorUrl) {
            return; // Detener la ejecución si hay errores
        }

        try {
            const response = await axios.put(`https://46wm6186-8000.use.devtunnels.ms/api/externalCompany/${id}`, {
                nombreEmpresa,
                descripcionPublicacion,
                url,
            });
            // Llama a onEmpresaUpdated con los datos actualizados
            onEmpresaUpdated(response.data);
            closeEditModal(); // Cierra el modal si es necesario
            // Muestra el modal de éxito
            setShowSuccessModal(true);
        } catch (error) {
            console.error("Error al actualizar la empresa externa:", error);
        }
    };

    return (
        <div className="container mt-4">
            <Form onSubmit={handleSubmit} className="mi-formulario">
                <Row>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Nombre de la Empresa</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ingrese el nombre de la empresa"
                                value={nombreEmpresa}
                                onChange={handleNombreEmpresaChange} // Actualizado para usar la nueva función
                                isInvalid={!!nombreEmpresaError}
                            />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Descripción Publicación</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Descripción de la empresa"
                                value={descripcionPublicacion}
                                onChange={handleDescripcionPublicacionChange}
                                isInvalid={!!descripcionPublicacionError}
                            />
                            <Form.Control.Feedback type="invalid">
                                {descripcionPublicacionError}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <Form.Group className="mb-3">
                            <Form.Label>URL</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="URL de la empresa"
                                value={url}
                                onChange={handleUrlChange}
                                isInvalid={!!urlError}
                            />
                            <Form.Control.Feedback type="invalid">
                                {urlError}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>
                <Button variant="primary" type="submit">
                    Guardar Cambios
                </Button>
            </Form>


        </div>
    );
};

export default EditarEmpresaExterna;
