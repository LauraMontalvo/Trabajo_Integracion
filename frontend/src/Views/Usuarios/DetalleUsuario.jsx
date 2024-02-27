import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEdit, faGraduationCap, faTrashAlt, faInfoCircle, faCalendarAlt,
  faCircleNotch, faHourglassHalf, faExclamationCircle, faCheckCircle,
  faDownload, faCamera, faPencilAlt
} from '@fortawesome/free-solid-svg-icons';


import {
  Button, Image, InputGroup, FormControl, Row, Col, Modal, Form, Tab, Tabs, ListGroup, Card,
  Container
} from 'react-bootstrap';

import EditarUsuario from '../../Components/Usuario/EditarUsuarioComp.jsx';
import "../../Styles/loginstyle.scss"
import "../../Styles/detalle.scss"
import ExperieciaLaboral from '../../Components/Usuario/ExperienciaLaboralComp.jsx';
import CabeceraUsuarioInicio from '../../Components/Usuario/CabeceraUsuarioInicioComp.jsx';
import Select from 'react-select/creatable';
import EditarExperienciaLaboral from '../../Components/Usuario/EditarExperienciaLaboralComp.jsx';
import ListaExperienciaLaboral from '../../Components/Usuario/ListaExperienciaLaboral.jsx';
import ListaInformacionAcademica from '../../Components/Usuario/ListaInformacionAcademica.jsx';
import ImagenPerfil from '../../Components/General/ImagenPerfil.jsx';
import ListaCertificaciones from '../../Components/Usuario/ListaCertificaciones.jsx';
import ListaMisPostulaciones from '../../Components/Usuario/ListaMisPostulaciones.jsx';

const CampoEstado = ({ valido, mensajeError, isEditing }) => {
  if (mensajeError) {
    return <FontAwesomeIcon icon={faExclamationCircle} className="text-danger" />;
  } else if (valido && !isEditing) {
    return <FontAwesomeIcon icon={faCheckCircle} className="text-success" />;
  } else {
    return null; // No muestra nada si el campo no tiene error o si está en modo de edición
  }
}

function DetalleUsuario(props) {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [acadTraining, setAcadTraining] = useState([]);

  const [isEditing, setIsEditing] = useState(false);

  const [tituloObtenido, setTituloObtenido] = useState('');
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [editingAcadTrainingId, setEditingAcadTrainingId] = useState(null);

  const [edad, setEdad] = useState(null);
  const [institucion, setInstitucion] = useState(null);
  const [showAcadTrainingModal, setShowAcadTrainingModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteAcadTrainingId, setDeleteAcadTrainingId] = useState(null);
  const [showExperienceModal, setShowExperienceModal] = useState(false);
  const [isEditingExperience, setIsEditingExperience] = useState(false);
  const [instituciones, setInstituciones] = useState([]);
  const [ubicacion, setUbicacion] = useState('');
  const [verMasDescripcion, setVerMasDescripcion] = useState(false); // Nuevo estado para controlar la visualización

  //Descripcion
  const toggleVerMasDescripcion = () => {
    setVerMasDescripcion(!verMasDescripcion);
  };
  //
  const [errorUbicacion, setErrorUbicacion] = useState('');

  const [experienciaLaboral, setexperienciaLaboral] = useState([]);
  const [institucionSeleccionada, setInstitucionSeleccionada] = useState(null);
  ///
  const [tituloObtenidoError, setTituloObtenidoError] = useState('');
  const [institucionError, setInstitucionError] = useState('');
  const [fechaInicioError, setFechaInicioError] = useState('');
  const [fechaFinError, setFechaFinError] = useState('');
  // ... otros estados ...
  const [showEditExperienceModal, setShowEditExperienceModal] = useState(false);
  const [editingExperienceId, setEditingExperienceId] = useState(null);

  ///
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [successMessage, setSuccessMessage] = useState('');
  const [fechaInicioValida, setFechaInicioValida] = useState(true); // Asumimos que es válida inicialmente
  const [fechaFinValida, setFechaFinValida] = useState(true); // Asumimos que es válida inicialmente


  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
  };
  //
  const handleUbicacionChange = (e) => {
    const { value } = e.target;
    setUbicacion(value);
    validarUbicacion(value);
  };

  const validarUbicacion = (valor) => {
    if (!valor) {
      setErrorUbicacion('La ubicación es obligatoria.');
      return false;
    }

    setErrorUbicacion('');
    return true;
  };

  //Eliminar exoe laboral
  const [showDeleteExperienceModal, setShowDeleteExperienceModal] = useState(false);
  const [deleteExperienceId, setDeleteExperienceId] = useState(null);


  //POSTULACIONES y modal de empleo
  const [postulaciones, setPostulaciones] = useState([]); // Asegúrate de tener este estado
  const [showModal, setShowModal] = useState(false);
  const [empleoSeleccionado, setEmpleoSeleccionado] = useState(null);

  const handleShowModal = (empleo) => {
    setEmpleoSeleccionado(empleo);
    setShowModal(true);
  };

  // Función para eliminar una postulación
  const eliminarPostulacion = async (idPostulacion) => {
    try {
      await axios.delete(`https://46wm6186-8000.use.devtunnels.ms/api/postulation/${idPostulacion}`);
      // Filtra para eliminar la postulación del estado
      const postulacionesActualizadas = postulaciones.filter(postulacion => postulacion._id !== idPostulacion);
      setPostulaciones(postulacionesActualizadas);
    } catch (error) {
      console.error('Error al eliminar postulación:', error);
    }
  };

  ///////////////////
  const [showAddAcadModal, setShowAddAcadModal] = useState(false);

  const handleShowAddAcadModal = () => setShowAddAcadModal(true);
  const handleCloseAddAcadModal = () => setShowAddAcadModal(false);

  const refreshAcadTraining = () => {

    axios.get(`https://46wm6186-8000.use.devtunnels.ms/api/acadTrainings/user/${id}`)
      .then(response => {
        
        setAcadTraining(response.data);
      })
      .catch(error => {
        console.error('Error al cargar la formación académica:', error);
      });
  };
  ///


  const handleCloseDeleteExperienceModal = () => {
    setShowDeleteExperienceModal(false);
    setDeleteExperienceId(null);
  };


  const confirmDeleteExperience = async () => {
    if (deleteExperienceId) {
      try {
        await axios.delete(`https://46wm6186-8000.use.devtunnels.ms/api/workExperience/${deleteExperienceId}`);
 
        cargarExperienciaLaboral();
        handleCloseDeleteExperienceModal();
      } catch (error) {
        console.error('Error al eliminar experiencia laboral', error);
      }
    }
  };

  const handleEditExperienceClick = (experienceId) => {
    setEditingExperienceId(experienceId);
    setShowEditExperienceModal(true);
  };

  //
  const validarTituloObtenido = (valor) => {
    if (!valor) {
      setTituloObtenidoError('El título obtenido es obligatorio.');
      return false;
    }
    setTituloObtenidoError('');
    return true;
  };

  const handleTituloObtenidoChange = (e) => {
    const { value } = e.target;
    setTituloObtenido(value);
    validarTituloObtenido(value);
  };

  const validarFechas = () => {
    let valido = true;
    if (!fechaInicio) {
      setFechaInicioError('La fecha de inicio es obligatoria.');
      valido = false;
    } else {
      setFechaInicioError('');
    }

    if (!fechaFin) {
      setFechaFinError('La fecha de fin es obligatoria.');
      valido = false;
    } else if (fechaFin < fechaInicio) {
      setFechaFinError('La fecha de fin no puede ser anterior a la fecha de inicio.');
      valido = false;
    } else {
      setFechaFinError('');
    }

    return valido;
  };

  const validarFechaInicio = (fecha) => {
    if (!fecha) {
      setFechaInicioError('La fecha de inicio es obligatoria.');
      return false;
    } else if (new Date(fecha) > new Date()) {
      setFechaInicioError('La fecha de inicio no puede ser futura.');
      return false;
    } else {
      setFechaInicioError('');
      return true;
    }
  };
  const validarFechaFin = (fechaInicio, fechaFin) => {
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0); 

    if (!fechaFin) {
      setFechaFinError('La fecha de fin es obligatoria.');
      return false;
    } else if (new Date(fechaFin) < new Date(fechaInicio)) {
      setFechaFinError('La fecha de fin no puede ser anterior a la fecha de inicio.');
      return false;
    } else if (new Date(fechaFin) > hoy) {
      setFechaFinError('La fecha de fin no puede ser una fecha futura.');
      return false;
    } else {
      setFechaFinError('');
      return true;
    }
  };
  const handleFechaInicioChange = (e) => {
    const nuevaFechaInicio = e.target.value;
    setFechaInicio(nuevaFechaInicio);
    validarFechaInicio(nuevaFechaInicio);
  };

  const handleFechaFinChange = (e) => {
    const nuevaFechaFin = e.target.value;
    setFechaFin(nuevaFechaFin);
    validarFechaFin(fechaInicio, nuevaFechaFin);
  };



  const validarInstitucion = () => {
    // Si estamos editando y la institución seleccionada ya existe, la validación pasa
    if (editingAcadTrainingId && institucionSeleccionada) {
      setInstitucionError('');
      return true;
    }

    // Si estamos agregando una nueva formación o cambiando la institución en una existente
    if (!institucion || !institucion.value) {
      setInstitucionError('La selección de una institución es obligatoria.');
      return false;
    }

    setInstitucionError('');
    return true;
  };

  // ... validaciones adicionales si son necesarias ...

  //
  const esCampoValido = (valor) => {
    return valor.length > 0;
  };

  const handleShowDeleteModal = (id) => {
    setDeleteAcadTrainingId(id);
    setShowDeleteModal(true);
  };
  const showExperienceForm = (isEditing = false) => {
    setIsEditingExperience(isEditing);
    setShowExperienceModal(true);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setDeleteAcadTrainingId(null);
  };
  const confirmDelete = () => {
    if (deleteAcadTrainingId) {
      handleDeleteAcadTraining(deleteAcadTrainingId);
      handleCloseDeleteModal();
    }
  };


  // Estados y manejadores para el modal de editar usuario
  const [showEditUserModal, setShowEditUserModal] = useState(false);
  const handleShowEditUserModal = () => setShowEditUserModal(true);
  const handleCloseEditUserModal = () => setShowEditUserModal(false);



  const recargarInformacionUsuario = () => {
    axios.get(`https://46wm6186-8000.use.devtunnels.ms/api/user/${id}`)
      .then((res) => {
        setUser({ ...res.data });
        const fechaNac = new Date(res.data.fechaNacimiento);
        const hoy = new Date();
        const edadCalculada = hoy.getFullYear() - fechaNac.getFullYear();

        // Ajusta la edad si aún no ha llegado el cumpleaños
        if (
          hoy.getMonth() < fechaNac.getMonth() ||
          (hoy.getMonth() === fechaNac.getMonth() && hoy.getDate() < fechaNac.getDate())
        ) {
          setEdad(edadCalculada - 1);
        } else {
          setEdad(edadCalculada);
        }
      })
      .catch((err) => console.log(err));
  };

  function toShortDateFormat(dateString) {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  }

  const cargarExperienciaLaboral = () => {
    axios.get(`https://46wm6186-8000.use.devtunnels.ms/api/workExperiences/user/${id}`)
      .then((res) => {
        setexperienciaLaboral(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {

    const cargarPostulaciones = async () => {
      try {

        const response = await axios.get(`https://46wm6186-8000.use.devtunnels.ms/api/postulations/user/${id}`);


        setPostulaciones(response.data);
      } catch (error) {
        console.error('Error al cargar postulaciones:', error);
      }
    };

    cargarPostulaciones();

    axios.get(`https://46wm6186-8000.use.devtunnels.ms/api/user/${id}`)
      .then((res) => {
        setUser({ ...res.data });


        recargarInformacionUsuario();
      })
      .catch((err) => console.log(err));


    axios.get(`https://46wm6186-8000.use.devtunnels.ms/api/acadTrainings/user/${id}`)
      .then((res) => {
        setAcadTraining(res.data);
      })
      .catch((err) => console.log(err));

    cargarInstituciones();
    cargarExperienciaLaboral();
  }, [id]);

  const cargarInstituciones = () => {
    axios.get('https://46wm6186-8000.use.devtunnels.ms/api/schools').then(res => setInstituciones(res.data)).catch(err => console.log(err));
  }



  const handleShowAcadTrainingModal = (acadTrainingId = null) => {
    setShowAcadTrainingModal(true);

    if (acadTrainingId) {
      const selectedAcadTraining = acadTraining.find((item) => item._id === acadTrainingId);
      if (selectedAcadTraining && selectedAcadTraining.idInstitucion) {
        setTituloObtenido(selectedAcadTraining.tituloObtenido);
        setFechaInicio(toShortDateFormat(selectedAcadTraining.fechaInicio));
        setFechaFin(toShortDateFormat(selectedAcadTraining.fechaFin));
        setUbicacion(selectedAcadTraining.idInstitucion.ubicacion || '');

        setEditingAcadTrainingId(acadTrainingId);

        if (selectedAcadTraining.idInstitucion) {
          setInstitucion({
            label: selectedAcadTraining.idInstitucion.nombreInstitucion,
            value: selectedAcadTraining.idInstitucion._id
          });
          // Asegúrate de establecer la ubicación aquí
          setUbicacion(selectedAcadTraining.idInstitucion.ubicacion || '');
        } else {
          setInstitucion(null);
          setUbicacion('');
        }
      }
    } else {
      // Restablecer los valores para una nueva entrada
      setTituloObtenido('');
      setFechaInicio('');
      setFechaFin('');
      setUbicacion('');
      setEditingAcadTrainingId(null);
      setInstitucion(null);
    }
  };

  const handleCloseAcadTrainingModal = () => {
    setShowAcadTrainingModal(false);
    setEditingAcadTrainingId(null);
    setTituloObtenido('');
    setFechaInicio('');
    setFechaFin('');
    setUbicacion('');
    setInstitucion(null);
    // Limpiar los mensajes de error
    setTituloObtenidoError('');
    setInstitucionError('');
    setFechaInicioError('');
    setFechaFinError('');
    setFechaFinValida('');
    setErrorUbicacion('');
    setFechaInicioValida('');
  };
  const handleInstitucion = (institucionCarga) => {
    setInstitucion(institucionCarga);

    const institucionEncontrada = instituciones.find(inst => inst._id === institucionCarga.value);
    if (institucionEncontrada) {
  
      setUbicacion(institucionEncontrada.ubicacion);
    } else {
   
      setUbicacion('');
    }
  };



  const handleAddAcadTraining = async () => {



    const esTituloValido = validarTituloObtenido(tituloObtenido);
    const esFechaInicioValida = validarFechaInicio(fechaInicio);
    const esFechaFinValida = validarFechaFin(fechaInicio, fechaFin);
    const esInstitucionValida = validarInstitucion(institucion);
    const esUbicacionValida = validarUbicacion(ubicacion);

    if (!esTituloValido || !esFechaInicioValida || !esFechaFinValida || !esInstitucionValida || !esUbicacionValida) {
      // No continuar si hay errores
      return;
    }
    try {
      let idInstitucion = null;
      let ubicacionInstitucion = null;

      if (institucion) {
        if (!instituciones.find(inst => inst.nombreInstitucion === institucion.label)) {
          const response = await axios.post('https://46wm6186-8000.use.devtunnels.ms/api/school/new', {
            nombreInstitucion: institucion.label,
            ubicacion: ubicacion // Incluye la ubicación aquí
          });
          idInstitucion = response.data.insertedSchool._id;
          cargarInstituciones(); // Recarga las instituciones para incluir la nueva
        } else {
          // Aquí debes encontrar la ubicación de la institución existente
          const institucionExistente = instituciones.find(inst => inst._id === institucion.value);
          idInstitucion = institucion.value;
          ubicacionInstitucion = institucionExistente.ubicacion;
        }
      }
      if (institucion && institucion.value) {
        // Si la institución es existente y la ubicación ha cambiado
        const institucionExistente = instituciones.find(inst => inst._id === institucion.value);
        if (institucionExistente && institucionExistente.ubicacion !== ubicacion) {
          await axios.put(`https://46wm6186-8000.use.devtunnels.ms/api/school/${institucion.value}`, {
            ubicacion: ubicacion
          });
        }
      }
      const dataToSend = {
        tituloObtenido,
        idInstitucion,
        fechaInicio,
        fechaFin,
        ubicacion: ubicacionInstitucion
      };

      if (editingAcadTrainingId) {
        await axios.put(`https://46wm6186-8000.use.devtunnels.ms/api/acadTraining/${editingAcadTrainingId}`, dataToSend);
      } else {
        await axios.post('https://46wm6186-8000.use.devtunnels.ms/api/acadTraining/new', {
          ...dataToSend, idUsuario: id
        });
      }
      refreshAcadTraining();
      handleCloseAcadTrainingModal();

      if (editingAcadTrainingId) {
        setSuccessMessage('La información ha sido actualizada correctamente.');
      } else {
        setSuccessMessage('Información agregada exitosamente.');
      }
      setShowSuccessModal(true);
    } catch (error) {
      console.error('Error al agregar/editar datos académicos:', error);
    }
  };

  const [showAddExperienceModal, setShowAddExperienceModal] = useState(false);


  const handleCloseAddExperienceModal = () => {
    setShowAddExperienceModal(false);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };
  const format = (dateString) => {
    if (!dateString) {
      return 'No disponible';
    }


    return dateString.split('T')[0];
  };
  const handleDeleteAcadTraining = async (acadTrainingId) => {
    try {
      await axios.delete(`https://46wm6186-8000.use.devtunnels.ms/api/acadTraining/${acadTrainingId}`);
      const updatedAcadTrainings = acadTraining.filter(item => item._id !== acadTrainingId);
      setAcadTraining(updatedAcadTrainings);
    } catch (error) {
      console.error(error.response.data.error);
    }
  };
  const handleDeleteExperience = async (id) => {
    try {
      await axios.delete(`https://46wm6186-8000.use.devtunnels.ms/api/workExperience/${id}`);

      const updatedExperiences = experienciaLaboral.filter(experiencia => experiencia._id !== id);
      setexperienciaLaboral(updatedExperiences);
    } catch (error) {
      console.error('Error al eliminar experiencia laboral', error);
    }
  };
  const onUserPhotoUpdated = (newPhotoUrl) => {
    setUser((prevUser) => ({ ...prevUser, foto: newPhotoUrl }));
  };




  return (
    <div className='App'>
      <CabeceraUsuarioInicio />
      <Container fluid className="mt-4">
        <Row>
          <Col xs={12} md={6} lg={4}  >

            <Card className="datos-personales-card">
              <Card.Body className="mt-4">
                <ImagenPerfil
                  id={id}
                  userParam={user}
                  isEditingParam={isEditing}
                  onPhotoUpdated={onUserPhotoUpdated} // Asegúrate de pasar esta función como prop
                />                <div className="text-center"> <Card.Title ><strong>{user.nombre} {user.apellido}</strong></Card.Title></div>

                <ListGroup variant="flush">

                  <Card.Header >
                    <div className="header-content">
                      <h5> Datos Personales</h5>

                    </div>
                    <FontAwesomeIcon icon={faPencilAlt} onClick={handleShowEditUserModal} className="edit-icon" />
                  </Card.Header>

                  <ListGroup.Item className="list-group-item">
                    <span className="field-title">Género:</span> <span className="field-value">{user.sexo}</span>
                  </ListGroup.Item>
                  <ListGroup.Item className="list-group-item">
                    <span className="field-title">Descripción Personal: </span>
                    <span className="field-value descripcion-personal">

                      {verMasDescripcion || user.descripcionPersonal?.length <= 10
                        ? user.descripcionPersonal
                        : `${user.descripcionPersonal?.substring(0, 10)}... `}
                      {user.descripcionPersonal?.length > 10 && (
                        <Button variant="link" onClick={toggleVerMasDescripcion}>
                          {verMasDescripcion ? 'Ver menos' : 'Ver más'}
                        </Button>
                      )}
                    </span>
                  </ListGroup.Item>
                  <ListGroup.Item className="list-group-item">
                    <span className="field-title">Fecha de Nacimiento:</span> <span className="field-value">{format(user.fechaNacimiento)}</span>
                  </ListGroup.Item>
                  <ListGroup.Item className="list-group-item">
                    <span className="field-title">Teléfono:</span> <span className="field-value">{user.telefono}</span>
                  </ListGroup.Item>
                  <ListGroup.Item className="list-group-item">
                    <span className="field-title">Edad:</span> <span className="field-value">{edad !== null ? `${edad} años` : ''}</span>
                  </ListGroup.Item>





                  <Modal show={showEditUserModal} onHide={handleCloseEditUserModal} size="lg">
                    <Modal.Header closeButton>
                      <Modal.Title className='tituloModal'>Editar Usuario</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <EditarUsuario id={id} onUsuarioUpdated={recargarInformacionUsuario} closeEditModal={() => setShowEditUserModal(false)} />
                    </Modal.Body>
                  </Modal>
                </ListGroup>

              </Card.Body>

            </Card>


          </Col>
          <Col md={8}>
            {/* Pestañas para información académica y laboral */}
            <Tabs defaultActiveKey="academic" id="info-tab" >
              <Tab eventKey="academic" title="Información Académica">
                <Card>
                  <Card.Body>
                    {acadTraining.length > 0 ? (
                      <ListaInformacionAcademica
                        acadTraining={acadTraining}
                        handleShowAcadTrainingModal={handleShowAcadTrainingModal}
                        handleShowDeleteModal={handleShowDeleteModal}
                      />
                    ) : (

                      <p>No se ha publicado información académica.</p>

                    )}

                    <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
                      <Modal.Header closeButton>
                        <Modal.Title>Confirmar Eliminación</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        ¿Estás seguro de que deseas eliminar esta formación académica?
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseDeleteModal}>
                          Cancelar
                        </Button>
                        <Button variant="danger" onClick={confirmDelete}>
                          Eliminar
                        </Button>
                      </Modal.Footer>
                    </Modal>


                    <Card.Body className="text-center">
                      <Button variant="primary" onClick={handleShowAcadTrainingModal} className="mt-3">
                        Agregar Información Académica
                      </Button>
                    </Card.Body>
                    <Modal show={showAcadTrainingModal} onHide={handleCloseAcadTrainingModal} size='lg'>
                      <Modal.Header closeButton>
                        <Modal.Title className='tituloModal'>{editingAcadTrainingId ? 'Editar' : 'Agregar'} Información Académica</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <Form className="mi-formulario">
                          <Form.Group controlId="formTitulo">
                            <Form.Label>Título obtenido</Form.Label>
                            <div className="input-icon-wrapper">
                              <FontAwesomeIcon icon={faGraduationCap} className="input-icon" />
                              <Form.Control
                                type="text"
                                placeholder="Ingrese el título obtenido"
                                value={tituloObtenido}
                                onChange={handleTituloObtenidoChange}
                                isInvalid={!!tituloObtenidoError}
                              />
                              {/* Asegúrate de pasar isEditing al componente CampoEstado */}
                              <CampoEstado valido={esCampoValido(tituloObtenido)} mensajeError={tituloObtenidoError} isEditing={!!editingAcadTrainingId} />
                            </div>
                            {tituloObtenidoError && <p className="text-danger">{tituloObtenidoError}</p>}
                          </Form.Group>


                          <Form.Group>
                            <Form.Label>Institución</Form.Label>
                            <div className="input-icon-wrapper-select">
                              <Select
                                isCreatable
                                onChange={handleInstitucion}
                                options={instituciones.map((institucion) => ({
                                  label: institucion.nombreInstitucion,
                                  value: institucion._id
                                }))}
                                value={
                                  editingAcadTrainingId && institucionSeleccionada
                                    ? {
                                      label: institucionSeleccionada.nombreInstitucion,
                                      value: institucionSeleccionada._id
                                    } : institucion
                                }
                                placeholder="Seleccionar institución" // Placeholder añadido aquí
                                formatCreateLabel={(inputValue) => `Crear "${inputValue}"`}
                              />
                            </div>
                            {institucionError && <p className="text-danger">{institucionError}</p>}


                          </Form.Group>
                          <Form.Group controlId="formUbicacion">
                            <Form.Label>Ubicación</Form.Label>
                            <div className="input-icon-wrapper">
                              <Form.Control
                                type="text"
                                placeholder="Ingrese la ubicación"
                                value={ubicacion}
                                onChange={handleUbicacionChange}
                                isInvalid={!!errorUbicacion}
                              />
                              {/* Muestra el icono de error si hay un error */}
                              <CampoEstado valido={esCampoValido(ubicacion)} mensajeError={errorUbicacion} isEditing={!!editingAcadTrainingId} />
                            </div>
                            {/* Muestra el mensaje de error si hay un error */}
                            {errorUbicacion && <p className="text-danger">{errorUbicacion}</p>}
                          </Form.Group>
                          <Row>
                            <Col md={5} lg={6}  >
                              <Form.Group>
                                <Form.Label>Fecha de inicio</Form.Label>
                                <div className="input-icon-wrapper">
                                  <Form.Control
                                    type="date"
                                    value={fechaInicio}
                                    onChange={handleFechaInicioChange}
                                    isInvalid={!!fechaInicioError}
                                  />
                                  <CampoEstado valido={esCampoValido(fechaInicio)} mensajeError={fechaInicioError} isEditing={!!editingAcadTrainingId} />

                                </div>
                                {fechaInicioError && <p className="text-danger">{fechaInicioError}</p>}
                              </Form.Group>



                            </Col>
                            <Col md={5} lg={6} >
                              <Form.Group>
                                <Form.Label>Fecha de fin</Form.Label>
                                <div className="input-icon-wrapper">
                                  <Form.Control
                                    type="date"
                                    value={fechaFin}
                                    onChange={handleFechaFinChange}
                                    isInvalid={!!fechaFinError}
                                  />
                                  <CampoEstado valido={esCampoValido(fechaFin)} mensajeError={fechaFinError} isEditing={!!editingAcadTrainingId} />

                                </div>
                                {fechaFinError && <p className="text-danger">{fechaFinError}</p>}
                              </Form.Group>

                            </Col>

                          </Row>
                          <div className='botones-centrados' >
                            <Button variant="secondary" onClick={handleCloseAcadTrainingModal}>
                              Cerrar
                            </Button>
                            <Button variant="primary" onClick={handleAddAcadTraining}>
                              {editingAcadTrainingId ? 'Guardar Cambios' : 'Agregar'}
                            </Button>
                          </div>
                        </Form>
                      </Modal.Body>

                    </Modal>
                    <Modal >
                      <Modal.Header closeButton>
                        <Modal.Title>Confirmar Eliminación</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        ¿Estás seguro de que deseas eliminar esta formación académica?
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="secondary" >
                          Cancelar
                        </Button>
                        <Button variant="danger" >
                          Eliminar
                        </Button>
                      </Modal.Footer>
                    </Modal>
                    <Modal show={showSuccessModal} onHide={handleSuccessModalClose}>
                      <Modal.Header closeButton>
                        <Modal.Title className='tituloModal'>
                          <FontAwesomeIcon icon={faCheckCircle} className="text-success me-2" />
                          Operación Exitosa
                        </Modal.Title>
                      </Modal.Header>
                      <Modal.Body>{successMessage}</Modal.Body>
                      <Modal.Footer>
                        <Button variant="success" onClick={handleSuccessModalClose}>
                          Cerrar
                        </Button>
                      </Modal.Footer>
                    </Modal>

                  </Card.Body>
                </Card>
              </Tab>
              <Tab eventKey="certificaciones" title="Certificaciones">
                <Card>
                  <Card.Body>
                    <ListaCertificaciones userId={id} />
                  </Card.Body>
                </Card>
              </Tab>
              <Tab eventKey="laboral" title="Experiencia Laboral">
                <Card>
                  <Card.Body>

                    <ListaExperienciaLaboral
                      experienciaLaboral={experienciaLaboral}
                      onEdit={handleEditExperienceClick}
                      onDelete={handleDeleteExperience}
                      formatDate={formatDate}
                    />


                    {/* Modal para editar experiencia laboral */}
                    <Modal show={showEditExperienceModal} onHide={() => setShowEditExperienceModal(false)} size='lg'>
                      <Modal.Header closeButton>
                        <Modal.Title>Editar Experiencia Laboral</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        {editingExperienceId && <EditarExperienciaLaboral idExperiencia={editingExperienceId} onExperienciaEdited={cargarExperienciaLaboral}
                          closeEditModal={() => setShowEditExperienceModal(false)} />}
                      </Modal.Body>

                    </Modal>

                    <div className='botones-centrados'>
                      <Button variant="primary" onClick={() => showExperienceForm()}>Agregar Experiencia Laboral</Button>
                    </div>
                    <Modal show={showExperienceModal} onHide={() => setShowExperienceModal(false)} size='lg'>
                      <Modal.Header closeButton>
                        <Modal.Title className='tituloModal'>{isEditingExperience ? 'Editar Experiencia Laboral' : 'Agregar Experiencia Laboral'}</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <ExperieciaLaboral
                          idUsuario={id}
                          onExperienciaAdded={cargarExperienciaLaboral}
                          closeAddModal={handleCloseAddExperienceModal}
                        />
                      </Modal.Body>
                    </Modal>

                  </Card.Body>
                </Card>
              </Tab>
              <Tab eventKey="misPostulaciones" title="Mis Postulaciones">
                <Card>
                  <Card.Body>
                    <ListaMisPostulaciones
                      postulaciones={postulaciones}
                      handleShowModal={handleShowModal}
                      eliminarPostulacion={eliminarPostulacion}
                      showModal={showModal}
                      setShowModal={setShowModal}
                      empleoSeleccionado={empleoSeleccionado}
                      setPostulaciones={setPostulaciones} // Pasa setPostulaciones al componente hijo

                    />
                  </Card.Body>
                </Card>


              </Tab>
            </Tabs>

          </Col>
        </Row>
      </Container>
    </div>

  );
}


export default DetalleUsuario;