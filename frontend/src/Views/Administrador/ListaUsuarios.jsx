import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card, Container, Row, Col, Button, Modal, Form } from 'react-bootstrap';
import { faEdit, faUser, faLock, faLockOpen } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.css';
import Cabecera from "../../Components/General/Cabecera";
import TabsAdministracionComp from "../../Components/Administracion/TabsAdministracionComp";
import * as constantes from '../../Models/Constantes';
import "../../Styles/Lista.scss";
import "../../Styles/ListaEmpresa.scss"; // Importa los mismos estilos de ListaEmpresas
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import EditarUsuario from "../../Components/Usuario/EditarUsuarioComp";

const ListaUsuarios = () => {
  const { id } = useParams();
  const [usuarios, setUsuarios] = useState([]);
  const [usuariosFiltrados, setUsuariosFiltrados] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [mostrarActivos, setMostrarActivos] = useState(true);
  const [mostrarInactivos, setMostrarInactivos] = useState(true);

  //editar usuario: 
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const handleEditClick = (userId) => {
    setSelectedUserId(userId);
    setShowEditModal(true);
  };
  ///

  const cargarUsuarios = async () => {
    try {
      const response = await axios.get(constantes.URL_OBTENER_USUARIOS);
      const usuariosFiltrados = response.data.filter(usuario => usuario.rol !== 'Administrador');
      setUsuarios(usuariosFiltrados);
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
    }
  };

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const format = (dateString) => {
    if (!dateString) {
      return 'No disponible';
    }

    // Ya que la fecha está en formato ISO, simplemente devuelve la parte de la fecha.
    return dateString.split('T')[0];
  };
  const filtrarUsuarios = (usuarios) => {
    // Filtra para excluir a los usuarios con rol 'Administrador'
    const soloUsuarios = usuarios.filter(usuario => usuario.rol !== 'Administrador');


    return soloUsuarios;
  };






  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtrados = usuarios.filter(usuario =>
      (usuario.nombre.toLowerCase().includes(query) || usuario.apellido.toLowerCase().includes(query)) &&
      ((mostrarActivos && usuario.estado === 'Activo') || (mostrarInactivos && usuario.estado === 'Inactivo'))
    );
    setUsuariosFiltrados(filtrados);
  };


  const actualizarFiltrado = () => {
    let filtrados;

    // Si ambos checkboxes están desmarcados, muestra todos los usuarios
    if (!mostrarActivos && !mostrarInactivos) {
      filtrados = usuarios;
    } else {
      // Aplica el filtro de búsqueda y de estado activo/inactivo
      filtrados = usuarios.filter(usuario => {
        const coincideNombreOApellido = usuario.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
          usuario.apellido.toLowerCase().includes(searchQuery.toLowerCase());
        const coincideEstado = (mostrarActivos && usuario.estado === 'Activo') ||
          (mostrarInactivos && usuario.estado === 'Inactivo');

        return coincideNombreOApellido && coincideEstado;
      });
    }

    setUsuariosFiltrados(filtrados);
  };
  useEffect(() => {
    actualizarFiltrado();
  }, [mostrarActivos, mostrarInactivos, searchQuery, usuarios]);
  const toggleUsuarioState = (usuario) => {
    const nuevoEstado = usuario.estado === 'Activo' ? 'Inactivo' : 'Activo';

    axios.put(`https://46wm6186-8000.use.devtunnels.ms/api/user/${usuario._id}`, { estado: nuevoEstado })
      .then(res => {


        setUsuarios(prevUsuarios => prevUsuarios.map(usr => usr._id === usuario._id ? { ...usr, estado: nuevoEstado } : usr));
        setUsuariosFiltrados(prevUsuariosFiltrados => prevUsuariosFiltrados.map(usr => usr._id === usuario._id ? { ...usr, estado: nuevoEstado } : usr));

      })
      .catch(err => {
        console.error("Error al cambiar el estado del usuario:", err);
      });
  }



  return (
    <div className="App">
      <TabsAdministracionComp onRecargarUsuarios={cargarUsuarios} />
      <Container fluid className="mt-4">
        <Row>
          <Col md={3} className="widget">
            <h4>Filtrar Usuarios</h4>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Buscar por nombre o apellido"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Check
                type="checkbox"
                label="Mostrar usuarios activos"
                checked={mostrarActivos}
                onChange={(e) => setMostrarActivos(e.target.checked)}
              />
              <Form.Check
                type="checkbox"
                label="Mostrar usuarios inactivos"
                checked={mostrarInactivos}
                onChange={(e) => setMostrarInactivos(e.target.checked)}
              />
            </Form.Group>
          </Col>

          <Col md={9}>
            <Col md={12} className="mb-3">
              <strong>Total de Usuarios:</strong> {usuariosFiltrados.length}
            </Col>
            <Row>


              {usuariosFiltrados.map((usuario) => (

                <Col md={6} key={usuario._id} className="mb-3">

                  <Card className={`empresa-card ${usuario.estado === 'Activo' ? '' : 'card-inactive'}`}>
                    <Card.Body>
                      <Row className="align-items-center">
                        <Col md={8}>
                          <Card.Title><FontAwesomeIcon icon={faUser} className="me-2" />
                            <Link to={`/admin/perfilUsuario/${id}/${usuario._id}`} className="empresa-link">
                              {usuario.nombre} {usuario.apellido}
                            </Link>
                          </Card.Title>
                          <Card.Text><strong>Género:</strong> {usuario.sexo}</Card.Text>
                          <Card.Text><strong>Fecha de Nacimiento:</strong> {format(usuario.fechaNacimiento)}</Card.Text>
                          <Card.Text><strong>Teléfono:</strong> {usuario.telefono}</Card.Text>
                        </Col>
                        <Col xs={12} sm={6} md={4} className="text-right">
                          <div className="icon-container">
                            {/* Icono de editar */}
                            <FontAwesomeIcon
                              className="icon-primary me-2"
                              icon={faEdit}
                              size="lg"
                              onClick={() => handleEditClick(usuario._id)} // Asegúrate de pasar el ID correcto del usuario aquí
                            />
                            {/* Icono de activar/desactivar */}
                            <OverlayTrigger
                              placement="top"
                              overlay={
                                <Tooltip id={`tooltip-${usuario._id}`}>
                                  {usuario.estado === 'Activo' ? 'Desactivar Usuario' : 'Activar Usuario'}
                                </Tooltip>
                              }
                            >
                              <FontAwesomeIcon
                                className={usuario.estado === 'Activo' ? 'icon-active' : 'icon-inactive'}
                                icon={usuario.estado === 'Activo' ? faLockOpen : faLock}
                                size="lg"
                                onClick={() => toggleUsuarioState(usuario)} />
                            </OverlayTrigger>
                          </div>
                        </Col>

                      </Row>
                      <div className="user-status">
                        Estado: <span className={usuario.estado === 'Activo' ? 'text-success' : 'text-danger'}>{usuario.estado}</span>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Editar Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedUserId && (
            <EditarUsuario
              id={selectedUserId}
              onUsuarioUpdated={() => {
                cargarUsuarios(); // Llama a cargarUsuarios para refrescar la lista después de la edición
              }}
              closeEditModal={() => setShowEditModal(false)}
            />
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
}
export default ListaUsuarios;
