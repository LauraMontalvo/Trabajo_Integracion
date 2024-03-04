import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Row, Col, Alert, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAlt, faTools, faClipboardList, faGraduationCap, faUserCircle, faCheckCircle, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { faBriefcase, faBuilding, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import * as constantes from '../../Models/Constantes'
const EditarEmpleoComp = ({ idEmpleo, onEmpleoEditado, closeEditModal }) => {
  // Estados para los datos del formulario
  const [descripcion, setDescripcion] = useState('');
  const [conocimientos, setConocimientos] = useState('');
  const [aptitudes, setAptitudes] = useState('');
  const [error, setError] = useState('');
  const [puesto, setPuesto] = useState('');
  const [formacionAcademica, setFormacionAcademica] = useState('');
  const [experiencia, setExperienciarequerida] = useState('');
  const [modalidad, setModalidad] = useState('');
  //modal de confimracion
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
    if (closeEditModal) {
      closeEditModal();
    }
  };


  useEffect(() => {
    axios.get(`${constantes.URL_OBTENER_UN_EMPLEO}/${idEmpleo}`)
      .then(response => {
        // Aquí estableces los estados con los datos obtenidos
        setDescripcion(response.data.descripcion);
        setConocimientos(response.data.conocimientos);
        setAptitudes(response.data.aptitudes);
        setPuesto(response.data.puesto);
        setFormacionAcademica(response.data.formacionAcademica);
        setExperienciarequerida(response.data.experiencia);
        setModalidad(response.data.modalidad);
      })
      .catch(error => {
        console.error('Error al cargar la experiencia', error);
        setError('Error al cargar datos de la experiencia laboral');
      });
  }, [idEmpleo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // ... Aquí incluyes tus validaciones ...

    axios.put(`${constantes.URL_ACTUALIZAR_UN_EMPLEO}/${idEmpleo}`, {
      descripcion,
      conocimientos,
      aptitudes,
      puesto,
      formacionAcademica,
      experiencia,
      modalidad
    })
      .then(response => {
        // Llamar a la función callback después de una actualización exitosa
        onEmpleoEditado(response.data);
        setShowSuccessModal(true);
      })

      .catch(error => {
        console.error('Error al actualizar empleo', error);
        setError('Error al actualizar empleo');
      });
  };


  const autoExpandField = (e) => {
    e.target.style.height = 'inherit'; // Restablece la altura
    const alturaDeseada = Math.max(e.target.scrollHeight);
    e.target.style.height = `${alturaDeseada}px`;
  };

  const handleChange = (setter) => (e) => {
    setter(e.target.value);
    autoExpandField(e);
  };



  return (
    <Form onSubmit={handleSubmit} className="mi-formulario">
      {error && <Alert variant="danger">{error}</Alert>}
      <Row>
        <Form.Group>
          <Form.Label>Puesto</Form.Label>
          <div className="input-icon-wrapper">
            <FontAwesomeIcon icon={faBriefcase} className="input-icon" />
            <Form.Control
              type="text"
              placeholder="Ingrese el puesto"
              value={puesto}
              onChange={(e) => setPuesto(e.target.value)}
            />
          </div>
        </Form.Group>
        <Form.Group>
          <Form.Label>Descripción del empleo</Form.Label>
          <div className="input-icon-wrapper">
            <FontAwesomeIcon icon={faFileAlt} className="input-icon" />
            <Form.Control
              as="textarea"
              onChange={handleChange(setDescripcion)}
              rows={4}

              placeholder="Ingrese la descripción del empleo"
              value={descripcion}


            />
            {/* Aquí puedes agregar validación de estado como en el formulario original */}
          </div>
        </Form.Group>
        <Form.Group>
          <Form.Label>Formación Académica</Form.Label>
          <div className="input-icon-wrapper">
            <FontAwesomeIcon icon={faGraduationCap} className="input-icon" />
            <Form.Control
              as="textarea"
              rows={4}
              placeholder="Ingrese la formación académica requerida"
              value={formacionAcademica}
              onChange={(e) => setFormacionAcademica(e.target.value)}
            />
          </div>
        </Form.Group>
        {/* ... Campos adicionales ... */}

        <Form.Group>
          <Form.Label>Conocimientos requeridos</Form.Label>
          <div className="input-icon-wrapper">
            <FontAwesomeIcon icon={faTools} className="input-icon" />
            <Form.Control
              as="textarea"
              onChange={handleChange(setConocimientos)}
              rows={4}

              placeholder="Ingrese los conocimientos requeridos"
              value={conocimientos}

            />
            {/* Validación de estado */}
          </div>
        </Form.Group>
        <Form.Group>
          <Form.Label>Experiencia Requerida</Form.Label>
          <div className="input-icon-wrapper">
            <FontAwesomeIcon icon={faBriefcase} className="input-icon" />
            <Form.Control
              as="textarea"
              rows={4}
              placeholder="Ingrese la experiencia requerida para el empleo"
              value={experiencia}
              onChange={(e) => setExperienciarequerida(e.target.value)}
            />
          </div>
        </Form.Group>

        <Form.Group>
          <Form.Label>Aptitudes requeridas</Form.Label>
          <div className="input-icon-wrapper">
            <FontAwesomeIcon icon={faClipboardList} className="input-icon" />
            <Form.Control
              as="textarea"
              rows={4}
              onChange={handleChange(setAptitudes)}

              placeholder="Ingrese las aptitudes requeridas"
              value={aptitudes}

            />
       
          </div>
        </Form.Group>


  

        <Form.Group>
          <Form.Label>Modalidad</Form.Label>
          <div className="radio-buttons-group">
            <Form.Check
              type="radio"
              label="Virtual"
              name="modalidad"
              value="Virtual"
              checked={modalidad === "Virtual"}
              onChange={(e) => setModalidad(e.target.value)}
            />
            <Form.Check
              type="radio"
              label="Presencial"
              name="modalidad"
              value="Presencial"
              checked={modalidad === "Presencial"}
              onChange={(e) => setModalidad(e.target.value)}
            />
            <Form.Check
              type="radio"
              label="Híbrida"
              name="modalidad"
              value="Híbrida"
              checked={modalidad === "Híbrida"}
              onChange={(e) => setModalidad(e.target.value)}
            />
          </div>
        </Form.Group>

      </Row>
      <div className="botones-centrados">
        <Button type="submit" className='btn-primary'>Guardar Cambios</Button>
      </div>
      <Modal show={showSuccessModal} onHide={handleSuccessModalClose}>
        <Modal.Header closeButton>
          <Modal.Title className='tituloModal'>
            <FontAwesomeIcon icon={faCheckCircle} className="text-success me-2" />
            Empleo actualizado con éxito
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className='tituloModalBody'  >
          <p >El empleo ha sido actualizado correctamente en el sistema.</p>
          <p>Puedes revisar los detalles del empleo en la lista de empleos publicados.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleSuccessModalClose}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </Form>

  );
};

export default EditarEmpleoComp;
