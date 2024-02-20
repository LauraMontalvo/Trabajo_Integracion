import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Row, Col, Modal, Alert } from 'react-bootstrap';
import { faBriefcase, faBuilding, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import * as constantes from '../../Models/Constantes'


const CampoEstado = ({ valido, mensajeError }) => {
  if (mensajeError) {
    return <FontAwesomeIcon icon={faExclamationCircle} className="text-danger" />;
  } else if (valido) {
    return <FontAwesomeIcon icon={faCheckCircle} className="text-success" />;
  } else {
    return null;
  }
};

const ExperieciaLaboral = ({  idUsuario,onExperienciaAdded, closeAddModal }) => {

  const [descripcionResponsabilidades, setDescripcionResponsabilidades] = useState('');
  const [ambitoLaboral, setAmbitoLaboral] = useState('');
  const [empresa, setEmpresa] = useState('');
  const { id } = useParams();
  const [puesto, setPuesto] = useState('');
  const [descripcionResponsabilidadesError, setDescripciaonResponsabilidadesError] = useState('');
  const [ambitoLaboralError, setAmbitoLaboralError] = useState('');
  const [empresaError, setEmpresaError] = useState('');
  const [fechaInicioError, setFechaInicioError] = useState('');
  const [fechaFinError, setFechaFinError] = useState('');
  const [puestoError, setPuestoError] = useState('');
  const [experienciaLaboral, setexperienciaLaboral] = useState([]);
  const [showAddExperienceModal, setShowAddExperienceModal] = useState(false);

  const [error, setError] = useState();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const handleSuccessModalClose = () => {
    setShowSuccessModal(false); // Cierra el modal de éxito
    if (closeAddModal) {
      closeAddModal(); // Cierra el modal principal de la experiencia laboral
    }
  };
  const handleErrorModalClose = () => setShowErrorModal(false);
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  
  const cargarExperienciaLaboral = () => {
    axios.get(`https://46wm6186-8000.use.devtunnels.ms/api/workExperiences/user/${id}`)
      .then((res) => {
        setexperienciaLaboral(res.data);
      })
      .catch((err) => console.log(err));
  };
  const handleCloseAddExperienceModal = () => {
    setShowAddExperienceModal(false);
  };
  const esCampoValido = (valor, error) => {
    return valor !== '' && error === '';
  };
  const validateDescripcionResp = (value, setError) => {
    if (!value) {
      setError(constantes.TEXTO_DESCRIPCION_RESPONSABILIDADES_OBLIGATORIO);
    } else {
      setError('');
    }
  };

  const validateAmbito = (value, setError) => {
    if (!value) {
      setError(constantes.TEXTO_AMBITO_LABORAL_OBLIGATORIO);
    } else {
      setError('');
    }
  };
  const validateRazonSocial = (value, setError) => {
    if (!value) {
      setError(constantes.TEXTO_RAZON_SOCIAL_OBLIGATORIO);
    } else {
      setError('');
    }
  };
 
  const validatePuesto = (value, setError) => {
    if (!value) {
      setError(constantes.TEXTO_PUESTO_OBLIGATORIO);
    } else {
      setError('');
    }
  };
  const validateDate = (date, errorSetterFunction) => {
    if (!date) {
      errorSetterFunction("La fecha es obligatoria.");
    } else if (new Date(date) > new Date()) {
      errorSetterFunction("La fecha no puede ser una fecha futura.");
    } else {
      errorSetterFunction('');
    }
  };
  
  // Función para validar la fecha de inicio
  const validateFechaInicio = (value, setError) => {
    validateDate(value, setError);
  };
  
  // Función para validar la fecha de fin
  const validateFechaFin = (value, setError, fechaInicio) => {
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0); // Establece la hora a medianoche
  
    if (!value) {
      setError("La fecha de fin es obligatoria.");
    } else if (new Date(value) < new Date(fechaInicio)) {
      setError("La fecha de fin debe ser posterior a la fecha de inicio.");
    } else if (new Date(value) > hoy) {
      setError("La fecha de fin no puede ser una fecha futura.");
    } else {
      setError('');
    }
  };
  
  const handleInputChange = (e, setterFunction, errorSetterFunction, validateFunction) => {
    const { value } = e.target;
    setterFunction(value);
    validateFunction(value, errorSetterFunction);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    // Valida todos los campos
    validateDescripcionResp(descripcionResponsabilidades, setDescripciaonResponsabilidadesError);
    validateAmbito(ambitoLaboral, setAmbitoLaboralError);
    validateRazonSocial(empresa, setEmpresaError);
    validateFechaInicio(fechaInicio, setFechaInicioError);
    validateFechaFin(fechaFin, setFechaFinError, fechaInicio);
    validatePuesto(puesto, setPuestoError);

    // Comprobar si todos los campos son válidos antes de enviar el formulario
    if (esCampoValido(descripcionResponsabilidades, descripcionResponsabilidadesError) &&
      esCampoValido(ambitoLaboral, ambitoLaboralError) &&
      esCampoValido(empresa, empresaError) &&
      esCampoValido(fechaInicio, fechaInicioError) &&
      esCampoValido(fechaFin, fechaFinError) &&
      esCampoValido(puesto, puestoError)) {
      // Todos los campos son válidos, proceder con el envío del formulario
      const fechaInicioFormatted = fechaInicio.split('T')[0]; // Esto asume que fechaInicio ya es una cadena ISO
      const fechaFinFormatted = fechaFin.split('T')[0]; // Esto asume que fechaFin ya es una cadena ISO
  
      axios.post(constantes.URL_EXPERIENCIA_LABORAL_NUEVA, {
        puesto,
        descripcionResponsabilidades,
        ambitoLaboral,
        empresa,
        fechaInicio: fechaInicioFormatted,
        fechaFin: fechaFinFormatted,
        idUsuario
      })
        .then((res) => {
          console.log(res);
          setShowSuccessModal(true);
          setDescripcionResponsabilidades('');
          setAmbitoLaboral('');
          setEmpresa('');
          setFechaInicio('');
          setFechaFin('');
          setPuesto('');
     onExperienciaAdded();
          setShowSuccessModal(true); // Muestra el modal de éxito
          closeAddModal(); 

        })
        .catch((error) => {
          console.error(error.response);
          // Manejo de error
        });
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
                type="text"
                placeholder="Ingrese su puesto"
                value={puesto}
                onChange={(e) => handleInputChange(e, setPuesto, setPuestoError, validatePuesto)}
              />
              <CampoEstado valido={esCampoValido(puesto, puestoError)} mensajeError={puestoError} />
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
                onChange={(e) => handleInputChange(e, setDescripcionResponsabilidades, setDescripciaonResponsabilidadesError, validateDescripcionResp)}
              />
              <CampoEstado valido={esCampoValido(descripcionResponsabilidades, descripcionResponsabilidadesError)} mensajeError={descripcionResponsabilidadesError} />
            </div>
            {descripcionResponsabilidadesError && <p className="text-danger">{descripcionResponsabilidadesError}</p>}

          </Form.Group>
        </Col>
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
                onChange={(e) => handleInputChange(e, setAmbitoLaboral, setAmbitoLaboralError, validateAmbito)}
              />
              <CampoEstado valido={esCampoValido(ambitoLaboral, ambitoLaboralError)} mensajeError={ambitoLaboralError} />
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
                onChange={(e) => handleInputChange(e, setEmpresa, setEmpresaError, validateRazonSocial)}
              />
              <CampoEstado valido={esCampoValido(empresa, empresaError)} mensajeError={empresaError} />
            </div>
            {ambitoLaboralError && <p className="text-danger">{empresaError}</p>}


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
  onChange={(e) => handleInputChange(e, setFechaInicio, setFechaInicioError, validateFechaInicio)}
/>
      <CampoEstado valido={esCampoValido(fechaInicio, fechaInicioError)} mensajeError={fechaInicioError} />
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
  onChange={(e) => handleInputChange(e, setFechaFin, setFechaFinError, () => validateFechaFin(e.target.value, setFechaFinError, fechaInicio))}
/>
      <CampoEstado valido={esCampoValido(fechaFin, fechaFinError)} mensajeError={fechaFinError} />
    </div>
    {fechaFinError && <p className="text-danger">{fechaFinError}</p>}
  </Form.Group>
        </Col>
      </Row>
      {/* Botón para enviar el formulario */}
      <div className="botones-centrados">
        <Button type="submit" className='btn-primary'>Guardar</Button>
      </div>
      <Modal show={showSuccessModal} onHide={handleSuccessModalClose}>
  <Modal.Header closeButton>
    <Modal.Title>Experiencia Laboral Agregada</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    ¡Tu experiencia ha sido agregada exitosamente!
  </Modal.Body>
  <Modal.Footer>
    <Button variant="success" onClick={handleSuccessModalClose}>
      Cerrar
    </Button>
  </Modal.Footer>
</Modal>

    </Form>


  );
}
export default ExperieciaLaboral;