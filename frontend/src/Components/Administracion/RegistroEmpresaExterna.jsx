import { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../Styles/loginstyle.css';
import { Form, Button, Modal, Col, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faEnvelope, faInfoCircle, faCheckCircle, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

const CampoEstado = ({ valido, mensajeError }) => {
  if (mensajeError) {
    return <FontAwesomeIcon icon={faExclamationCircle} className="text-danger" />;
  } else if (valido) {
    return <FontAwesomeIcon icon={faCheckCircle} className="text-success" />;
  } else {
    return null; // No muestra nada si el campo aún no ha sido validado
  }
};

const RegistroEmpresaExterna = ({ onEmpresaRegistered, onCloseRegisterModal }) => {
  const [nombreEmpresa, setNombreEmpresa] = useState("");
  const [descripcionPublicacion, setDescripcionPublicacion] = useState("");
  const [url, setUrl] = useState("");

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  
  // Funciones para manejar la visibilidad de los modales
  const handleSuccessModalShow = () => setShowSuccessModal(true);

  const handleErrorModalShow = () => setShowErrorModal(true);
  const handleErrorModalClose = () => setShowErrorModal(false);

  const handleInputChange = (setterFunction, value) => {
    setterFunction(value);
  };
  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
    if (onCloseRegisterModal) {
      onCloseRegisterModal(); // Cierra el modal de registro
    }

  };
  const validarFormularioAntesDeEnviar = () => {
    // Aquí se pueden agregar validaciones específicas para los campos
    return true;
  };

  const onsubmitHandler = (e) => {
    e.preventDefault();
    if (!validarFormularioAntesDeEnviar()) {
      // Si el formulario no es válido, termina la función aquí
      return;
    }

    axios.post('https://46wm6186-8000.use.devtunnels.ms/api/externalCompany/new', {
      nombreEmpresa,
      descripcionPublicacion,
      url,
    })
    .then((res) => {
      console.log(res);
      if (onEmpresaRegistered) {
        onEmpresaRegistered(res.data);
      }
      handleSuccessModalShow();
      setNombreEmpresa('');
      setDescripcionPublicacion('');
      setUrl('');
    })
    .catch((err) => {
      console.error(err);
      handleErrorModalShow();
    });
  };

  return (
    <div className='App'>
      <Form onSubmit={onsubmitHandler} className="mi-formulario">
        {/* Campo de Nombre de la Empresa */}
        <Form.Group as={Row} controlId="formNombreEmpresa">
          <Form.Label column sm="2">
            Nombre de la Empresa
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type="text"
              placeholder="Ingrese el nombre de la empresa"
              value={nombreEmpresa}
              onChange={(e) => handleInputChange(setNombreEmpresa, e.target.value)}
            />
          </Col>
        </Form.Group>

        {/* Campo de Descripción de la Publicación */}
        <Form.Group as={Row} controlId="formDescripcionPublicacion">
          <Form.Label column sm="2">
            Descripción Publicación
          </Form.Label>
          <Col sm="10">
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Ingrese la descripción de la publicación"
              value={descripcionPublicacion}
              onChange={(e) => handleInputChange(setDescripcionPublicacion, e.target.value)}
            />
          </Col>
        </Form.Group>

        {/* Campo URL */}
        <Form.Group as={Row} controlId="formUrl">
          <Form.Label column sm="2">
            URL
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type="text"
              placeholder="Ingrese URL relacionada"
              value={url}
              onChange={(e) => handleInputChange(setUrl, e.target.value)}
            />
          </Col>
        </Form.Group>

        {/* Botones y Modales */}
        <Button variant="primary" type="submit">
          Registrar Empresa Externa
        </Button>

        <Modal show={showSuccessModal} onHide={handleSuccessModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>¡Registro Exitoso!</Modal.Title>
          </Modal.Header>
          <Modal.Body>La empresa externa ha sido registrada correctamente.</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleSuccessModalClose}>
              Cerrar
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={showErrorModal} onHide={handleErrorModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>Error</Modal.Title>
          </Modal.Header>
          <Modal.Body>Ha ocurrido un error al registrar la empresa externa.</Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={handleErrorModalClose}>
              Cerrar
            </Button>
          </Modal.Footer>
        </Modal>
      </Form>
    </div>
  );
}

export default RegistroEmpresaExterna;
