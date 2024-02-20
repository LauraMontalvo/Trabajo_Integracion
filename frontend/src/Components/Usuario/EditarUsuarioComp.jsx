import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Form, Row, Col, Modal } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import "../../Styles/loginstyle.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faCalendarAlt, faPhone, faEye, faEyeSlash, faExclamationCircle, faVenusMars, faUserCircle, faPen, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import * as constantes from '../../Models/Constantes'


import md5 from 'md5';
const EditarUsuario = ({ id, onUsuarioUpdated, closeEditModal }) => {
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [sexo, setSexo] = useState("");
    const [fechaNacimiento, setFechaNacimiento] = useState("");
    const [telefono, setTelefono] = useState("");
    const [usuario, setUsuario] = useState("");
    const [descripcionPersonal, setDescripcionPersonal] = useState("");

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [updateError, setUpdateError] = useState('');
    const navigate = useNavigate();
    const [updateSuccess, setUpdateSuccess] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const [showSuccessModal, setShowSuccessModal] = useState(false);
    //modal de conrfirmacion
    const [fechaNacimientoError, setFechaNacimientoError] = useState('');
    const [telefonoError, setTelefonoError] = useState('');
    const [nombreError, setNombreError] = useState('');
    const [descripcionPersonalError, setdescripcionPersonalError] = useState('');
    const [apellidoError, setApellidoError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [usuarioError, setUsuarioError] = useState('');

    const handleErrorModalClose = () => {
        setShowErrorModal(false);
        setUsuario(''); 
    };


    const calcularAnioMaximo = () => {
        const fechaActual = new Date();
        return fechaActual.getFullYear() - 18;
    };
    const validarEdad = (fechaNacimiento) => {
        const hoy = new Date();
        const fechaNac = new Date(fechaNacimiento);
        let edad = hoy.getFullYear() - fechaNac.getFullYear();
        const diferenciaMeses = hoy.getMonth() - fechaNac.getMonth();

        if (diferenciaMeses < 0 || (diferenciaMeses === 0 && hoy.getDate() < fechaNac.getDate())) {
            edad--;
        }

        return edad >= 18;
    };
    const handleFechaNacimientoChange = (e) => {
        const nuevaFechaNacimiento = e.target.value;
        setFechaNacimiento(nuevaFechaNacimiento);

        if (!validarEdad(nuevaFechaNacimiento)) {
            setFechaNacimientoError("Debes tener al menos 18 años.");
        } else {
            setFechaNacimientoError('');
        }
    };
    const validarNombre = () => {
        if (!nombre) {
            setNombreError('El nombre es obligatorio');
            return false;
        }
   
        setNombreError('');
        return true;
    };
    const validarDescripcionPersonal = () => {
        if (!descripcionPersonal) {
            setdescripcionPersonalError('La descripción persona es obligatoria');
            return false;
        }

        setdescripcionPersonalError('');
        return true;
    };


    const validarApellido = () => {
        if (!apellido) {
            setApellidoError('El apellido es obligatorio');
            return false;
        }
    
        setApellidoError('');
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

    const validarUsuario = () => {
        if (!usuario) {
            setUsuarioError('El usuario es obligatorio');
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
        return true;
    };
    const validarConfirmPassword = () => {
        if (password && confirmPassword !== password) {
            setConfirmPasswordError('Las contraseñas no coinciden');
            return false;
        }
        setConfirmPasswordError('');
        return true;
    };
    const handleNombreChange = (e) => {
        const nuevoNombre = e.target.value;
        setNombre(nuevoNombre);

        
        if (!nuevoNombre) {
            setNombreError('El nombre es obligatorio');
        } else {
            setNombreError('');
        }
    };

    
    const handleApellidoChange = (e) => {
        const nuevoApellido = e.target.value;
        setApellido(nuevoApellido);


        if (!nuevoApellido) {
            setApellidoError('El apellido es obligatorio');
        } else {
            setApellidoError('');
        }
    };


    const handleDescripcionPerChange = (e) => {
        const nuevaDescripcionPer = e.target.value;
        setDescripcionPersonal(nuevaDescripcionPer);

        
        if (!nuevaDescripcionPer) {
            setdescripcionPersonalError('La descripción personal es obligatoria');
        } else {
            setdescripcionPersonalError('');
        }
    };


    const handleUsuarioChange = (e) => {
        const nuevoUsuario = e.target.value;
        setUsuario(nuevoUsuario);

     
        if (!nuevoUsuario.trim()) {
            setUsuarioError('El nombre de usuario es obligatorio');
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
    const rol = "Usuario";

    const handleTelefonoChange = (e) => {
        let value = e.target.value.replace(/[^0-9]/g, ''); 
        if (value.length > 10) {
            value = value.substring(0, 10); 
        }

        setTelefono(value);

        if (value.length !== 10) {
            setTelefonoError(constantes.TEXTO_NUMERO_TELEFONO_DEBE_TENER_10_DIGITOS);
        } else {
            setTelefonoError('');
        }
    };

    useEffect(() => {
        axios.get(`https://46wm6186-8000.use.devtunnels.ms/api/user/${id}`)
            .then(res => {
                setNombre(res.data.nombre);
                setApellido(res.data.apellido);
                setSexo(res.data.sexo);
                setFechaNacimiento(toShortDateFormat(res.data.fechaNacimiento));
                setTelefono(res.data.telefono);
                setUsuario(res.data.usuario);
                setDescripcionPersonal(res.data.descripcionPersonal);
             
            })
            .catch(err => console.log(err));
    }, [id]);
    const refrescarDatosUsuario = () => {
        axios.get(`https://46wm6186-8000.use.devtunnels.ms/api/user/${id}`)
            .then(res => {
                setNombre(res.data.nombre);
                setApellido(res.data.apellido);
                setSexo(res.data.sexo);
                setFechaNacimiento(res.data.fechaNacimiento);
                setTelefono(res.data.telefono);
                setUsuario(res.data.usuario);
                setDescripcionPersonal(res.data.descripcionPersonal);
            })
            .catch(err => console.log(err));
    };
    const handlerUpdateUsuario = (e) => {
        e.preventDefault();
        let esPasswordValido = true;
        let esConfirmPasswordValido = true;


        if (password) {
            esPasswordValido = validarPassword();
            esConfirmPasswordValido = validarConfirmPassword();
        }

        if (!esPasswordValido || !esConfirmPasswordValido) {
            return; 
        }
        const esNombreValido = validarNombre();
        const esApellidoValido = validarApellido();
        const esTelefonoValido = validarTelefono();
        const esUsuarioValido = validarUsuario();
        const esdescripcionPersValido = validarDescripcionPersonal();
        // ... (Validar otros campos)

        if (!esNombreValido || !esApellidoValido || !esTelefonoValido || !esUsuarioValido || !esdescripcionPersValido) {
            return; // Detener si hay errores
        }

        // Verificar si la fecha de nacimiento es válida antes de actualizar
        if (fechaNacimientoError) {
            return; // Detiene la función si hay errores
        }

        if (password !== confirmPassword) {
            setUpdateError("Las contraseñas no coinciden");
            return;
        }
        const dataToUpdate = {
            nombre,
            rol,
            apellido,
            sexo,
            fechaNacimiento,
            telefono,
            usuario,
            descripcionPersonal,
            // Solo incluye las contraseñas si realmente se han ingresado nuevas
            ...(password && confirmPassword && { password: md5(password) })
        };

        axios.put(`https://46wm6186-8000.use.devtunnels.ms/api/user/${id}`, dataToUpdate)
            .then((res) => {

                setUpdateError('');
                setPassword('');
                setConfirmPassword('');
                refrescarDatosUsuario();
                if (onUsuarioUpdated) {
                    onUsuarioUpdated();
                }
                setShowSuccessModal(true);
            })
            .catch((err) => {
                if (err.response && err.response.status === 400 && err.response.data.msg) {
                    if (err.response.data.msg === "El nombre de usuario ya está en uso.") {
                        setShowErrorModal(true); // Solo muestra el modal para este error específico
                        setUsuario(''); // Limpia el campo de usuario
                    } else {
                        setUpdateError(err.response.data.msg); // Para otros mensajes de error del backend
                    }
                } else {
                    setUpdateError('Ocurrió un error desconocido al actualizar el usuario.'); // Para cualquier otro error
                }

            });
    };

    const [showErrorModal, setShowErrorModal] = useState(false);

    function toShortDateFormat(dateString) {
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
    }

    return (
        <div className="container mt-4">

            <Form onSubmit={handlerUpdateUsuario} className="mi-formulario">
                <Row>
                    <Col md={6}>
                        <Form.Group>
                            <Form.Label>Nombre:</Form.Label>
                            <div className="input-icon-wrapper">
                                <FontAwesomeIcon icon={faUser} className="input-icon" />
                                <Form.Control
                                    type="text"
                                    placeholder="Ingrese su Nombre"
                                    onChange={handleNombreChange}
                                    value={nombre}
                                    isInvalid={!!nombreError}
                                />

                            </div>
                            <div className="text-danger">{nombreError}</div>
                        </Form.Group>
                    </Col>

                    {/* Campo de Apellido */}
                    <Col md={6}>
                        <Form.Group>
                            <Form.Label>Apellido:</Form.Label>
                            <div className="input-icon-wrapper">
                            
                                <Form.Control
                                    type="text"
                                    placeholder="Ingrese su Apellido"
                                    onChange={handleApellidoChange}
                                    value={apellido}
                                    isInvalid={!!apellidoError}
                                />
                            </div>
                            <div className="text-danger">{apellidoError}</div>
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group>
                            <Form.Label>Género:</Form.Label>
                            <div className="input-icon-wrapper">
                                <FontAwesomeIcon icon={faVenusMars} className="input-icon" />
                                <Form.Control as="select"
                                    onChange={(e) => setSexo(e.target.value)}
                                    value={sexo}
                                    className="input-with-icon"
                                >
                                    <option value="" disabled> Seleccione el género</option>
                                    <option value="Masculino">Masculino</option>
                                    <option value="Femenino">Femenino</option>
                                </Form.Control>
                            </div>
                        </Form.Group>
                    </Col>




                    <Col md={6}>
                        <Form.Group>
                            <Form.Label>Fecha de Nacimiento</Form.Label>
                            <div className="input-icon-wrapper">
                                <FontAwesomeIcon icon={faCalendarAlt} className="input-icon" />
                                <Form.Control
                                    type="date"
                                    max={`${calcularAnioMaximo()}-12-31`}
                                    onChange={handleFechaNacimientoChange}
                                    value={fechaNacimiento}
                                    isInvalid={!!fechaNacimientoError}
                                />
                            </div>
                            <div>
                                <p className="text-danger" type="invalid">
                                    {fechaNacimientoError}
                                </p>
                            </div>

                        </Form.Group>
                    </Col>


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
                                    isInvalid={!!telefonoError}
                                />

                            </div>
                            <p className="text-danger" type="invalid">
                                {telefonoError}
                            </p>
                        </Form.Group>
                    </Col>

                    <Col md={6}>
                        <Form.Group controlId="formUsuario">
                            <Form.Label>Usuario:</Form.Label>
                            <div className="input-icon-wrapper">
                                <FontAwesomeIcon icon={faUserCircle} className="input-icon fa-lg" />
                                <Form.Control type="text"
                                    placeholder="Ingrese su Usuario"
                                    onChange={handleUsuarioChange}
                                    value={usuario}
                                    isInvalid={!!usuarioError} />

                            </div>
                            <div className="text-danger">{usuarioError}</div>

                        </Form.Group>
                    </Col>
                    <Col md={12}>
                        <Form.Group controlId="formDescripcionPersonal">
                            <Form.Label>Descripción Personal:</Form.Label>
                            <div className="input-icon-wrapper">
                                <FontAwesomeIcon icon={faPen} className="input-icon" />
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    placeholder="Describe brevemente tus habilidades y experiencias"
                                    value={descripcionPersonal}
                                    isInvalid={!!descripcionPersonalError}
                                    onChange={handleDescripcionPerChange}
                                />
                            </div>
                            <div className="text-danger">{descripcionPersonalError}</div>
                        </Form.Group>
                    </Col>


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
                </div><br />
            </Form>
            <Modal show={showSuccessModal} onHide={handleSuccessModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title className='tituloModal'>
                        <FontAwesomeIcon icon={faCheckCircle} className="text-success me-2" />Usuario actualizado con éxito</Modal.Title>
                </Modal.Header>
                <Modal.Body className='tituloModalBody' >La información ha sido actualizada correctamente.</Modal.Body>
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

        </div>
    );
};

export default EditarUsuario;
