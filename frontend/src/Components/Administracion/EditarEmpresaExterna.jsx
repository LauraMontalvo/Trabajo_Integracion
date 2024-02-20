import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Form, Row, Col } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import "../../Styles/loginstyle.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faInfoCircle, faLink, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import * as constantes from '../../Models/Constantes';

const EditarEmpresaExterna = ({ id, onEmpresaUpdated, closeEditModal }) => {

    const navigate = useNavigate();

    const [nombreEmpresa, setNombreEmpresa] = useState('');
    const [descripcionPublicacion, setDescripcionPublicacion] = useState('');
    const [url, setUrl] = useState('');

    const [nombreEmpresaError, setNombreEmpresaError] = useState('');
    const [descripcionPublicacionError, setDescripcionPublicacionError] = useState('');
    const [urlError, setUrlError] = useState('');

    useEffect(() => {
        // Asumiendo que tienes una URL base definida en tus constantes
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`https://46wm6186-8000.use.devtunnels.ms/api/externalCompany/${id}`, {
                nombreEmpresa,
                descripcionPublicacion,
                url,
            });
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
                                onChange={(e) => setNombreEmpresa(e.target.value)}
                                isInvalid={!!nombreEmpresaError}
                            />
                            <Form.Control.Feedback type="invalid">
                                {nombreEmpresaError}
                            </Form.Control.Feedback>
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
                                onChange={(e) => setDescripcionPublicacion(e.target.value)}
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
                                onChange={(e) => setUrl(e.target.value)}
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
