import { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../Styles/loginstyle.css';
import { Form, Button, Modal, Col, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faInfoCircle, faLink, faBuilding, faExternalLinkAlt, faTrashAlt, faExclamationCircle, faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const CampoEstado = ({ valido, mensajeError }) => {
  if (mensajeError) {
    return <FontAwesomeIcon icon={faExclamationCircle} className="text-danger" />;
  } else if (valido) {
    return <FontAwesomeIcon icon={faCheckCircle} className="text-success" />;
  } else {
    return null;
  }
};

const RegistroEmpresaExterna = ({ onEmpresaRegistered, onCloseRegisterModal }) => {
  // Estados
  const [nombreEmpresa, setNombreEmpresa] = useState("");
  const [descripcionPublicacion, setDescripcionPublicacion] = useState("");
  const [url, setUrl] = useState("");
  const [nombreEmpresaError, setNombreEmpresaError] = useState("");
  const [descripcionPublicacionError, setDescripcionPublicacionError] = useState("");
  const [urlError, setUrlError] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const esCampoValido = (valor, error) => {
    return valor !== '' && error === '';
  };
  // Funciones de manejo de cambios con validación básica
  const handleNombreEmpresaChange = (e) => {
    const value = e.target.value;
    setNombreEmpresa(value);
    if (!value.trim()) {
      setNombreEmpresaError('El nombre de la empresa es obligatorio.');
    } else {
      setNombreEmpresaError('');
    }
  };

  const handleDescripcionPublicacionChange = (e) => {
    const value = e.target.value;
    setDescripcionPublicacion(value);
    if (!value.trim()) {
      setDescripcionPublicacionError('La descripción es obligatoria.');
    } else {
      setDescripcionPublicacionError('');
    }
  };

  const handleUrlChange = (e) => {
    const value = e.target.value;
    setUrl(value);
    if (!value.trim()) {
      setUrlError('La URL es obligatoria.');
    } else if (!/^(ftp|http|https):\/\/[^ "]+$/.test(value)) {
      setUrlError('La URL no es válida.');
    } else {
      setUrlError('');
    }
  };

  // Validación del formulario antes de enviar
  const validarFormulario = () => {
    let esFormularioValido = true;

    // Validación del nombre de la empresa
    if (!nombreEmpresa.trim()) {
        setNombreEmpresaError('El nombre de la empresa es obligatorio.');
        esFormularioValido = false;
    } else {
        setNombreEmpresaError('');
    }

    // Validación de la descripción de la publicación
    if (!descripcionPublicacion.trim()) {
        setDescripcionPublicacionError('La descripción es obligatoria.');
        esFormularioValido = false;
    } else {
        setDescripcionPublicacionError('');
    }

    // Validación de la URL
    if (!url.trim()) {
        setUrlError('La URL es obligatoria.');
        esFormularioValido = false;
    } else if (!/^(ftp|http|https):\/\/[^ "]+$/.test(url)) {
        setUrlError('La URL no es válida.');
        esFormularioValido = false;
    } else {
        setUrlError('');
    }

    return esFormularioValido;
};

  // Manejador de envío del formulario
  const onsubmitHandler = async (e) => {
    e.preventDefault();
    if (validarFormulario()) {
      try {
        const response = await axios.post('https://46wm6186-8000.use.devtunnels.ms/api/externalCompany/new', {
          nombreEmpresa,
          descripcionPublicacion,
          url,
        });
        // Invoca el callback después de un registro exitoso
        if (onEmpresaRegistered) {
          onEmpresaRegistered(response.data);
        }
       
        
        handleSuccessModalShow();
        // Reiniciar estados
        setNombreEmpresa('');
        setDescripcionPublicacion('');
        setUrl('');
      } catch (error) {
        console.error(error);
        handleErrorModalShow();
      }
    }
  };

  // Funciones para manejar la visualización de modales
  const handleSuccessModalShow = () => setShowSuccessModal(true);
  const handleErrorModalShow = () => setShowErrorModal(true);
  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
    if (onCloseRegisterModal) {
      onCloseRegisterModal();
    }
  };
  const handleErrorModalClose = () => setShowErrorModal(false);
  return (
    <div className='App'>
      <Form onSubmit={onsubmitHandler} className="mi-formulario">
        <Row >
          <Col md={12}>
     
          <Form.Group>
  <Form.Label>Nombre de la Empresa</Form.Label>
  <div className="input-icon-wrapper">
    <FontAwesomeIcon icon={faBuilding} className="input-icon fa-lg" />
    <Form.Control
      type="text"
      placeholder="Ingrese Nombre de la Empresa"
      value={nombreEmpresa}
      onChange={handleNombreEmpresaChange} // Usamos la función específica para este campo
    />
    <CampoEstado valido={esCampoValido(nombreEmpresa, nombreEmpresaError)} mensajeError={nombreEmpresaError} />
  </div>
  {nombreEmpresaError && <p className="text-danger">{nombreEmpresaError}</p>}
</Form.Group>
                    </Col>

                    <Form.Group>
  <Form.Label>Descripción</Form.Label>
  <div className="input-icon-wrapper">
    <FontAwesomeIcon icon={faInfoCircle} className="input-icon fa-lg" />
    <Form.Control
      as="textarea"
      rows={3}
      placeholder="Ingrese la descripción de la empresa"
      value={descripcionPublicacion}
      onChange={handleDescripcionPublicacionChange} // Manejador específico para este campo
    />
    <CampoEstado valido={esCampoValido(descripcionPublicacion, descripcionPublicacionError)} mensajeError={descripcionPublicacionError} />
  </div>
  {descripcionPublicacionError && <p className="text-danger">{descripcionPublicacionError}</p>}
</Form.Group>
<Form.Group>
  <Form.Label>URL</Form.Label>
  <div className="input-icon-wrapper">
    <FontAwesomeIcon icon={faLink} className="input-icon" />
    <Form.Control
      type="text"
      placeholder="Ingrese URL de la empresa"
      value={url}
      onChange={handleUrlChange} // Manejador específico para la URL
    />
    <CampoEstado valido={esCampoValido(url, urlError)} mensajeError={urlError} />
  </div>
  {urlError && <p className="text-danger">{urlError}</p>}
</Form.Group>


        {/* Botones y Modales */}
        </Row >
        <div className="botones-centrados">
              <Button type="submit" className='btn-primary'>Registrar Empresa Externa</Button>
            </div>

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

    
      </Form>
    </div>
  );
}

export default RegistroEmpresaExterna;
