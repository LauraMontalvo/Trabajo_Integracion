import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Modal, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAlt, faTools, faGraduationCap, faCalendarAlt, faClipboardList, faBriefcase, faUserCircle, faCheckCircle, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import "../../Styles/camps.scss"; // Importa tus estilos personalizados
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
const PublicarEmpleo = ({ idEmpresa, onEmpleoPublicado, closeEditModal }) => {
  const [descripcion, setDescripcion] = useState('');
  const [conocimientos, setConocimientos] = useState('');
  const [aptitudes, setAptitudes] = useState('');

  const [descripcionError, setDescripcionError] = useState('');
  const [conocimientosError, setConocimientosError] = useState('');
  const [aptitudesError, setAptitudesError] = useState('');
  const [showErrorModal, setShowErrorModal] = useState(false);

  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Nuevos estados para los campos adicionales
  const [puesto, setPuesto] = useState('');
  const [formacionAcademica, setFormacionAcademica] = useState('');
  const [experiencia, setExperienciarequerida] = useState('');
  const [modalidad, setModalidad] = useState({
    virtual: false,
    presencial: false,
    hibrida: false
  });
  // Nuevos estados para errores de validación
  const [puestoError, setPuestoError] = useState('');
  const [formacionAcademicaError, setFormacionAcademicaError] = useState('');
  const [experienciarequeridaError, setExperienciarequeridaError] = useState('');
  const [modalidadError, setModalidadError] = useState('');


  const esCampoValido = (valor, error) => {
    return valor !== '' && error === '';
  };


  const handleSuccessModalClose = () => {
    // Configura la variable de estado showSuccessModal en false para ocultar el modal
    setShowSuccessModal(false);

    if (closeEditModal) {
      closeEditModal();
    }
  };
  const handleErrorModalClose = () => {
    setShowErrorModal(false);
  };

  const handleSuccessModalShow = () => setShowSuccessModal(true);

  const handleErrorModalShow = () => setShowErrorModal(true);


  const handleInputChange = (e, setterFunction, errorSetter, validationFunction) => {
    const { value } = e.target;
    setterFunction(value);

    if (validationFunction) {
      validationFunction(value, errorSetter);
    }
  };
  const validateDescripcion = (value, setError) => {
    if (!value.trim()) {
      setError('La descripción del empleo es obligatoria');
    } else {
      setError('');
    }
  };

  const validateConocimientos = (value, setError) => {
    if (!value.trim()) {
      setError('Conocimientos es obligatorio');
    } else {
      setError('');
    }
  };
  const validateAptitudes = (value, setError) => {
    if (!value.trim()) {
      setError('Aptitudes es obligatorio');
    } else {
      setError('');
    }
  };

  // Nuevas funciones de validación
  const validatePuesto = (value, setError) => {
    if (!value.trim()) {
      setError('El puesto es obligatorio');
    } else {
      setError('');
    }
  };

  const validateFormacionAcademica = (value, setError) => {
    if (!value.trim()) {
      setError('La formación académica es obligatoria');
    } else {
      setError('');
    }
  };

  const validateExperienciarequerida = (value, setError) => {
    if (!value.trim()) {
      setError('La experiencia requerida es obligatoria');
    } else {
      setError('');
    }
  };

  const validateModalidad = (value, setError) => {
    if (!value.trim()) {
      setError('La modalidad es obligatoria');
    } else {
      setError('');
    }
  };

  const validarFormularioAntesDeEnviar = () => {
    let formularioEsValido = true;

    // Validar descripción
    if (!descripcion) {
      setDescripcionError('La descripción del empleo es obligatoria');
      formularioEsValido = false;
    } else {
      setDescripcionError('');
    }

    // Validar conocimientos
    if (!conocimientos) {
      setConocimientosError('Los conocimientos requeridos son obligatorios');
      formularioEsValido = false;
    } else {
      setConocimientosError('');
    }

    // Validar aptitudes
    if (!aptitudes) {
      setAptitudesError('Las aptitudes requeridas son obligatorias');
      formularioEsValido = false;
    } else {
      setAptitudesError('');
    }

    // Validar puesto
    if (!puesto) {
      setPuestoError('El puesto es obligatorio');
      formularioEsValido = false;
    } else {
      setPuestoError('');
    }

    // Validar formación académica
    if (!formacionAcademica) {
      setFormacionAcademicaError('La formación académica es obligatoria');
      formularioEsValido = false;
    } else {
      setFormacionAcademicaError('');
    }

    // Validar experiencia requerida
    if (!experiencia) {
      setExperienciarequeridaError('La experiencia requerida es obligatoria');
      formularioEsValido = false;
    } else {
      setExperienciarequeridaError('');
    }

    // Validar modalidad
    if (!modalidad) {
      setModalidadError('La modalidad es obligatoria');
      formularioEsValido = false;
    } else {
      setModalidadError('');
    }

    return formularioEsValido;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validarFormularioAntesDeEnviar()) {
      return;
    }
    axios
      .post(constantes.URL_PUBLICAR_EMPLEO, {
        idEmpresa,
        puesto,
        descripcion,
        formacionAcademica,
        conocimientos,
        aptitudes,
        experiencia,        
        modalidad,
        estado: constantes.ESTADO_ACTIVO

      })
      .then((res) => {
        console.log(res);
        // Puedes mostrar un mensaje de éxito y reiniciar los campos del formulario aquí
        handleSuccessModalShow();
        setDescripcion('');
        setConocimientos('');
        setAptitudes('');
        setFormacionAcademica('');
        setExperienciarequerida('');
        setModalidad('');
        setPuesto('');

        setDescripcionError('');
        setExperienciarequeridaError('');
        setFormacionAcademicaError('');
        setPuestoError('');
        setConocimientosError('');
        setAptitudesError('');
        setModalidadError('');
        onEmpleoPublicado(res.data.insertedJob);
      })
      .catch((err) => {
        console.error(err);
        handleErrorModalShow();
      });
  };

  return (
    <Form onSubmit={handleSubmit} className="mi-formulario">
      <Row>
        <Form.Group>
          <Form.Label>Puesto</Form.Label>
          <div className="input-icon-wrapper">
            {/* Elige un ícono adecuado para el puesto */}
            <FontAwesomeIcon icon={faBriefcase} className="input-icon" />
            <Form.Control
              type="text"
              className="input-elegante" // Aplica la clase de estilo aquí si es necesario
              placeholder="Ingrese el puesto"
              value={puesto}
              onChange={(e) => handleInputChange(e, setPuesto, setPuestoError, validatePuesto)}
            />
            <CampoEstado valido={esCampoValido(puesto, puestoError)} mensajeError={puestoError} />
          </div>
          {puestoError && <p className="text-danger">{puestoError}</p>}
        </Form.Group>
        <Form.Group>
          <Form.Label>Descripción del empleo</Form.Label>
          <div className="input-icon-wrapper">
            <FontAwesomeIcon icon={faFileAlt} className="input-icon" />
            <Form.Control
              as="textarea"
              rows={5}
              className="textarea-elegante" // Aplicar la clase aquí
              placeholder="Ingrese la descripción del empleo"
              value={descripcion}
              onChange={(e) => handleInputChange(e, setDescripcion, setDescripcionError, validateDescripcion)}
            />
            <CampoEstado valido={esCampoValido(descripcion, descripcionError)} mensajeError={descripcionError} />
          </div>
          {descripcionError && <p className="text-danger">{descripcionError}</p>}
        </Form.Group>

        <Form.Group>
          <Form.Label>Formación Académica</Form.Label>
          <div className="input-icon-wrapper">
            {/* Elige un ícono adecuado para la formación académica */}
            <FontAwesomeIcon icon={faGraduationCap} className="input-icon" />
            <Form.Control
              as="textarea"
              rows={5}
              className="textarea-elegante" // Aplica la clase de estilo aquí si es necesario
              placeholder="Ingrese la formación académica"
              value={formacionAcademica}
              onChange={(e) => handleInputChange(e, setFormacionAcademica, setFormacionAcademicaError, validateFormacionAcademica)}
            />
            <CampoEstado valido={esCampoValido(formacionAcademica, formacionAcademicaError)} mensajeError={formacionAcademicaError} />
          </div>
          {formacionAcademicaError && <p className="text-danger">{formacionAcademicaError}</p>}
        </Form.Group>
        <Form.Group>
          <Form.Label>Conocimientos requeridos</Form.Label>
          <div className="input-icon-wrapper">
            <FontAwesomeIcon icon={faTools} className="input-icon" />
            <Form.Control
              as="textarea"
              rows={5}
              placeholder="Ingrese los conocimientos requeridos"
              value={conocimientos}
              onChange={(e) => handleInputChange(e, setConocimientos, setConocimientosError, validateConocimientos)}
            />
            <CampoEstado valido={esCampoValido(conocimientos, conocimientosError)} mensajeError={conocimientosError} />
          </div>
          {conocimientosError && <p className="text-danger">{conocimientosError}</p>}
        </Form.Group>
        <Form.Group>
          <Form.Label>Experiencia Requerida</Form.Label>
          <div className="input-icon-wrapper">
            {/* Elige un ícono adecuado para la experiencia requerida */}
            <FontAwesomeIcon icon={faBriefcase} className="input-icon" />
            <Form.Control
              as="textarea"
              rows={5}
              className="textarea-elegante"
              placeholder="Ingrese los detalles de la experiencia requerida"
              value={experiencia}
              onChange={(e) => handleInputChange(e, setExperienciarequerida, setExperienciarequeridaError, validateExperienciarequerida)}
            />
            <CampoEstado valido={esCampoValido(experiencia, experienciarequeridaError)} mensajeError={experienciarequeridaError} />
          </div>
          {experienciarequeridaError && <p className="text-danger">{experienciarequeridaError}</p>}
        </Form.Group>

        <Form.Group>
          <Form.Label>Aptitudes requeridas</Form.Label>
          <div className="input-icon-wrapper">
            <FontAwesomeIcon icon={faClipboardList} className="input-icon" />
            <Form.Control
              as="textarea"
              rows={5}
              placeholder="Ingrese las aptitudes requeridas"
              value={aptitudes}
              onChange={(e) => handleInputChange(e, setAptitudes, setAptitudesError, validateAptitudes)}
            />
            <CampoEstado valido={esCampoValido(aptitudes, aptitudesError)} mensajeError={aptitudesError} />

          </div>
          {aptitudesError && <p className="text-danger">{aptitudesError}</p>}
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
        <Button type="submit" className="btn-primary">
          Guardar
        </Button>
      </div>
      <Modal show={showSuccessModal} onHide={handleSuccessModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>¡Empleo publicado con éxito!</Modal.Title>
        </Modal.Header>
        <Modal.Body>El empleo ha sido publicado correctamente.</Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleSuccessModalClose}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>

    </Form>
  );
};

export default PublicarEmpleo;
