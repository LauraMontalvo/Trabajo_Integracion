import { useState, useParams } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../Styles/loginstyle.css'
import { useNavigate } from 'react-router-dom';
import Cabecera from '../General/Cabecera';
import TabsAdministracionComp from './TabsAdministracionComp';
import { Form, Button, Modal, Col, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faInfoCircle, faBalanceScale, faPhone, faEnvelope, faMapMarker, faExclamationTriangle, faEye, faEyeSlash, faBuilding, faVenusMars, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import "../../Styles/detalle.scss"
import * as constantes from '../../Models/Constantes'
import { faCheckCircle, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

const CampoEstado = ({ valido, mensajeError }) => {
  if (mensajeError) {
    return <FontAwesomeIcon icon={faExclamationCircle} className="text-danger" />;
  } else if (valido) {
    return <FontAwesomeIcon icon={faCheckCircle} className="text-success" />;
  } else {
    return null; // No muestra nada si el campo aún no ha sido validado
  }
};
const RegistroEmpresa = ({ onEmpresaRegistered, onCloseRegisterModal }) => {
  const [nombreEmpresa, setNombreEmpresa] = useState("");
  const [correo, setCorreo] = useState("");
  ///
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const handleErrorModalShow = () => setShowErrorModal(true);
  const [showErrorModal, setShowErrorModal] = useState(false);

  const handleErrorModalClose = () => {
    setShowErrorModal(false);
  };
  const [direccion, setDireccion] = useState("");
  const [telefono, setTelefono] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [valores, setValores] = useState("");
  const [valoresError, setValoresError] = useState("");
  const [nombreEmpresaError, setNombreEmpresaError] = useState("");
  const [correoError, setCorreoError] = useState("");
  const [direccionError, setDireccionError] = useState("");
  const [telefonoError, settelefonoError] = useState("");
  const [descripcionError, setDescripcionError] = useState("");
  const [usuarioError, setusuarioError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const rol = constantes.ROL_EMPRESA;

  const [showPassword, setShowPassword] = useState(false);
  const handleSuccessModalShow = () => setShowSuccessModal(true);
  const esCampoValido = (valor, error) => {
    return valor !== '' && error === '';
  };
  const validateValores = () => {
    if (!valores.trim()) {
      setValoresError(constantes.TEXTO_VALORES_OBLIGATORIOS);
      return false;
    } else {
      setValoresError("");
      return true;
    }
  };
  const handleInputChange = (e, setterFunction, errorSetter, otherValue = null) => {
    const { name, value } = e.target;
    setterFunction(value);
    // Validación del Correo Electrónico
    if (name === 'correo') {
      const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!value) {
        errorSetter(constantes.TEXTO_CORREO_OBLIGATORIO);
      } else if (!regexCorreo.test(value)) {
        errorSetter(constantes.TEXTO_INGRESE_CORREO_VALIDO);
      } else {
        errorSetter('');
      }
    }
    // Validación de la Contraseña
    else if (name === 'password') {
      const regexMayuscula = /[A-Z]/;
      const regexCaracterEspecial = /[^A-Za-z0-9]/;
      if (!value) {
        errorSetter(constantes.TEXTO_CONTRASEÑA_OBLIGATORIO);
      } else if (value.length < 8) {
        errorSetter(constantes.TEXTO_CONTRASEÑA_AL_MENOS_8_CARACTERES);
      } else if (!regexMayuscula.test(value)) {
        errorSetter(constantes.TEXTO_CONTRASEÑA_AL_MENOS_UNA_LETRA_MAYUS);
      } else if (!regexCaracterEspecial.test(value)) {
        errorSetter(constantes.TEXTO_CONTRASEÑA_AL_MENOS_UN_CARACTER_ESPECIAL);
      } else {
        errorSetter('');
      }
    }
    // Validación de la Confirmación de la Contraseña
    else if (name === 'confirmPassword') {
      if (value !== otherValue) {
        errorSetter(constantes.TEXTO_CONTRASEÑAS_NO_COINCIDEN);
      } else {
        errorSetter('');
      }
    }
    // Validación para otros campos
    else {
      if (!value) {
        errorSetter(constantes.TEXTO_ESTE_CAMPO_ES_OBLIGATORIO);
      } else {
        errorSetter('');
      }
    }
  };

  const handleTelefonoChange = (e) => {
    let value = e.target.value.replace(/[^0-9]/g, ''); // Elimina caracteres no numéricos

    if (value.length > 10) {
      value = value.substring(0, 10); // Restringe el valor a los primeros 10 dígitos
    }

    setTelefono(value);

    if (value.length !== 10) {
      settelefonoError(constantes.TEXTO_NUMERO_TELEFONO_DEBE_TENER_10_DIGITOS);
    } else {
      settelefonoError('');
    }
  };
  const validarFormularioAntesDeEnviar = () => {
    let formularioEsValido = true;
    if (!validateValores()) {
      formularioEsValido = false;
    }
    // Validar nombre de la empresa
    if (!nombreEmpresa) {
      setNombreEmpresaError(constantes.TEXTO_NOMBRE_EMPRESA_OBLIGATORIO);
      formularioEsValido = false;
    } else {
      setNombreEmpresaError('');
    }
    // Validar correo
    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!correo || !regexCorreo.test(correo)) {
      setCorreoError(constantes.TEXTO_INGRESE_CORREO_VALIDO);
      formularioEsValido = false;
    } else {
      setCorreoError('');
    }
    // Validar dirección
    if (!direccion) {
      setDireccionError(constantes.TEXTO_DIRECCION_EMPRESA_OBLIGATORIO);
      formularioEsValido = false;
    } else {
      setDireccionError('');
    }

    // Validar teléfono
    if (!telefono || telefono.length !== 10) {
      settelefonoError(constantes.TEXTO_NUMERO_TELEFONO_DEBE_TENER_10_DIGITOS);
      formularioEsValido = false;
    } else {
      settelefonoError('');
    }

    // Validar descripción
    if (!descripcion) {
      setDescripcionError(constantes.TEXTO_DESCRIPCION_EMPRESA_OBLIGATORIO);
      formularioEsValido = false;
    } else {
      setDescripcionError('');
    }

    // Validar usuario
    if (!usuario) {
      setusuarioError(constantes.TEXTO_USUARIO_OBLIGATORIO);
      formularioEsValido = false;
    } else {
      setusuarioError('');
    }

    // Validar contraseña
    if (!password) {
      setPasswordError(constantes.TEXTO_CONTRASEÑA_OBLIGATORIO);
      formularioEsValido = false;
    } else {
      setPasswordError('');
    }

    // Validar confirmación de contraseña
    if (!confirmPassword || confirmPassword !== password) {
      setConfirmPasswordError(constantes.TEXTO_CONTRASEÑAS_NO_COINCIDEN);
      formularioEsValido = false;
    } else {
      setConfirmPasswordError('');
    }

    return formularioEsValido;
  };


  const onsubmitHandler = (e) => {
    e.preventDefault();
    if (!validarFormularioAntesDeEnviar()) {
      // Si el formulario no es válido, termina la función aquí
      return;
    }
    axios.post(constantes.URL_EMPRESA_NUEVA, {
      nombreEmpresa, correo, rol, direccion, telefono, descripcion, 
      usuario, valores, password, confirmPassword,estado: 'Activo'
    })
      .then((res) => {
        console.log(res);
        if (onEmpresaRegistered) {
          onEmpresaRegistered(res.data);
        }
        handleSuccessModalShow();
        setNombreEmpresa('');
        setCorreo('');
        //setRol("");
        setDireccion('');

        setTelefono('');
        setDescripcion('');
        setUsuario('');
        setPassword('');
        setConfirmPassword('');
        //setAviso("Empresa creada con exito!!");

        setNombreEmpresaError('');
        setCorreoError("");
        // setRolError('');
        setDireccionError('');

        settelefonoError('');
        setDescripcionError('');
        setusuarioError('');
        setPasswordError('');
        setConfirmPasswordError('');

      })
      .catch((err) => {
        const errorResponse = err.response.data.errors;
        if (err.response.data.msg === constantes.TEXTO_USUARIO_EXISTE) {
          handleErrorModalShow();
          setPassword('');
          setConfirmPassword('');
          setUsuario('');
        }

      });
  }

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
    if (onCloseRegisterModal) {
      onCloseRegisterModal(); // Cierra el modal de registro
    }

  };


  return (
    <div className='App'>


      <Form onSubmit={onsubmitHandler} className="mi-formulario">

        <Row >
          <Col md={6}>
            <Form.Group>
              <Form.Label>Nombre de la Empresa</Form.Label>
              <div className="input-icon-wrapper">
                <FontAwesomeIcon icon={faBuilding} className="input-icon fa-lg" />
                <Form.Control
                  type="text"
                  placeholder="Ingrese Nombre de la Empresa"
                  onChange={(e) => handleInputChange(e, setNombreEmpresa, setNombreEmpresaError)}
                  value={nombreEmpresa}
                />
                <CampoEstado valido={esCampoValido(nombreEmpresa, nombreEmpresaError)} mensajeError={nombreEmpresaError} />
              </div>
              {nombreEmpresaError && <p className="text-danger">{nombreEmpresaError}</p>}
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Correo Electrónico</Form.Label>
              <div className="input-icon-wrapper">
                <FontAwesomeIcon icon={faEnvelope} className="input-icon fa-lg" />
                <Form.Control
                  type="email"
                  name="correo"
                  placeholder="Ingrese el correo electrónico"
                  onChange={(e) => handleInputChange(e, setCorreo, setCorreoError)}
                  value={correo}
                />
                <CampoEstado valido={esCampoValido(correo, correoError)} mensajeError={correoError} />
              </div>
              {correoError && <p className="text-danger">{correoError}</p>}
            </Form.Group>
          </Col>

          <Form.Group>
            <Form.Label>Dirección</Form.Label>
            <div className="input-icon-wrapper">
              <FontAwesomeIcon icon={faMapMarker} className="input-icon fa-lg" />
              <Form.Control
                type="text"
                placeholder="Ingrese la dirección"
                onChange={(e) => handleInputChange(e, setDireccion, setDireccionError)}
                value={direccion}
              />
              <CampoEstado valido={esCampoValido(direccion, direccionError)} mensajeError={direccionError} />
            </div>
            <p className="text-danger">{direccionError}</p>
          </Form.Group>

        

            <Form.Group>
              <Form.Label>Valores</Form.Label>
              <div className="input-icon-wrapper">
                <FontAwesomeIcon icon={faBalanceScale} className="input-icon" />
                <Form.Control
                  as="textarea"
                  rows={4}
                  placeholder="Ingrese los valores de la empresa"
                  value={valores}
                  onChange={(e) => handleInputChange(e, setValores, setValoresError)}
                />
                <CampoEstado valido={esCampoValido(valores, valoresError)} mensajeError={valoresError} />

              </div>
              {valoresError && <p className="text-danger">{valoresError}</p>}
            </Form.Group>

     
       
            <Form.Group>
              <Form.Label>Descripción</Form.Label>
              <div className="input-icon-wrapper">
                <FontAwesomeIcon icon={faInfoCircle} className="input-icon fa-lg" />
                <Form.Control
                  as="textarea"
                  rows={4}
                  placeholder="Ingrese la descripción de la empresa"
                  onChange={(e) => handleInputChange(e, setDescripcion, setDescripcionError)}
                  value={descripcion}
                />
                <CampoEstado valido={esCampoValido(descripcion, descripcionError)} mensajeError={descripcionError} />
              </div>
              <p className="text-danger">{descripcionError}</p>
            </Form.Group>
      
          <Col md={6}>
            <Form.Group>
              <Form.Label>Teléfono</Form.Label>
              <div className="input-icon-wrapper">
                <FontAwesomeIcon icon={faPhone} className="input-icon" />
                <Form.Control
                  type="text"
                  placeholder="Ingrese su teléfono"
                  value={telefono}
                  onChange={handleTelefonoChange}
                />
                <CampoEstado valido={esCampoValido(telefono, telefonoError)} mensajeError={telefonoError} />
              </div>
              {telefonoError && <p className="text-danger">{telefonoError}</p>}
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Usuario</Form.Label>
              <div className="input-icon-wrapper">
                <FontAwesomeIcon icon={faUserCircle} className="input-icon fa-lg" />
                <Form.Control
                  type="text"
                  placeholder="Ingrese el usuario"
                  onChange={(e) => handleInputChange(e, setUsuario, setusuarioError)}
                  value={usuario}
                />
                <CampoEstado valido={esCampoValido(usuario, usuarioError)} mensajeError={usuarioError} />
              </div>
              <p className="text-danger">{usuarioError}</p>
            </Form.Group>
          </Col>


          <Col md={6}>
            <Form.Group>
              <Form.Label>Contraseña</Form.Label>
              <div className="password-field">
                <FontAwesomeIcon icon={faLock} className="field-icon" />
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  placeholder="Ingrese su contraseña"
                  value={password}
                  name="password"
                  onChange={(e) => handleInputChange(e, setPassword, setPasswordError)}
                  className="password-input" />
                <FontAwesomeIcon
                  icon={showPassword ? faEyeSlash : faEye}
                  className="toggle-password-icon"
                  onClick={() => setShowPassword(!showPassword)} />
                <CampoEstado valido={esCampoValido(password, passwordError)} mensajeError={passwordError} />

              </div>
              {passwordError && <p className="text-danger">{passwordError}</p>}


            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Confirmar Contraseña</Form.Label>
              <div className="password-field">
                <FontAwesomeIcon icon={faLock} className="field-icon" />
                <Form.Control
                  type={showPassword ? "text" : "password"}

                  value={confirmPassword}
                  name="confirmPassword"
                  placeholder="Confirme su contraseña"
                  onChange={(e) => handleInputChange(e, setConfirmPassword, setConfirmPasswordError, password)}

                  className="password-input" />
                <FontAwesomeIcon
                  icon={showPassword ? faEyeSlash : faEye}
                  className="toggle-password-icon"
                  onClick={() => setShowPassword(!showPassword)} />
                <div>
                  <CampoEstado valido={esCampoValido(confirmPassword, confirmPasswordError)} mensajeError={confirmPasswordError} />


                </div>

              </div>

              {confirmPasswordError && <p className="text-danger">{confirmPasswordError}</p>}
            </Form.Group>
          </Col>

        </Row>

        <div >
          <div >


            <div className="botones-centrados">
              <Button type="submit" className='btn-primary'>Crear cuenta</Button>
            </div>
            <Modal show={showSuccessModal} onHide={handleSuccessModalClose}>
              <Modal.Header closeButton>
                <Modal.Title className='tituloModal'>¡Empresa creada con éxito!</Modal.Title>
              </Modal.Header>
              <Modal.Body >
                <p>Ahora puede acceder con sus credenciales.</p>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="success" onClick={handleSuccessModalClose}>
                  Cerrar
                </Button>
              </Modal.Footer>
            </Modal>

            <Modal show={showErrorModal} onHide={handleErrorModalClose} centered>
              <Modal.Header closeButton className="bg-danger text-white">
                <Modal.Title className='tituloModal'>¡Error!</Modal.Title>
              </Modal.Header>
              <Modal.Body className="text-center">
                <FontAwesomeIcon icon={faExclamationTriangle} size="3x" className="text-danger mb-3" />
                <p >Este usuario ya existe, por favor ingrese uno diferente.</p>
              </Modal.Body>
              <Modal.Footer className="d-flex justify-content-center">
                <Button variant="danger" onClick={handleErrorModalClose}>
                  Cerrar
                </Button>
              </Modal.Footer>
            </Modal>


          </div>
        </div>

      </Form>
    </div>
  );

}

export default RegistroEmpresa;
