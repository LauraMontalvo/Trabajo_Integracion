import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Form, Row, Col, Modal } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import { faUser, faExclamationCircle, faLock, faCheckCircle, faBalanceScale, faPhone, faEnvelope, faMapMarker, faExclamationTriangle, faEye, faEyeSlash, faBuilding, faVenusMars, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import md5 from 'md5';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as constantes from '../../Models/Constantes'

const EditarEmpresa = ({ id, onEmpresaUpdated, closeEditModal }) => {
    const [nombreEmpresa, setNombreEmpresa] = useState("");
    const [correo, setCorreo] = useState("");
    const [direccion, setDireccion] = useState("");
    const [telefono, setTelefono] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [usuario, setUsuario] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [valores, setValores] = useState("");

    const [updateError, setUpdateError] = useState('');
    const navigate = useNavigate();
    const [updateSuccess, setUpdateSuccess] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const [nombreEmpresaError, setNombreEmpresaError] = useState('');
    const [direccionError, setdireccionError] = useState("");
    const [descripcionError, setDescripcionError] = useState("");

    const [correoError, setCorreoError] = useState('');
    const [telefonoError, setTelefonoError] = useState('');
    const [usuarioError, setUsuarioError] = useState('');
    const [valoresError, setValoresError] = useState("");
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');

    const [showErrorModal, setShowErrorModal] = useState(false);

    const handleErrorModalClose = () => {
        setShowErrorModal(false);
        setUsuario('');
    };

    const validarNombreEmpresa = () => {
        if (!nombreEmpresa) {
            setNombreEmpresaError('El nombre de Empresa es obligatorio');
            return false;
        }

        setNombreEmpresaError('');
        return true;
    };

    const validarValores = () => {
        if (!valores || !valores.trim()) {
            setValoresError("Los valores de la empresa son obligatorios");
            return false;
        } else {
            setValoresError("");
            return true;
        }
    };


    const validarDireccion = () => {
        if (!direccion) {
            setdireccionError('La direccion es obligatorio');
            return false;
        }

        setdireccionError('');
        return true;
    };
    const validarTelefono = () => {
        if (!telefono) {
            setTelefonoError('El número de teléfono es obligatorio');
            return false;
        } else if (telefono.length !== 10) {
            setTelefonoError('El número de teléfono debe tener 10 dígitos');
            return false;
        }
        setTelefonoError('');
        return true;
    };
    const validarDescripcion = () => {
        if (!descripcion) {
            setDescripcionError('La Descripcion es obligatoria');
            return false;
        }

        setDescripcionError('');
        return true;
    };

    const validarUsuario = () => {
        if (!usuario) {
            setUsuarioError('La el usuario es obligatoria');
            return false;
        }

        setUsuarioError('');
        return true;
    };
    const validarPassword = () => {
        if (password) {
            if (password.length < 8) {
                setPasswordError('La contraseña debe tener al menos 8 caracteres');
                return false;
            }
            if (!/[A-Z]/.test(password)) {
                setPasswordError('La contraseña debe contener al menos una letra mayúscula');
                return false;
            }
            if (!/[^A-Za-z0-9]/.test(password)) {
                setPasswordError('La contraseña debe contener al menos un carácter especial');
                return false;
            }
            setPasswordError('');
            return true;
        }
        return true; // Si no se intenta cambiar la contraseña, considerarla válida
    };
    const validarConfirmPassword = () => {
        if (password && confirmPassword !== password) {
            setConfirmPasswordError('Las contraseñas no coinciden');
            return false;
        }
        setConfirmPasswordError('');
        return true;
    };
    const validarCorreo = (email) => {
        const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regexCorreo.test(email.toLowerCase());
    }


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
    const handleCorreoChange = (e) => {
        const email = e.target.value || ''; // Asegura que email nunca sea undefined
        setCorreo(email);

        // Ahora realiza la validación
        if (!email) {
            setCorreoError(constantes.TEXTO_CORREO_OBLIGATORIO);
        } else if (!validarCorreo(email)) {
            setCorreoError(constantes.TEXTO_INGRESE_CORREO_VALIDO);
        } else {
            setCorreoError('');
        }
    };

    const handleNombreEmpresaChange = (e) => {
        const nuevoNombre = e.target.value;
        setNombreEmpresa(nuevoNombre);

        // Establece o elimina el mensaje de error según el contenido del campo
        if (!nuevoNombre.trim()) {
            setNombreEmpresaError('El nombre de Empresa es obligatorio');
        } else {
            setNombreEmpresaError('');
        }
    };

    const handleDireccion = (e) => {
        const nuevaDireccion = e.target.value;
        setDireccion(nuevaDireccion);

        // Establece o elimina el mensaje de error según el contenido del campo
        if (!nuevaDireccion.trim()) {
            setdireccionError('La direccion es obligatoria');
        } else {
            setdireccionError('');
        }
    };
    const handleValor = (e) => {
        const nuevoValor = e.target.value;
        setValores(nuevoValor);


        if (!nuevoValor.trim()) {
            setValoresError('Los valores de la empresa son obligatorios');
        } else {
            setValoresError('');
        }
    };
    const handleDescripcion = (e) => {
        const nuevaDescripcion = e.target.value;
        setDescripcion(nuevaDescripcion);


        if (!nuevaDescripcion.trim()) {
            setDescripcionError('La Descripcion es obligatoria');
        } else {
            setDescripcionError('');
        }
    };
    const handleUsuarioChange = (e) => {
        const nuevoUsuario = e.target.value;
        setUsuario(nuevoUsuario);


        if (!nuevoUsuario.trim()) {

            setUsuarioError('El campo de usuario es obligatorio');
        } else {
            setUsuarioError('');
        }
    };
    const handleSuccessModalClose = () => {
        setShowSuccessModal(false);
        if (closeEditModal) {
            closeEditModal();
        }
    };


    const handlePasswrod = (e) => {
        setPassword(e.target.value);
    };
    const handleConfPasswrod = (e) => {
        setConfirmPassword(e.target.value);
    };
    const rol = "Empresa";



    useEffect(() => {
        axios.get(`${constantes.URL_OBTENER_UNA_EMPRESA}/${id}`)
            .then(res => {
                setNombreEmpresa(res.data.nombreEmpresa);
                setCorreo(res.data.correo);
                setDireccion(res.data.direccion);
                setTelefono(res.data.telefono);
                setDescripcion(res.data.descripcion);
                setValores(res.data.valores);
                setUsuario(res.data.usuario);

            })
            .catch(err => console.log(err));
    }, [id]);

    const handlerUpdateUsuario = (e) => {
        e.preventDefault();
        let esPasswordValido = true;
        let esConfirmPasswordValido = true;

        // Solo validar si el usuario ha intentado cambiar la contraseña
        if (password) {
            esPasswordValido = validarPassword();
            esConfirmPasswordValido = validarConfirmPassword();
        }

        if (!esPasswordValido || !esConfirmPasswordValido) {
            return; // Detiene la función si hay errores
        }
        const esNombreEmpresaValido = validarNombreEmpresa();
        const esCorreoValido = validarCorreo(correo);
        const esTelefonoValido = validarTelefono();
        const esDireccionValida = validarDireccion();
        const esDescripcionValida = validarDescripcion();
        const esUsuarioValido = validarUsuario();
        const esvalorValido = validarValores();

        // ... (Validar otros campos)

        if (!esNombreEmpresaValido || !esCorreoValido || !esTelefonoValido || !esDireccionValida || !esDescripcionValida || !esUsuarioValido || !esvalorValido) {
            return;
        }
        if (password !== confirmPassword) {
            setUpdateError("Las contraseñas no coinciden");
            return;
        }
        const dataToUpdate = {
            nombreEmpresa,
            rol,
            correo,
            valores,
            descripcion,
            direccion,
            telefono,
            usuario,
        };

        if (password && confirmPassword) {
            // Cifra la nueva contraseña antes de enviarla al servidor
            dataToUpdate.password = md5(password);
            dataToUpdate.confirmPassword = md5(confirmPassword);
        }
        axios.put(`${constantes.URL_ACTUALIZAR_EMPRESA}/${id}`, dataToUpdate)
            .then((res) => {
                console.log(res.data);
                setUpdateSuccess("Se ha actualizado correctamente");
                // Limpia el mensaje de error en caso de que hubiera uno previamente
                setUpdateError('');
                if (onEmpresaUpdated) {
                    onEmpresaUpdated(dataToUpdate); // Llama a la función callback y pasa los datos actualizados
                }
                setShowSuccessModal(true);  // Muestra el modal de éxito
            })
            .catch((err) => {
                if (err.response && err.response.status === 400) {
                    if (err.response.data.msg === "El nombre de usuario ya está en uso.") {
                        setShowErrorModal(true); // Muestra el modal de error
                        setUsuario(''); // Limpia el campo de usuario
                    } else {
                        setUpdateError(err.response.data.msg); // Maneja otros mensajes de error del backend
                    }
                } else {
                    setUpdateError('Ocurrió un error desconocido al actualizar la empresa.'); // Maneja otros errores
                }
            });
    };

    return (
        <div className="container mt-4">

            <Form onSubmit={handlerUpdateUsuario} className="mi-formulario " >
                <Row>
                    <Col md={6}>
                        <Form.Group>
                            <Form.Label>Nombre de la Empresa</Form.Label>
                            <div className="input-icon-wrapper">
                                <FontAwesomeIcon icon={faBuilding} className="input-icon fa-lg" />
                                <Form.Control
                                    type="text"
                                    placeholder="Ingrese Nombre de la Empresa"
                                    onChange={handleNombreEmpresaChange}
                                    value={nombreEmpresa}
                                    isInvalid={!!nombreEmpresaError} />
                            </div>
                            <div className="text-danger">{nombreEmpresaError}</div>
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group >
                            <Form.Label>Correo Electrónico:</Form.Label>
                            <div className="input-icon-wrapper">
                                <FontAwesomeIcon icon={faEnvelope} className="input-icon fa-lg" />
                                <Form.Control
                                    type="email"

                                    onChange={handleCorreoChange}
                                    value={correo}
                                    isInvalid={!!correoError} />
                            </div>
                            {correoError && <div className="text-danger">{correoError}</div>}
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Form.Group controlId="formNombre">
                        <Form.Label> Dirección </Form.Label>
                        <div className="input-icon-wrapper">
                            <FontAwesomeIcon icon={faMapMarker} className="input-icon fa-lg" /> {/* Icono de dirección */}
                            <Form.Control
                                placeholder="Ingrese su Direccion"
                                type="text"
                                onChange={handleDireccion}
                                value={direccion}
                                isInvalid={!!direccionError} />

                        </div>
                        <div className="text-danger">{direccionError}</div>

                    </Form.Group>
                </Row>
                <Form.Group >
                    <Form.Label>Valores</Form.Label>
                    <div className="input-icon-wrapper">
                        <FontAwesomeIcon icon={faBalanceScale} className="input-icon" />
                        <Form.Control as="textarea"
                            rows={4}
                            placeholder="Ingrese la descripción de la empresa"
                            onChange={handleValor}
                            value={valores}
                            isInvalid={!!valoresError} />
                    </div>
                    <div className="text-danger">{valoresError}</div>

                </Form.Group>
                <Form.Group >
                    <Form.Label>Descripción</Form.Label>
                    <div className="input-icon-wrapper">
                        <Form.Control as="textarea"
                            rows={4}
                            placeholder="Ingrese la descripción de la empresa"
                            onChange={handleDescripcion}
                            value={descripcion}
                            isInvalid={!!descripcionError} />
                    </div>
                    <div className="text-danger">{descripcionError}</div>

                </Form.Group>
                <Row>

                    <Col md={6}>
                        <Form.Group controlId="formTelefono">
                            <Form.Label>Teléfono:</Form.Label>
                            <div className="input-icon-wrapper">
                                <FontAwesomeIcon icon={faPhone} className="input-icon" />
                                <Form.Control
                                    type="text"
                                    placeholder="Ingrese su teléfono"
                                    onChange={handleTelefonoChange}
                                    value={telefono}
                                    isInvalid={!!telefonoError} />
                            </div>
                            {telefonoError && <div className="text-danger">{telefonoError}</div>}
                        </Form.Group>


                    </Col>
                    <Col md={6}>
                        <Form.Group controlId="formUsuario">
                            <Form.Label>Usuario:</Form.Label>
                            <div className="input-icon-wrapper">
                                <FontAwesomeIcon icon={faUserCircle} className="input-icon fa-lg" /> {/* Icono de usuario */}

                                <Form.Control type="text"
                                    placeholder="Ingrese su Usuario"
                                    onChange={handleUsuarioChange}
                                    value={usuario}
                                    isInvalid={!!usuarioError} />

                            </div>
                            <div className="text-danger">{usuarioError}</div>


                        </Form.Group>
                    </Col>

                </Row>

                <Row>


                </Row>

                <Row>

                    <Col md={6}>
                        <Form.Group controlId="formPassword">
                            <Form.Label>Contraseña:</Form.Label>
                            <div className="password-field">
                                <FontAwesomeIcon icon={faLock} className="field-icon" />
                                <Form.Control
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Ingrese nueva contraseña"
                                    onChange={handlePasswrod}
                                    value={password}
                                    className="password-input"

                                />
                                <FontAwesomeIcon
                                    icon={showPassword ? faEyeSlash : faEye}
                                    className="toggle-password-icon"
                                    onClick={() => setShowPassword(!showPassword)}
                                />
                            </div>
                            {passwordError && <div className="text-danger">{passwordError}</div>}
                        </Form.Group>
                    </Col>

                    {/* Campo de Confirmación de Contraseña */}
                    <Col md={6}>
                        <Form.Group controlId="formConfirmPassword">
                            <Form.Label>Confirmar Contraseña:</Form.Label>
                            <div className="password-field">
                                <FontAwesomeIcon icon={faLock} className="field-icon" />
                                <Form.Control
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Confirmar Contraseña"
                                    onChange={handleConfPasswrod}
                                    value={confirmPassword}
                                    className="password-input"

                                />
                                <FontAwesomeIcon
                                    icon={showPassword ? faEyeSlash : faEye}
                                    className="toggle-password-icon"
                                    onClick={() => setShowPassword(!showPassword)}
                                />
                            </div>
                            {confirmPasswordError && <div className="text-danger">{confirmPasswordError}</div>}
                        </Form.Group>
                    </Col>
                </Row>

                <div>
                    <p style={{ color: 'green' }}>{updateSuccess}</p>
                    <p style={{ color: 'red' }}>{updateError}</p>
                </div>

                <div className="botones-centrados">
                    <Button variant='primary' type="submit" className='btn'>Guardar</Button>

                </div>
                <Modal show={showSuccessModal} onHide={handleSuccessModalClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Empresa actualizada con éxito</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>La información de la empresa ha sido actualizada correctamente.</Modal.Body>
                    <Modal.Footer>
                        <Button variant="success" onClick={handleSuccessModalClose}>
                            Cerrar
                        </Button>
                    </Modal.Footer>
                </Modal>
                <Modal show={showErrorModal} onHide={handleErrorModalClose}>
                    <Modal.Header closeButton className="bg-danger text-white">
                        <Modal.Title id="contained-modal-title-vcenter">
                            <FontAwesomeIcon icon={faExclamationCircle} /> Error al Actualizar
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Este usuario ya existe, por favor ingrese uno diferente.
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={handleErrorModalClose}>
                            Cerrar
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Form>
        </div>
    );




};

export default EditarEmpresa;
