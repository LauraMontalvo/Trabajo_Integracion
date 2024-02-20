
import { TEXTO_INGRESE_DATOS, URL_VALIDAR_AUTENTICACION, ROL_ADMINISTRADOR, MENSAJE_LOGIN_EXITO, TEXTO_IR_PAGINA_PRINCIPAL, TEXTO_INICIO_SESION, TEXTO_INICIAR_SESION, MENSAJE_LOGIN_FALLIDO, URL_REGISTRAR_COMO, URL_ADMIN_CONSOLA } from "../../Models/Constantes"

import axios from 'axios';
import React, { useState } from 'react';
import { Button } from 'reactstrap';
import { Form } from 'react-bootstrap';
import md5 from 'md5';
import "../../Styles/loginstyle.css"
import { Link, useNavigate } from 'react-router-dom';
import logofondo from "../../img/logofondo.png";
import { Row, Col } from 'react-bootstrap';
import * as constantes from '../../Models/Constantes'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faLock, faEyeSlash, faEye, faExclamationCircle, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { Alert } from 'react-bootstrap';

const LoginAdminForm = (props) => {
  const [password, setPassword] = useState("");
  const [usuario, setUsuario] = useState("");
  const [loginStatus, setLoginStatus] = useState("");
  const navigate = useNavigate();

  const RegresarPaginaPrincipal = () => {
    navigate("/");
  }
  const [showPassword, setShowPassword] = useState(false);
  const handlerLogin = (e) => {
    e.preventDefault();
    if (password === "" || usuario === "") {
      setLoginStatus({ msg: constantes.TEXTO_INGRESE_DATOS, type: "warning" });
    } else {
      const hashedPassword = md5(password); // Cifrar la contraseña con md5

      axios.post(URL_VALIDAR_AUTENTICACION, { usuario, password: hashedPassword })
        .then(respuesta => {
          if (respuesta.data.msg === MENSAJE_LOGIN_EXITO && respuesta.data.user.rol === ROL_ADMINISTRADOR) {
            const user = respuesta.data.user;

            setLoginStatus({ msg: "Inicio de sesión exitoso, redirigiendo...", type: "success" });
            setTimeout(() => navigate(URL_ADMIN_CONSOLA + user._id), 1000);
          } else {
            setLoginStatus({ msg: respuesta.data.msg, type: "danger" }); // Puedes ajustar el tipo según corresponda
          }
        })
        .catch(err => {

          setLoginStatus({ msg: "Usuario o contraseña incorrectos", type: "danger" });

        });
    }

  }

  return (

    <Form onSubmit={handlerLogin} className="mi-formulario" >

      <h2>{constantes.TEXTO_TITULO}</h2>

      <div className='imgs'>
        <img src={logofondo} className="tamañoImagenChavezPamba" />
      </div>
      <h2>{TEXTO_INICIO_SESION}</h2>
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
        <Button type="submit">{TEXTO_INICIAR_SESION}</Button>
        <Button onClick={RegresarPaginaPrincipal} className='btn-primary'>{TEXTO_IR_PAGINA_PRINCIPAL}</Button>
      </div>
      {loginStatus.msg && (
        <Alert variant={loginStatus.type} className="mt-3">
          {loginStatus.type === "danger" && <FontAwesomeIcon icon={faExclamationCircle} className="me-2" />}
          {loginStatus.type === "success" && <FontAwesomeIcon icon={faCheckCircle} className="me-2" />}
          {loginStatus.msg}
        </Alert>
      )}


    </Form>

  )
}

export default LoginAdminForm;
