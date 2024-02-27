import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Form, Row, Col, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSchool, faExclamationCircle, faCheckCircle, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import * as constantes from '../../Models/Constantes';

const CampoEstado = ({ mensajeError }) => {
    if (mensajeError) {
        return <FontAwesomeIcon icon={faExclamationCircle} className="text-danger" />;
    } else {
        return null; // No muestra nada si no hay mensaje de error
    }
};
const EditarInstitucionComp = ({ idInstitucion, onInstitucionActualizada, onCloseModals }) => {
    const [nombreInstitucion, setNombreInstitucion] = useState('');
    const [ubicacion, setUbicacion] = useState('');
    const [ubicacionError, setUbicacionError] = useState(''); 


    const [nombreInstitucionError, setNombreInstitucionError] = useState('');
    const [updateError, setUpdateError] = useState('');
    const [updateSuccess, setUpdateSuccess] = useState('');
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const navigate = useNavigate();
    const { id } = useParams();

    const handleSuccessModalClose = () => {
        setShowSuccessModal(false);
        if (onCloseModals) onCloseModals(); 
    };
    const esCampoValido = (valor, error) => {
        return valor !== '' && error === '';
    };


    const handleUbicacionChange = (e) => {
        setUbicacion(e.target.value);
        validarUbicacion(e.target.value, setUbicacionError);
    };

    const handleInputChange = (e) => {
        const { value } = e.target;
        setNombreInstitucion(value);
        validarNombreInstitucion(value, setNombreInstitucionError);
    };
    useEffect(() => {
        if (idInstitucion) {
            axios.get(`${constantes.URL_OBTENER_UNA_INSTITUCION}/${idInstitucion}`)
                .then(res => {
                    setNombreInstitucion(res.data.nombreInstitucion);
                    setUbicacion(res.data.ubicacion || ''); 
                })
                .catch(err => console.log(err));
        }
    }, [idInstitucion]);


    const validarNombreInstitucion = (value, setError) => {
        if (!value.trim()) {
            setError(constantes.TEXTO_NOMBRE_INSTITUCION_OBLIGATORIO);
        } else {
            setError(''); 
        }
    };
    const validarUbicacion = (value, setError) => {
        if (!value.trim()) {
            setError(constantes.TEXTO_NOMBRE_INSTITUCION_OBLIGATORIO);
        } else {
            setError(''); 
        }
    };
    const handlerUpdateInstitucion = (e) => {
        e.preventDefault();
        if (nombreInstitucionError || ubicacionError) {
            return; 
        }

        axios.put(`${constantes.URL_ACTUALIZAR_INSTITUCION}/${idInstitucion}`, { nombreInstitucion, ubicacion })
            .then((res) => {
                setUpdateSuccess("Institución actualizada correctamente");
                setUpdateError('');
                setShowSuccessModal(true); // Muestra el modal de éxito
                if (onInstitucionActualizada) {
                    onInstitucionActualizada(res.data);
                }
            })
            .catch((err) => {
                setUpdateError(err.response?.data?.msg || 'Error desconocido');
            });
    };

    return (
        <div className="container mt-4">
            <Form onSubmit={handlerUpdateInstitucion} className="mi-formulario">


                <Form.Group>
                    <Form.Label>Nombre Institucion:</Form.Label>
                    <div className="input-icon-wrapper">
                        <FontAwesomeIcon icon={faSchool} className="input-icon" />
                        <Form.Control
                            type="text"
                            placeholder="Ingrese el nombre de la institución"
                            onChange={(e) => handleInputChange(e, setNombreInstitucion, setNombreInstitucionError)}
                            value={nombreInstitucion} />
                        <CampoEstado valido={esCampoValido(nombreInstitucion, nombreInstitucionError)} mensajeError={nombreInstitucionError} />

                    </div>
                    {nombreInstitucionError && <p className="text-danger">{nombreInstitucionError}</p>}
                </Form.Group>

                <Form.Group>
                    <Form.Label>Ubicación:</Form.Label>
                    <div className="input-icon-wrapper">
                        <FontAwesomeIcon icon={faMapMarkerAlt} className="input-icon" />
                        <Form.Control
                            type="text"
                            placeholder="Ingrese la ubicación"
                            value={ubicacion}
                            onChange={handleUbicacionChange}
                        />
                    </div>
                    {ubicacionError && <p className="text-danger">{ubicacionError}</p>}
                </Form.Group>
                <div>

                    <p style={{ color: 'red' }}>{updateError}</p>
                </div>
                <div className="botones-centrados">
                    <Button variant='primary' type="submit" className='btn'>Guardar</Button>
                </div><br />
            </Form>
            <Modal show={showSuccessModal} onHide={() => setShowSuccessModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Institución actualizada con éxito</Modal.Title>
                </Modal.Header>
                <Modal.Body>La información de la institución ha sido actualizada correctamente.</Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={() => setShowSuccessModal(false)}>
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>

        </div>
    );
};

export default EditarInstitucionComp;
