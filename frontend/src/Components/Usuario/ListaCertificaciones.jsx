import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Modal, Form, ListGroup, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faCertificate, faLink, faCalendarDay, faExternalLinkAlt, faTrashAlt, faExclamationCircle, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import EditarCertificacion from './EditarCertificaciones';

const CampoEstado = ({ valido, mensajeError }) => {
    if (mensajeError) {
        return <FontAwesomeIcon icon={faExclamationCircle} className="text-danger" />;
    } else if (valido) {
        return <FontAwesomeIcon icon={faCheckCircle} className="text-success" />;
    } else {
        return null; // No muestra nada si el campo aún no ha sido validado o está vacío
    }
};
const ListaCertificaciones = ({ userId }) => {
    const [certificaciones, setCertificaciones] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [titulo, setTitulo] = useState('');
    const [url, setUrl] = useState('');
    const [fechaExpedicion, setFechaExpedicion] = useState('');
    const [certificacionAEditar, setCertificacionAEditar] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [certificacionAEliminar, setCertificacionAEliminar] = useState(null);
    const [tituloError, setTituloError] = useState('');
    const [urlError, setUrlError] = useState('');
    const [fechaExpedicionError, setFechaExpedicionError] = useState('');
    const [showSuccessAddModal, setShowSuccessAddModal] = useState(false); // Estado para el modal de éxito al agregar
    const handleSuccessAddClose = () => {
        setShowSuccessAddModal(false); // Cierra el modal de éxito
        setShowModal(false); // Cierra el modal de agregar certificación
        resetForm(); // Opcional, si quieres restablecer el formulario al cerrar
    };
    

    const esCampoValido = (valor, error) => {
        return valor && !error;
    }
    const validarTitulo = (titulo) => {
        if (!titulo) {
            setTituloError('El título es obligatorio.');
            return false;
        }
        setTituloError('');
        return true;
    };

    const validarUrl = (url) => {
        if (!url) {
            setUrlError('La URL es obligatoria.');
            return false;
        }

        const regexUrl = /^(ftp|http|https):\/\/[^ "]+$/;
        if (!regexUrl.test(url)) {
            setUrlError('La URL no es válida.');
            return false;
        }

        setUrlError('');
        return true;
    };

    const validarFechaExpedicion = (fecha) => {
        if (!fecha) {
            setFechaExpedicionError('La fecha de expedición es obligatoria.');
            return false;
        }
        setFechaExpedicionError('');
        return true;
    };

    // Agrega las funciones handleEdit y handleDelete en tu componente
    const handleEdit = (certificacion) => {
        setCertificacionAEditar(certificacion);
        setShowEditModal(true); // Abre el modal de edición
    };
    const handleDelete = (certificacionId) => {
        setCertificacionAEliminar(certificacionId);
        setShowDeleteModal(true);
    };
    const handleConfirmDelete = async () => {
        try {
            await axios.delete(`https://46wm6186-8000.use.devtunnels.ms/api/certification/${certificacionAEliminar}`);
            setCertificaciones(certificaciones.filter(cert => cert._id !== certificacionAEliminar));
            setShowDeleteModal(false);
        } catch (error) {
            console.error('Error al eliminar la certificación:', error);
        }
    };
    // Función para actualizar la lista de certificaciones después de editar
    const actualizarCertificacion = (certificacionActualizada) => {
        setCertificaciones(certificaciones.map((cert) => cert._id === certificacionActualizada._id ? certificacionActualizada : cert));
    };
    useEffect(() => {
        const cargarCertificaciones = async () => {
            // Llamada a la API para obtener las certificaciones del usuario
            try {
                const response = await axios.get(`https://46wm6186-8000.use.devtunnels.ms/api/certification/user/${userId}`);
                setCertificaciones(response.data);
            } catch (error) {
                console.error('Error al cargar certificaciones:', error);
            }
        };

        cargarCertificaciones();
    }, [userId]);

    const handleAgregarCertificacion = async () => {

        const esTituloValido = validarTitulo(titulo);
        const esUrlValida = validarUrl(url);
        const esFechaValida = validarFechaExpedicion(fechaExpedicion);

        if (!esTituloValido || !esUrlValida || !esFechaValida) {
            // No continuar si hay errores
            return;
        }

        try {
            const response = await axios.post('https://46wm6186-8000.use.devtunnels.ms/api/certification/new', {
                titulo,
                url,
                idUsuario: userId,
                fechaExpedicion
            });

            setCertificaciones([...certificaciones, response.data.insertedCertification]);
            resetForm();
            setShowModal(false);
            setShowSuccessAddModal(true); // Muestra el modal de éxito


        } catch (error) {
            console.error('Error al agregar certificación:', error);
        }
    };
    const truncateUrl = (url) => {
        const maxChar = 30;
        return url.length > maxChar ? url.substring(0, maxChar) + '...' : url;
    };
    const resetForm = () => {
        setTitulo('');
        setUrl('');
        setFechaExpedicion('');
        setTituloError('');
        setUrlError('');
        setFechaExpedicionError('');
    };

    // Esta función se llamará cuando el modal se cierre
    const handleOpenModal = () => {
        resetForm(); // Restablece los estados de error al abrir el modal
        setShowModal(true); // Abre el modal
    };
    
    const format = (dateString) => {
        if (!dateString) {
            return 'No disponible';
          }
        
          // Ya que la fecha está en formato ISO, simplemente devuelve la parte de la fecha.
          return dateString.split('T')[0];
        };
    return (
        <>
            <ListGroup className="empleos-lista">
            {certificaciones.length > 0 ? (
          certificaciones.map((certificacion) => (
              <ListGroup.Item key={certificacion._id} className="mt-4 border p-3 position-relative">
                  <strong>Titulo Obtenido en la Certificación:</strong><p>{certificacion.titulo}-  <a href={certificacion.url} target="_blank" rel="noopener noreferrer" className="certificacion-url">
                      {truncateUrl(certificacion.url)}
                      <FontAwesomeIcon icon={faExternalLinkAlt} size="sm" />
                  </a></p>

                  <strong className="certificacion-fecha">
                      Fecha de Expedición:
                  </strong> {format(certificacion.fechaExpedicion)}

                  <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
                      <FontAwesomeIcon icon={faEdit} className="text-primary mr-2" style={{ cursor: 'pointer', fontSize: '1.5em', marginRight: '15px' }} onClick={() => handleEdit(certificacion)} />
                      <FontAwesomeIcon icon={faTrashAlt}
                          className="text-danger"
                          style={{ cursor: 'pointer', fontSize: '1.5em' }}
                          onClick={() => handleDelete(certificacion._id)} />
                  </div>
              </ListGroup.Item>
          ))
      ) : (
    

              <p>No se han publicado certificaciones.</p>
         
      )}
            </ListGroup>
            <Card.Body className="text-center">
                <Button variant="primary" onClick={handleOpenModal}>Agregar Certificación</Button>
            </Card.Body>

            {certificacionAEditar && (
                <EditarCertificacion
                    show={showEditModal}
                    handleClose={() => setShowEditModal(false)}
                    certificacion={certificacionAEditar}
                    actualizarCertificacion={actualizarCertificacion}
                />
            )}
            {/* Modal para nueva certificación */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Agregar Certificación</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form className="mi-formulario">
                        <Form.Group>
                            <Form.Label>Título Obtenido en la Certificación</Form.Label>
                            <div className="input-icon-wrapper">
                            <FontAwesomeIcon icon={faCertificate} className="input-icon" />

                                <Form.Control
                                    type="text"
                                    value={titulo}
                                    onChange={(e) => {
                                        setTitulo(e.target.value);
                                        validarTitulo(e.target.value);
                                    }}
                                    isInvalid={!!tituloError}
                                />
                                <CampoEstado
                                    valido={esCampoValido(titulo, tituloError)}
                                    mensajeError={tituloError}
                                />
                            </div>
                            {tituloError && <p className="text-danger">{tituloError}</p>}
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>URL</Form.Label>
                            <div className="input-icon-wrapper">
                            <FontAwesomeIcon icon={faLink} className="input-icon" />

                                <Form.Control
                                    type="text"
                                    value={url}
                                    onChange={(e) => {
                                        setUrl(e.target.value);
                                        validarUrl(e.target.value);
                                    }}
                                    isInvalid={!!urlError}
                                />
                                <CampoEstado
                                    valido={esCampoValido(url, urlError)}
                                    mensajeError={urlError}
                                />
                            </div>
                            {urlError && <p className="text-danger">{urlError}</p>}
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Fecha de Expedición</Form.Label>
                            <div className="input-icon-wrapper">

                                <Form.Control
                                    type="date"
                                    value={fechaExpedicion}
                                    onChange={(e) => {
                                        setFechaExpedicion(e.target.value);
                                        validarFechaExpedicion(e.target.value, setFechaExpedicionError);
                                    }}
                                    isInvalid={!!fechaExpedicionError}
                                />
                                <CampoEstado
                                    valido={esCampoValido(fechaExpedicion, fechaExpedicionError)}
                                    mensajeError={fechaExpedicionError}
                                />
                            </div>
                            {fechaExpedicionError && <p className="text-danger">{fechaExpedicionError}</p>}
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Cerrar
                    </Button>
                    <Button variant="primary" onClick={handleAgregarCertificacion}>
                        Agregar
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmar Eliminación</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    ¿Estás seguro de que deseas eliminar esta certificación?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                        Cancelar
                    </Button>
                    <Button variant="danger" onClick={handleConfirmDelete}>
                        Eliminar
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={showSuccessAddModal} onHide={handleSuccessAddClose}>
    <Modal.Header closeButton>
        <Modal.Title>Certificación agregada con éxito</Modal.Title>
    </Modal.Header>
    <Modal.Body>
        ¡Tu certificación ha sido agregada exitosamente!
    </Modal.Body>
    <Modal.Footer>
        <Button variant="success" onClick={handleSuccessAddClose}>
            Cerrar
        </Button>
    </Modal.Footer>
</Modal>
        </>
    );
};

export default ListaCertificaciones;
