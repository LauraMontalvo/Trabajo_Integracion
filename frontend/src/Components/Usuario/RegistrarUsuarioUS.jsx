import React, { useState, useEffect } from 'react';


import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../Styles/loginstyle.css';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Modal, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faCalendarAlt, faPhone, faEye, faPen, faEyeSlash, faVenusMars, faUserCircle, faExclamationCircle, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import Cabecera from '../../Components/General/Cabecera';
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
const RegistroUsuarioUS = (props) => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [sexo, setSexo] = useState(null);
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [telefono, setTelefono] = useState('');
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [descripcionPersonal, setdescripcionPersonal] = useState('');
  const [descripcionPersonalError, setdescripcionPersonalError] = useState('');

  const [nombreError, setNombreError] = useState('');
  const [apellidoError, setApellidoError] = useState('');
  const [sexoError, setSexoError] = useState('');
  const [fechaNacimientoError, setFechaNacimientoError] = useState('');
  const [telefonoError, setTelefonoError] = useState('');
  const [usuarioError, setUsuarioError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  const esCampoValido = (valor, error) => {
    return valor !== '' && error === '';
  };

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
    // Redirigir al usuario a la pantalla de inicio de sesión después de cerrar el modal
    navigate('/loginusuario');
  };

  const handleErrorModalClose = () => {
    setShowErrorModal(false);
  };

  const handleSuccessModalShow = () => setShowSuccessModal(true);

  const handleErrorModalShow = () => setShowErrorModal(true);

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);


  const validarEdad = (fechaNacimiento) => {
    const fechaNac = new Date(fechaNacimiento);
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0); // Asegurarse de que solo se considera la fecha

    // Verificar que la fecha de nacimiento no sea futura
    if (fechaNac > hoy) {
      return { esValida: false, mensaje: "La fecha de nacimiento no puede ser futura." };
    }

    let edad = hoy.getFullYear() - fechaNac.getFullYear();
    const diferenciaMeses = hoy.getMonth() - fechaNac.getMonth();

    if (diferenciaMeses < 0 || (diferenciaMeses === 0 && hoy.getDate() < fechaNac.getDate())) {
      edad--;
    }

    // Verificar que la edad sea al menos 18
    if (edad < 18) {
      return { esValida: false, mensaje: "Debes tener al menos 18 años." };
    }

    // Verificar que la fecha de nacimiento sea razonable (por ejemplo, no más de 120 años)
    if (edad > 120) {
      return { esValida: false, mensaje: "Por favor, ingrese una fecha de nacimiento válida." };
    }

    return { esValida: true, mensaje: "" };
  };
  const validarFormularioAntesDeEnviar = () => {
    let formularioEsValido = true;

    // Validar nombre
    if (!nombre) {
      setNombreError(constantes.TEXTO_NOMBRE_USUARIO_OBLIGATORIO);
      formularioEsValido = false;
    } else {
      setNombreError('');
    }

    // Validar apellido
    if (!apellido) {
      setApellidoError(constantes.TEXTO_APELLIDO_USUARIO_OBLIGATORIO);
      formularioEsValido = false;
    } else {
      setApellidoError('');
    }

    if (!sexo || sexo === ' ') {
      setSexoError(constantes.TEXTO_SELECCIONAR_GENERO);
      formularioEsValido = false;
    } else {
      setSexoError('');
    }
    // Validar fecha de nacimiento
    const validacionFechaNac = validarEdad(fechaNacimiento);
    if (!fechaNacimiento) {
      setFechaNacimientoError(constantes.TEXTO_FECHA_NACIMIENTO_OBLIGATORIO);
      formularioEsValido = false;
    } else if (!validacionFechaNac.esValida) {
      setFechaNacimientoError(validacionFechaNac.mensaje);
      formularioEsValido = false;
    } else {
      setFechaNacimientoError('');
    }
    // Validar teléfono
    if (!telefono || telefono.length !== 10) { // Asumiendo que el teléfono debe tener 10 dígitos
      setTelefonoError(constantes.TEXTO_NUMERO_TELEFONOOBLIGATORIO);
      formularioEsValido = false;
    } else {
      setTelefonoError('');
    }

    // Validar usuario
    if (!usuario) {
      setUsuarioError(constantes.TEXTO_USUARIO_OBLIGATORIO);
      formularioEsValido = false;
    } else {
      setUsuarioError('');
    }
    if (!descripcionPersonal) {
      setdescripcionPersonalError(constantes.TEXTO_DESCRIPCIONPERSONAL_OBLIGATORIO);
      formularioEsValido = false;
    } else {
      setdescripcionPersonalError('');
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



  const handleInputChange = (e, setterFunction, errorSetter, otherValue = null) => {
    const { name, value } = e.target;
    // Validación específica para nombre y apellido
    if (name === 'nombre' || name === 'apellido') {
      // Permite letras (con y sin tildes), espacios y la letra ñ
      const regex = /^[A-Za-záéíóúÁÉÍÓÚñÑüÜ\s]+$/;
      if (!regex.test(value) && value !== '') {
        errorSetter('Este campo solo debe contener letras. No se permiten números ni caracteres especiales.');
        return; // Detiene la ejecución si la validación falla
      } else {
        errorSetter(''); // Limpia el mensaje de error si la validación es correcta
      }
    }

   
    setterFunction(value);
    if (name === 'sexo') {
      if (!value || value === ' ') {
        errorSetter(constantes.TEXTO_SELECCIONAR_GENERO);
      } else {
        errorSetter('');
      }
    }

    // ... Lógica para otros campos ...
    setterFunction(value);
    // Validación de la Contraseña
    if (name === 'password') {
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
    // Validación para otros campos

  };

  const handleTelefonoChange = (e) => {
    let value = e.target.value.replace(/[^0-9]/g, ''); // Elimina caracteres no numéricos

    if (value.length > 10) {
      value = value.substring(0, 10); // Restringe el valor a los primeros 10 dígitos
    }

    setTelefono(value);

    if (value.length !== 10) {
      setTelefonoError(constantes.TEXTO_NUMERO_TELEFONO_DEBE_TENER_10_DIGITOS);
    } else {
      setTelefonoError('');
    }
  };

  const onsubmitHandler = (e) => {
    e.preventDefault();
    // Validar formulario
    if (!validarFormularioAntesDeEnviar()) {
      // Si el formulario no es válido, termina la función aquí
      return;
    }
    const fecha = new Date(fechaNacimiento);
    // Ajustar la fecha al huso horario de Ecuador (UTC-5)
    const fechaAjustada = new Date(fecha.getTime() - (5 * 60 * 60 * 1000));

    axios.post(constantes.URL_USUARIO_NUEVO, {
      nombre,
      apellido,
      rol: 'Usuario',
      sexo,
      fechaNacimiento: fechaAjustada.toISOString(),
      telefono,
      usuario,
      password,
      confirmPassword,
      descripcionPersonal,
      estado: 'Activo'
    })
      .then((res) => {
        console.log(res);
        // Extraer la edad de la respuesta del servidor y establecerla en el estado

        handleSuccessModalShow();
        setNombre('');
        setApellido('');
        setSexo('');
        setdescripcionPersonal('');
        setdescripcionPersonalError('');

        setFechaNacimiento('');
        setTelefono('');
        setUsuario('');
        setPassword('');
        setConfirmPassword('');
        setNombreError('');
        setApellidoError('');
        setSexoError('');
        setFechaNacimientoError('');
        setTelefonoError('');
        setUsuarioError('');
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
  };
  const calcularAnioMaximo = () => {
    const fechaActual = new Date();
    const anioActual = fechaActual.getFullYear();
    const mesActual = fechaActual.getMonth() + 1; // +1 porque getMonth() devuelve un índice basado en 0
    const diaActual = fechaActual.getDate();

    // Resta 18 años del año actual
    const anioMaximo = anioActual - 18;

    // Devuelve la fecha en formato YYYY-MM-DD
    return `${anioMaximo}-${mesActual.toString().padStart(2, '0')}-${diaActual.toString().padStart(2, '0')}`;
  };

  return (

    <div className='App'>
      <Form onSubmit={onsubmitHandler} className="mi-formulario">
        <Row>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Nombre</Form.Label>
              <div className="input-icon-wrapper">
                <FontAwesomeIcon icon={faUser} className="input-icon" />
                <Form.Control
                  type="text"
                  placeholder="Ingrese su Nombre"
                  name="nombre" // Importante para la validación
                  value={nombre}
                  onChange={(e) => handleInputChange(e, setNombre, setNombreError)}
                  className="input-with-icon" />
                <CampoEstado valido={esCampoValido(nombre, nombreError)} mensajeError={nombreError} />
              </div>
              {nombreError && <p className="text-danger">{nombreError}</p>} {/* Muestra el mensaje de error aquí */}
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Apellido</Form.Label>
              <div className="input-icon-wrapper">
                <Form.Control
                  type="text"
                  placeholder="Ingrese su Apellido"
                  name="apellido" // Importante para la validación
                  value={apellido}
                  onChange={(e) => handleInputChange(e, setApellido, setApellidoError)}
                  className="input-with-icon" />
                <CampoEstado valido={esCampoValido(apellido, apellidoError)} mensajeError={apellidoError} />
              </div>
              {apellidoError && <p className="text-danger">{apellidoError}</p>} {/* Muestra el mensaje de error aquí */}
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group>
              <Form.Label>Género</Form.Label>
              <div className="input-icon-wrapper">
                <FontAwesomeIcon icon={faVenusMars} className="input-icon" />
                <Form.Control
                  as="select"
                  onChange={(e) => handleInputChange(e, setSexo, setSexoError)}
                  value={sexo || ''}
                  name="sexo"
                  className="input-with-icon"
                >
                  <option value="" disabled>Seleccionar Género</option>
                  <option value="Masculino">Masculino</option>
                  <option value="Femenino">Femenino</option>
                </Form.Control>
                {sexo && <CampoEstado valido={esCampoValido(sexo, sexoError)} mensajeError={sexoError} />}
              </div>
              {sexoError && <p className="text-danger">{sexoError}</p>}
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Fecha de Nacimiento</Form.Label>
              <div className="input-icon-wrapper">
                <FontAwesomeIcon icon={faCalendarAlt} className="input-icon" />
                <Form.Control
                  type="date"
                  max={calcularAnioMaximo()}
                  onChange={(e) => handleInputChange(e, setFechaNacimiento, setFechaNacimientoError)}
                  value={fechaNacimiento}
                  className="input-with-icon"
                />

                <CampoEstado valido={esCampoValido(fechaNacimiento, fechaNacimientoError)} mensajeError={fechaNacimientoError} />

              </div>
              {fechaNacimientoError && <p className="text-danger">{fechaNacimientoError}</p>}
            </Form.Group>
          </Col>
          {/* Repite la misma estructura para otros campos */}

          <Col md={6}>
            <Form.Group>
              <Form.Label>Teléfono</Form.Label>
              <div className="input-icon-wrapper">
                <FontAwesomeIcon icon={faPhone} className="input-icon" />
                <Form.Control
                  type="text"
                  placeholder="Ingrese su teléfono"
                  value={telefono}
                  onChange={handleTelefonoChange} />
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
                  placeholder="Ingrese Usuario"
                  value={usuario}
                  onChange={(e) => handleInputChange(e, setUsuario, setUsuarioError)}
                  className="input-with-icon" />
                <CampoEstado valido={esCampoValido(usuario, usuarioError)} mensajeError={usuarioError} />

              </div>
              {usuarioError && <p className="text-danger">{usuarioError}</p>}
            </Form.Group>
          </Col>
          <Col md={12}>
            <Form.Group>
              <Form.Label>Descripción Personal</Form.Label>
              <div className="input-icon-wrapper">
                <FontAwesomeIcon icon={faPen} className="input-icon" />
                <Form.Control
                  as="textarea"
                  rows={3} // Puedes ajustar el número de líneas iniciales
                  placeholder="Describa brevemente quién es usted"
                  value={descripcionPersonal}
                  onChange={(e) => handleInputChange(e, setdescripcionPersonal, setdescripcionPersonalError)}
                  className="input-with-icon textarea-custom" />
                <CampoEstado valido={esCampoValido(descripcionPersonal, descripcionPersonalError)} mensajeError={descripcionPersonalError} />
              </div>
              {descripcionPersonalError && <p className="text-danger">{descripcionPersonalError}</p>}
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

        <div className="botones-centrados">
          <Button type="submit" className='btn-primary'>Crear cuenta</Button>

        </div>
        <div></div>
        <Modal show={showSuccessModal} onHide={handleSuccessModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>           <FontAwesomeIcon icon={faCheckCircle} className="text-success me-2" />¡Usuario creado con éxito!</Modal.Title>
          </Modal.Header>
          <Modal.Body>Ahora puede acceder con sus credenciales.</Modal.Body>
          <Modal.Footer>
            <Button variant="success" onClick={handleSuccessModalClose}>
              Cerrar
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={showErrorModal} onHide={handleErrorModalClose}>
          <Modal.Header closeButton className="bg-danger text-white">
            <Modal.Title id="contained-modal-title-vcenter">
              <FontAwesomeIcon icon={faExclamationCircle} /> Error
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>

            <p>
            Este usuario ya existe, por favor ingrese uno diferente.
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleErrorModalClose}>
              Cerrar
            </Button>
          </Modal.Footer>
        </Modal>


      </Form>

    </div>


  );
};

export default RegistroUsuarioUS;