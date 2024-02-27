import axios from 'axios';
import React, { useState } from 'react';
import { Button } from 'reactstrap';
import { Form } from 'react-bootstrap';
import md5 from 'md5';
import "../../Styles/loginstyle.css"
import { Link, useNavigate } from 'react-router-dom';
import logofondo from "../../img/logofondo.png";
import { Row, Col, Modal } from 'react-bootstrap';
import * as constantes from '../../Models/Constantes'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faLock,faExclamationCircle, faEyeSlash, faCheckCircle,faEye } from '@fortawesome/free-solid-svg-icons';
import Cabecera from '../../Components/General/Cabecera';
import RegistroUsuarioUS from '../../Components/Usuario/RegistrarUsuarioUS';
import { Alert } from 'react-bootstrap';

const LoginForm = (props) => {
  const [password, setPassword] = useState("");
  const [usuario, setUsuario] = useState("");
  const [loginStatus, setLoginStatus] = useState({ msg: "", type: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const handleRegisterModalShow = () => setShowRegisterModal(true);
  const handleRegisterModalClose = () => setShowRegisterModal(false);

  const navigate = useNavigate();
  const handlerLogin = (e) => {
    e.preventDefault();
    if (password === "" || usuario === "") {
      setLoginStatus({ msg: constantes.TEXTO_INGRESE_DATOS, type: "warning" });

    } else {
      const hashedPassword = md5(password); // Cifra la contraseña con md5

      axios.post(constantes.URL_VALIDAR_AUTENTICACION, { usuario, password: hashedPassword })
        .then(respuesta => {
          if (respuesta.data.msg === constantes.MENSAJE_LOGIN_EXITO) {
            const user = respuesta.data.user;
            setLoginStatus({ msg: "Inicio de sesión exitoso, redirigiendo...", type: "success" });

            setTimeout(() => navigate('/detalleUsuario/' + user._id), 1000);
          } else {
            setLoginStatus({ msg: respuesta.data.msg, type: "danger" });
          }
        })
        .catch(err => {
          setLoginStatus({ msg: 'El usuario o la Contraseña son incorrectos' , type: "danger" });

        });
    }
  }

  const RegresarRegistrarComo = () => navigate("/");



  return (
    <div className='App'>
      <Cabecera></Cabecera>
      <Form onSubmit={handlerLogin} className="mi-formulario" >

        <h2>{constantes.TEXTO_TITULO}</h2>
        <div className='imgs'>
          <img src={logofondo} className="tamañoImagenChavezPamba" />
        </div>

        <h2>{constantes.TEXTO_INICIO_SESION}</h2>

        <Row>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Usuario</Form.Label>
              <div className="input-icon-wrapper">
                <FontAwesomeIcon icon={faUserCircle} className="input-icon fa-lg " />
                <Form.Control
                  type="text"
                  placeholder="Ingrese su usuario"
                  onChange={(e) => setUsuario(e.target.value)}
                  value={usuario}
                />
              </div>
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

                  onChange={(e) => { setPassword(e.target.value); }} value={password}
                  className="password-input" />
                <FontAwesomeIcon
                  icon={showPassword ? faEyeSlash : faEye}
                  className="toggle-password-icon"
                  onClick={() => setShowPassword(!showPassword)} />
              </div>

            </Form.Group>
          </Col>
        </Row>


        <div className="botones-centrados">
          <Button className='btn-primary'>Iniciar Sesión</Button>

          <Button onClick={RegresarRegistrarComo} className='btn-danger'>Cancelar</Button>
        </div>

        {loginStatus.msg && (
        <Alert variant={loginStatus.type} className="mt-3">
          {loginStatus.type === "danger" && <FontAwesomeIcon icon={faExclamationCircle} className="me-2" />}
          {loginStatus.type === "success" && <FontAwesomeIcon icon={faCheckCircle} className="me-2" />}
          {loginStatus.msg}
        </Alert>
      )}
  <div className="mt-4 text-center">
      <h6>¿Aún no estás registrado?</h6>
      <Link to="#" onClick={handleRegisterModalShow} className="text-primary">Regístrate ahora!</Link>
    </div>
      </Form>
      <Modal show={showRegisterModal} onHide={handleRegisterModalClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Registro de Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <RegistroUsuarioUS />
        </Modal.Body>
      </Modal>
    </div>

  )
}

export default LoginForm;