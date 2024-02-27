import React, { useState, useEffect } from 'react';


import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../Styles/loginstyle.css';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Modal, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSchool, faExclamationCircle, faCheckCircle, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import Cabecera from '../General/Cabecera';
import TabsAdministracionComp from './TabsAdministracionComp';
import * as constantes from '../../Models/Constantes'
const CampoEstado = ({ valido, mensajeError }) => {
  if (mensajeError) {
    return <FontAwesomeIcon icon={faExclamationCircle} className="text-danger" />;
  } else if (valido) {
    return <FontAwesomeIcon icon={faCheckCircle} className="text-success" />;
  } else {
    return null; // No muestra nada si el campo aún no ha sido validado
  }
};
const RegistroInstituciones = ({ onInstitucionRegistered, onCloseRegisterModal }) => {
  const [nombreInstitucion, setNombreInstitucion] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const [ubicacionError, setUbicacionError] = useState('');
  const [nombreInstitucionError, setNombreInstitucionError] = useState('');

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const esCampoValido = (valor, error) => {
    return valor !== '' && error === '';
  };
  const handleCloseModal = () => {
    setShowModal(false);
    if (onCloseRegisterModal) {
      onCloseRegisterModal(); // Esto cerrará el modal de registro también
    }
  };

  const handleErrorModalClose = () => {
    setShowErrorModal(false);
  };

  const handleSuccessModalShow = () => setShowSuccessModal(true);

  const handleErrorModalShow = () => setShowErrorModal(true);

  const navigate = useNavigate();




  const handleInputChange = (e, setterFunction, errorSetter) => {
    const { value } = e.target;

    setterFunction(value);

    if (!value) {
      errorSetter(constantes.TEXTO_ESTE_CAMPO_ES_OBLIGATORIO);
    } else {
      errorSetter('');
    }
  };


  const onsubmitHandler = (e) => {
    e.preventDefault();

    if (!nombreInstitucion) {
      setNombreInstitucionError('El nombre de la institución es obligatorio');
      return; 
    }
    if (!ubicacion) {
      setUbicacionError('La ubicación de la institución es obligatoria');
      return; 
    }
    axios.post(constantes.URL_AGREGAR_NUEVA_INSTITUCION, { nombreInstitucion, ubicacion })
      .then((res) => {
        console.log(res);
        setShowModal(true); 
        if (onInstitucionRegistered) {
          onInstitucionRegistered(res.data); 
        }
        handleSuccessModalShow();
        setNombreInstitucion('');
        setNombreInstitucionError('');
        setUbicacion('');
        setUbicacionError('');
      })
      .catch((err) => {
        console.log(err);
        if (err.response) {
          console.log(err.response.data); // Muestra detalles del error del servidor
          
        }
        handleErrorModalShow();
      });
  };

  return (

    <div className='App'>

      <Form onSubmit={onsubmitHandler} className="mi-formulario">


        <Form.Group>
          <Form.Label>Nombre de la Institución</Form.Label>
          <div className="input-icon-wrapper">
            <FontAwesomeIcon icon={faSchool} className="input-icon" />
            <Form.Control
              type="text"
              placeholder="Ingrese institucion"
              value={nombreInstitucion}
              onChange={(e) => handleInputChange(e, setNombreInstitucion, setNombreInstitucionError)} />
            <CampoEstado valido={esCampoValido(nombreInstitucion, nombreInstitucionError)} mensajeError={nombreInstitucionError} />

          </div>
          {nombreInstitucionError && <p className="text-danger">{nombreInstitucionError}</p>}

        </Form.Group>
        <Form.Group>

          <Form.Label>Ubicación de la Institución</Form.Label>
          <div className="input-icon-wrapper">
            <FontAwesomeIcon icon={faMapMarkerAlt} className="input-icon" />

            <Form.Control
              type="text"
              placeholder="Ingrese la ubicación de la institución"
              value={ubicacion}
              onChange={(e) => handleInputChange(e, setUbicacion, setUbicacionError)}
            />
            <CampoEstado valido={esCampoValido(ubicacion, ubicacionError)} mensajeError={ubicacionError} />
          </div>

          {ubicacionError && <p className="text-danger">{ubicacionError}</p>}
        </Form.Group>


        <div className="botones-centrados">
          <Button type="submit" className='btn-primary'>Crear Institucion</Button>

        </div>



      </Form>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title className='tituloModal'>
            <FontAwesomeIcon icon={faCheckCircle} className="text-success me-2" />
            Institución Registrada
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className='tituloModalBody'>La institución ha sido registrada con éxito.</Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleCloseModal}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>


  );
};

export default RegistroInstituciones;
