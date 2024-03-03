import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Container, Row, Col, Button, Modal, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faEdit, faTrash, faIndustry, faPhone, faGlobe, faMapMarkerAlt, faLock, faLockOpen } from '@fortawesome/free-solid-svg-icons';
import "../../Styles/Lista.scss";
import "../../Styles/ListaEmpresa.scss";
import EditarEmpresa from "../../Components/Empresa/EditarEmpresaComp";
import TabsAdministracionComp from "../../Components/Administracion/TabsAdministracionComp";
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ListaEmpresas = (props) => {
  const [empresas, setEmpresas] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [empresaToDelete, setEmpresaToDelete] = useState(null);
  const navigate = useNavigate();
  const toggleDeleteModal = () => setDeleteModal(!deleteModal);
  const [recargar, setRecargar] = useState(false);

  const { id } = useParams();
  const [empresa, setEmpresa] = useState({});

  const [editModal, setEditModal] = useState(false);
  const [empresaToEdit, setEmpresaToEdit] = useState(null);
  const [empresaActualizada, setEmpresaActualizada] = useState(false);


  // Estado para el filtro de nombre
  const [filtroNombre, setFiltroNombre] = useState("");
  const handleShowEditUserModal = (empresa) => {
    setEmpresaToEdit(empresa);
    setEditModal(true);
  };

  useEffect(() => {
    axios.get('https://46wm6186-8000.use.devtunnels.ms/api/companies')
      .then(res => {
        setEmpresas(res.data.sort((a, b) => a.nombreEmpresa.localeCompare(b.nombreEmpresa)))
      })
      .catch(err => console.error("Error al obtener empresas:", err));
    axios.get(`https://46wm6186-8000.use.devtunnels.ms/api/company/${id}`)
      .then((res) => {
        setEmpresa({ ...res.data });
      })
      .catch((err) => console.log(err));
    cargarInformacionEmpresa();
  }, [id, empresaActualizada, recargar]);

  const handleCloseEditUserModal = () => {
    setEditModal(false);
    if (empresaActualizada) {
      cargarInformacionEmpresa();
      setEmpresaActualizada(false);
    }
  };

  const prepareDelete = (empresa) => {
    setEmpresaToDelete(empresa);
    toggleDeleteModal();
  }

  const cargarInformacionEmpresa = () => {
    axios.get(`https://46wm6186-8000.use.devtunnels.ms/api/company/${id}`)
      .then((res) => {
        setEmpresa({ ...res.data });
      })
      .catch((err) => console.log(err));
  };

  const deleteEmpresa = () => {
    axios.delete(`https://46wm6186-8000.use.devtunnels.ms/api/company/${empresaToDelete._id}`)
      .then(res => {
     
        removeFromDom(empresaToDelete._id);
        toggleDeleteModal();
      })
      .catch(err => {
        console.error("Error al eliminar empresa:", err);
      });
  }

  const removeFromDom = (empresaId) => {
    setEmpresas(empresas.filter(empresa => empresa._id !== empresaId));
  }

  const updateEmpresaInfo = (updatedEmpresaInfo) => {
    setEmpresa({ ...updatedEmpresaInfo });
    setEmpresaActualizada(true);
  };

  // Función para filtrar empresas por nombre
  const filtrarEmpresasPorNombre = (nombre) => {
    return empresas.filter((empresa) =>
      empresa.nombreEmpresa?.toLowerCase().includes(nombre?.toLowerCase() ?? "")
    );
  };
  const empresasFiltradas = filtrarEmpresasPorNombre(filtroNombre);


  // Función para manejar cambios en el filtro de nombre
  const handleFiltroNombreChange = (event) => {
    setFiltroNombre(event.target.value);
  };


  const addEmpresaToList = (newEmpresa) => {
    setEmpresas([...empresas, newEmpresa]);
    setRecargar(!recargar);
 
  };

  const toggleEmpresaState = (empresa) => {
    const nuevoEstado = empresa.estado === 'Activo' ? 'Inactivo' : 'Activo';

    axios.put(`https://46wm6186-8000.use.devtunnels.ms/api/company/${empresa._id}`, { estado: nuevoEstado })
      .then(res => {
     
        setEmpresas(empresas.map(emp => emp._id === empresa._id ? { ...emp, estado: nuevoEstado } : emp));
      })
      .catch(err => console.error("Error al cambiar el estado de la empresa:", err));
  };

  return (
    <div className="App">
      <TabsAdministracionComp onAddEmpresa={addEmpresaToList} />
      <Container fluid className="mt-4">
        <Row >

          <Col md={3} className="widget">
            <h4>Filtrar Empresas</h4>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Buscar por nombre de empresa"
                value={filtroNombre}
                onChange={handleFiltroNombreChange}
              />
            </Form.Group>

          </Col>
          <Col md={9}>
            <Col md={12} className="mb-3">
              <strong>Total de Empresas:</strong> {empresasFiltradas.length}
            </Col>
            <Row>
              {filtrarEmpresasPorNombre(filtroNombre).map((empresa) => (
                <Col md={6} key={empresa._id} className="mb-3">
                  <Card className="empresa-card">
                    <Card.Body>
                      <Row className="align-items-center">
                        <Col xs={12} sm={6} md={8}>
                          <Card.Title>  <Link to={`/admin/perfil-empresa/${id}/${empresa._id}`} className="empresa-link">
                            {empresa.nombreEmpresa || "Empresa no especificada"}
                          </Link></Card.Title>

                          <Card.Text>
                            <FontAwesomeIcon icon={faEnvelope} /> {empresa.correo}
                          </Card.Text>
                          <Card.Text>
                            <FontAwesomeIcon icon={faMapMarkerAlt} /> {empresa.direccion}
                          </Card.Text>
                          <Card.Text>
                            <FontAwesomeIcon icon={faPhone} /> {empresa.telefono}
                          </Card.Text>
                        </Col>
                        {/* Iconos en la parte derecha */}
                        <Col xs={12} sm={6} md={4} className="text-right">
                          <div className="icon-container">
                            <FontAwesomeIcon className="icon-primary" onClick={() => handleShowEditUserModal(empresa)} icon={faEdit} />
                            <OverlayTrigger
                              placement="top"
                              overlay={
                                <Tooltip id={`tooltip-${empresa._id}`}>
                                  {empresa.estado === 'Activo' ? 'Desactivar Empresa' : 'Activar Empresa'}
                                </Tooltip>
                              }
                            >
                              <FontAwesomeIcon
                                className={empresa.estado === 'Activo' ? 'icon-active' : 'icon-inactive'}
                                icon={empresa.estado === 'Activo' ? faLockOpen : faLock}
                                size="lg"
                                onClick={() => toggleEmpresaState(empresa)} />
                            </OverlayTrigger>
                          </div>
                        </Col>
                      </Row>
                      <div className="user-status">
                        Estado: <span className={empresa.estado === 'Activo' ? 'text-success' : 'text-danger'}>{empresa.estado}</span>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
      {/* Modal de edición */}
      <Modal show={editModal} onHide={handleCloseEditUserModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title className='tituloModal'>Editar Empresa</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {empresaToEdit && (
            <EditarEmpresa
              id={empresaToEdit?._id}
              onEmpresaUpdated={updateEmpresaInfo}
              closeEditModal={handleCloseEditUserModal}
            />
          )}
        </Modal.Body>
      </Modal>
      {/* Modal de eliminación */}
      <Modal show={deleteModal} onHide={() => setDeleteModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro de que deseas eliminar la empresa {empresaToDelete?.nombreEmpresa}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={deleteEmpresa}>Eliminar</Button>
          <Button variant="secondary" onClick={() => setDeleteModal(false)}>Cancelar</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ListaEmpresas;
