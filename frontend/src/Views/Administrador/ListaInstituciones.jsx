

import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card, Container, Row, Col, Button, Modal, Form } from 'react-bootstrap';
import { faTrash, faEdit, faSchool,faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.css';
import TabsAdministracionComp from "../../Components/Administracion/TabsAdministracionComp";
import "../../Styles/Lista.scss";
import "../../Styles/ListaEmpresa.scss"; // Asegúrate de que estos estilos son adecuados para tu diseño
import EditarInstitucionComp from "../../Components/Administracion/EditarInstitucionComp";


const ListaInstituciones = () => {
  const [instituciones, setInstituciones] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [institucionToDelete, setInstitucionToDelete] = useState(null);
  const navigate = useNavigate();
  const toggleDeleteModal = () => setDeleteModal(!deleteModal);
  const toggleEditarModal = () => setEditarModal(!EditarModal);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [recargar, setRecargar] = useState(false);
  const [EditarModal, setEditarModal] = useState(false);
  const [institucionToEdit, setInstitucionToEdit] = useState(null);
  const [filtroNombre, setFiltroNombre] = useState("");
  const [institucionesFiltradas, setInstitucionesFiltradas] = useState([]);

  const handleCloseModals = () => {
    setEditarModal(false); // Cierra el modal de edición
    setShowSuccessModal(false); 
  };
  
  
  useEffect(() => {
    axios.get('https://46wm6186-8000.use.devtunnels.ms/api/schools')
      .then(res => {
        const institucionesOrdenadas = res.data.sort((a, b) => a.nombreInstitucion.localeCompare(b.nombreInstitucion));
        setInstituciones(institucionesOrdenadas);
        setInstitucionesFiltradas(institucionesOrdenadas); // Inicializa con todas las instituciones
      })
      .catch(err => console.error("Error al obtener instituciones:", err));
  }, [recargar]); 
  const handleFiltroNombreChange = (event) => {
    const query = event.target.value.toLowerCase();
    setFiltroNombre(query);


    const filtrados = instituciones.filter(institucion =>
      institucion.nombreInstitucion.toLowerCase().includes(query)
    );
    setInstitucionesFiltradas(filtrados); 
  };
  const prepareDelete = (institucion) => {
    setInstitucionToDelete(institucion); 
    toggleDeleteModal();
  }
  const deleteInstitucion = () => {
    axios.delete(`https://46wm6186-8000.use.devtunnels.ms/api/school/${institucionToDelete._id}`)
      .then(res => {

        removeFromDom(institucionToDelete._id);
        toggleDeleteModal();
      })
      .catch(err => {
        console.error("Error al eliminar institucion:", err);
      });
  }
  
  const removeFromDom = (institucionId) => {
    setInstituciones(prevInstituciones => prevInstituciones.filter(institucion => institucion._id !== institucionId));
    setInstitucionesFiltradas(prevFiltradas => prevFiltradas.filter(institucion => institucion._id !== institucionId));
  }

  const editarInstitucion = (id) => {

    toggleEditarModal();
  }
  const handleEditClick = (institucion) => {
    setInstitucionToEdit(institucion);
    toggleEditarModal();
  };

  const handleInstitucionActualizada = (institucionActualizada) => {
    // Actualizar la lista de instituciones
    const institucionesActualizadas = instituciones.map(inst =>
      inst._id === institucionActualizada._id ? institucionActualizada : inst
    );
    setInstituciones(institucionesActualizadas);
    setInstitucionesFiltradas(institucionesActualizadas); // Actualiza también las instituciones filtradas
  };
  const addInstitucionToList = (newInstitucion) => {
    // Actualiza la lista y fuerza la recarga
    setInstituciones([...instituciones, newInstitucion]);
    setRecargar(!recargar); // Cambia el estado para forzar la recarga
  };

  return (

    <div className="App">
      <TabsAdministracionComp onAddInstitucion={addInstitucionToList} />

      <Container fluid className="mt-4">
        <Row>
        <Col md={3} className="widget">
            <h4>Filtrar Instituciones</h4>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Buscar por nombre de institución"
                value={filtroNombre}
                onChange={handleFiltroNombreChange}
              />
            </Form.Group>
          </Col>
          <Col md={9}>
          <Col md={12} className="mb-3">
          <strong>Total de Instituciones:</strong> {institucionesFiltradas.length}
            </Col>
            <Row>
            {institucionesFiltradas.map((institucion) => (
                <Col md={6} key={institucion._id} className="mb-3">
                  <Card className="empresa-card">
                    <Card.Body>
                      <Row className="align-items-center">
                        <Col xs={12} sm={6} md={8}>
                          <Card.Text>
                            <FontAwesomeIcon icon={faSchool} className="me-2 " />
                            {institucion.nombreInstitucion}
                          </Card.Text>
                          <Card.Text>
                            <FontAwesomeIcon icon={faMapMarkerAlt} /> 
                            {institucion.ubicacion}
                          </Card.Text>
                        </Col>
                        <Col xs={12} sm={6} md={4} className="text-right">
                          <div className="icon-container">
                            <FontAwesomeIcon className="icon-primary me-2" icon={faEdit} onClick={() => handleEditClick(institucion)} />
                            <FontAwesomeIcon className="icon-danger" icon={faTrash} onClick={() => prepareDelete(institucion)} />
                          </div>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>

      {/* Modal para editar institución */}
      <Modal show={EditarModal} onHide={toggleEditarModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Editar Institución</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {institucionToEdit && (
          <EditarInstitucionComp
          idInstitucion={institucionToEdit._id}
          onInstitucionActualizada={handleInstitucionActualizada}
          onCloseModals={handleCloseModals} // Pasando la función como prop
        />
        
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={toggleEditarModal}>Cerrar</Button>
        </Modal.Footer>
      </Modal>

      {/* Modal para confirmar eliminación */}
      <Modal show={deleteModal} onHide={toggleDeleteModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro de que deseas eliminar la institución {institucionToDelete?.nombreInstitucion}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={deleteInstitucion}>Eliminar</Button>
          <Button variant="secondary" onClick={toggleDeleteModal}>Cancelar</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ListaInstituciones;
